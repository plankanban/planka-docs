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

If you are using **systemd**:

```bash
sudo systemctl stop planka
````

If using **PM2** or running in the foreground:

```bash
# Using PM2
pm2 stop planka

# If running in foreground
# Press Ctrl+C in the terminal where PLANKA is running
```

## 2. Create a Backup

### Backup the PostgreSQL Database

```bash
sudo -u postgres pg_dump planka > planka_backup_$(date +%Y%m%d).sql
```

### Backup the PLANKA Directory

```bash
sudo cp -r /var/www/planka /var/www/planka_backup_$(date +%Y%m%d)
```

## 3. Switch to the `planka` User

```bash
sudo -i -u planka
cd /var/www/planka
```

## 4. Update the PLANKA Source Code

Download and extract the **v2.0.0-rc.2** build:

```bash
curl -fsSL -O https://github.com/plankanban/planka/releases/latest/download/planka-prebuild.zip
unzip -o planka-prebuild.zip -d /var/www/
rm planka-prebuild.zip
```

## 5. Create Required Directories

Create the new directories:

```bash
mkdir -p /var/www/planka/public/favicons
mkdir -p /var/www/planka/public/background-images
```

## 6. Copy Background Images

Copy existing background images to the new location:

```bash
cp -av /var/www/planka/public/project-background-images/. /var/www/planka/public/background-images/
```

## 7. Clean Up Environment Variables

Edit the `.env` file:

```bash
nano /var/www/planka/.env
```

### Remove Deprecated Variables

Delete the following from your environment section:

* `ALLOW_ALL_TO_CREATE_PROJECTS` — Now managed via user-specific global roles.
* `SLACK_*`, `GOOGLE_*`, `TELEGRAM_*` — Replaced by in-app notifications with support for 140+ services.

### Add New Variable

Add this new environment variable:

```yaml
DEFAULT_LANGUAGE=en-US
```

This sets the default language for sending notifications per user (if a user hasn't selected a language) and per board. It also acts as a fallback when translations are not available.

Save and exit the editor.

## 8. Install Dependencies

Install Node.js dependencies:

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

### If running directly

```bash
npm start --prod
```

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

## 11. Verify the Installation

- Application starts successfully
- You can log in
- Projects, boards, and cards are displayed
- Background images are visible

## 12. Clean Up

Once confirmed everything works, remove the old directory:

```bash
sudo -i -u planka
rm -rf /var/www/planka/public/project-background-images
exit
```

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
