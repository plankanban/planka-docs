---
sidebar_position: 1
---

# Manual (Debian & Ubuntu)

:::danger
There is **no way to revert** after migrating to v2 without a proper backup.
:::

:::info
Before proceeding, ensure you are running **at least version 1.26.2** of PLANKA.

If not, update to version 1.26.2 first.
:::

## 1. Stop the Running Service

Navigate to the `/var/www/planka` directory.

### If using systemd

```bash
sudo systemctl stop planka
```

### If using PM2

```bash
pm2 stop planka
```

### If running directly

Press Ctrl+C in the terminal where PLANKA is running.

## 2. Create a Backup

### Database Backup

```bash
sudo -u postgres pg_dump planka > planka_backup_$(date +%Y%m%d).sql
```

### Rename the PLANKA Directory

```bash
cd ..
sudo mv /var/www/planka /var/www/planka-v1
```

## 3. Create the New Directory and Set Ownership

```bash
sudo mkdir -p /var/www/planka/
sudo chown -R planka:planka /var/www/planka/
cd /var/www/planka
```

## 4. Switch to the `planka` User

```bash
sudo -i -u planka
```

## 5. Download and Extract the Prebuilt Version of PLANKA

```bash
curl -fsSL -O https://github.com/plankanban/planka/releases/latest/download/planka-prebuild.zip
unzip -o planka-prebuild.zip -d /var/www/
rm planka-prebuild.zip
```

## 6. Copy Required Files From the Previous Version

```bash
cp -av /var/www/planka-v1/.env /var/www/planka/
cp -av /var/www/planka-v1/public/user-avatars/. /var/www/planka/public/user-avatars/
cp -av /var/www/planka-v1/public/project-background-images/. /var/www/planka/public/background-images/
cp -av /var/www/planka-v1/private/attachments/. /var/www/planka/public/attachments/
```

## 7. Clean Up Environment Variables

Edit the `.env` file:

```bash
nano /var/www/planka/.env
```

### Remove Deprecated Variables

Delete the following from your environment section:

* `ALLOW_ALL_TO_CREATE_PROJECTS` — Now managed via user-specific global roles.
* `SLACK_*`, `GOOGLE_*`, `TELEGRAM_*` — Replaced by in-app notifications with support for 100+ services.

### Update the `TRUST_PROXY` Value

Regardless of whether you've previously set the `TRUST_PROXY` environment variable, you have to ensure it uses the correct boolean string value. If it's currently set to `0`, update it to `false` (even if the variable is commented out). If it's set to `1`, update it to `true`. The use of numeric values (`0` or `1`) is no longer supported and may lead to unexpected behavior.

### Add New Variable

Add this new environment variable:

```yaml
DEFAULT_LANGUAGE=en-US
```

This sets the default language for sending notifications per user (if a user hasn't selected a language) and per board. It also acts as a fallback when translations are not available.

Save and exit the editor.

## 8. Install Dependencies

```bash
cd /var/www/planka
npm install
```

## 9. Run the Database Upgrade Script

:::info
This must be done before starting PLANKA for the first time.
:::

```bash
npm run db:upgrade
```

## 10. Start PLANKA

### If using systemd

Exit the `planka` user session and start the service:

```bash
exit
sudo systemctl start planka
```

### If using PM2

Exit the `planka` user session and start the service:

```bash
exit
pm2 start planka
```

### If running directly

```bash
npm start --prod
```

## 11. Verify the Installation

- Application starts successfully
- You can log in
- Projects, boards, and cards are displayed
- Background images are visible

## Troubleshooting

### Common Checks

1. Check logs:

   ```bash
   # If using systemd
   sudo journalctl -u planka -f

   # If using PM2
   pm2 logs planka

   # If running in foreground, logs are shown in the terminal
   ```

2. Ensure database migrations completed successfully

3. Check file ownership and permissions

4. If necessary, restore from your backup and try again

### Fixing Permissions

If you encounter permission issues:

```bash
sudo chown -R planka:planka /var/www/planka
```
