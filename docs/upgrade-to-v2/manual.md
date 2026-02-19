---
sidebar_position: 1
---

# Manual (Debian & Ubuntu)

:::danger
There is **no way to revert** after migrating to v2 without a proper backup.
:::

:::warning
This guide is **only for users** who still have version 1.

If you are already running any `2.0.0-rc` version, see the **[migration guide for 2.0.0-rc](https://github.com/plankanban/planka/issues/1506)**.
:::

:::warning
Hosting under a path like `https://example.domain/planka` is **not currently supported**.

Consider using a subdomain instead.
:::

:::info
Before proceeding, ensure you are running **>= 1.26.2** of PLANKA.

If not, update to this version first.
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
cp -av /var/www/planka-v1/private/attachments/. /var/www/planka/private/attachments/
```

## 7. Clean Up Environment Variables

Edit the `.env` file:

```bash
nano /var/www/planka/.env
```

### Remove Deprecated Variables

Delete the following:

* `ALLOW_ALL_TO_CREATE_PROJECTS` — Now managed via user-specific global roles.
* `SLACK_*`, `GOOGLE_*`, `TELEGRAM_*` — Replaced by in-app notifications with support for 100+ services.
* `TZ` - No longer needed, now handled automatically.

### Update the `TRUST_PROXY` Value

Regardless of whether you've previously set the `TRUST_PROXY` environment variable, you have to ensure it uses the correct boolean string value. If it's currently set to `0`, update it to `false` (even if the variable is commented out). If it's set to `1`, update it to `true`. The use of numeric values (`0` or `1`) is no longer supported and may lead to unexpected behavior.

### Add New Variables

Add these new environment variable if needed:

```yaml
# MAX_UPLOAD_FILE_SIZE=

# STORAGE_LIMIT=
# ACTIVE_USERS_LIMIT=

# The default application language used as a fallback when a user's language is not set.
# This language is also used for per-board notifications.
# DEFAULT_LANGUAGE=en-US

# All outgoing HTTP requests (SMTP, webhooks, Apprise notifications, favicon fetching, etc.)
# will be sent through this proxy if set.
# OUTGOING_PROXY=http://proxy:3128

# OIDC_USE_OAUTH_CALLBACK=true
# OIDC_PROJECT_OWNER_ROLES=project_owner
# OIDC_BOARD_USER_ROLES=board_user
# OIDC_DEBUG=true

# SMTP_NAME=

# Using Gravatar directly exposes user IPs and hashed emails to a third party (GDPR risk).
# Use a proxy you control for privacy, or leave commented out or empty to disable.
# GRAVATAR_BASE_URL=https://www.gravatar.com/avatar/
```

## 8. Install Dependencies

```bash
cd /var/www/planka
npm install
```

## 9. Run the Upgrade Script

:::info
This must be done before starting PLANKA for the first time.
:::

Run the upgrade script:

```bash
npm run db:upgrade
```

Then run the migration script to apply any additional database changes:

```bash
npm run db:migrate
```

## 10. Upgrade to New Data Structure

Move data files to the new unified directory:

```bash
mkdir -p /var/www/planka/data/protected /var/www/planka/data/private
mv /var/www/planka/public/user-avatars /var/www/planka/data/protected
mv /var/www/planka/public/background-images /var/www/planka/data/protected
mv /var/www/planka/private/attachments /var/www/planka/data/private
```

## 11. Restore Due Date Completion States

In the initial v2 release, we removed the due date toggle (because we introduced the Closed list type) and later restored it in the final version. During the upgrade, the field is removed from the database first and then re-added during the post-upgrade migration in a non-completed state.

To restore all completion states, follow these additional steps:

1. Generate an SQL file with `UPDATE` statements (replace `/var/www/planka-v1/planka_backup_20260212.sql` with the path to your v1 SQL backup file):

```bash
awk '
  BEGIN { in_copy=0 }
  /^COPY public\.card/ {
    split($0, a, "\\(|\\)");
    split(a[2], cols, ", ");
    for(i in cols) gsub("\"","",cols[i]);
    for(i in cols) col_index[cols[i]]=i;
    in_copy=1; next
  }
  in_copy && $0=="\\." { in_copy=0; next }
  in_copy {
    n=split($0, vals, "\t");
    id=vals[col_index["id"]];
    val=vals[col_index["is_due_date_completed"]];
    if(val=="t") val="TRUE";
    else if(val=="f") val="FALSE";
    else next;
    printf "UPDATE card SET is_due_completed = %s WHERE id = ''%s'';\n", val, id
  }
' /var/www/planka-v1/planka_backup_20260212.sql > due_completion_fix.sql
```

2. Execute the SQL updates:

```bash
cat due_completion_fix.sql | sudo -u postgres psql -d planka
```

3. Remove the generated file:

```bash
rm due_completion_fix.sql
```

## 12. Start PLANKA

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

## 13. Verify the Installation

- Application starts successfully
- You can log in
- Projects, boards, and cards are displayed
- All uploaded images and files appear correctly

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

2. Ensure every command completed successfully

3. Check file ownership and permissions

4. If necessary, restore from your backup and try again

### Fixing Permissions

If you encounter permission issues:

```bash
sudo chown -R planka:planka /var/www/planka
```
