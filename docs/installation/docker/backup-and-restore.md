---
sidebar_position: 4
---

# Backup & Restore

PLANKA comes with two example scripts for the stock `docker-compose.yml`. They do not fit other setups: with S3 storage or an external database, those have to be backed up on their own.

`docker-backup.sh` exports the database and the data volume (avatars, background images, attachments) into a single archive.

:::danger
Unless you encrypt it, the archive holds password hashes, active sessions, two-factor secrets, SMTP credentials and API keys in the clear. Treat it like a copy of the database.
:::

### Backup Example

```bash
$ BACKUP_PASSPHRASE='YOUR_PASSPHRASE' ./docker-backup.sh
Exporting postgres database ... Success!
Exporting data volume ... Success!
Creating encrypted archive 2026-11-05T15-37-22Z-backup.tgz.enc ... Success!
Cleaning up temporary files and directories ... Success!
Backup Complete!
```

Without `BACKUP_PASSPHRASE`, you get a plain `.tgz` and a warning. Keep the passphrase somewhere else: without it, the archive cannot be restored.

The backup runs against the live instance, so the database and the files are captured moments apart. Stop the app first if you need a backup with no such gap.

### Restore Example

```bash
$ BACKUP_PASSPHRASE='YOUR_PASSPHRASE' ./docker-restore.sh 2026-11-05T15-37-22Z-backup.tgz.enc
Decrypting and extracting 2026-11-05T15-37-22Z-backup.tgz.enc ... Success!
Importing postgres database ...

[Many lines of postgres output]
...

Success!
Importing data volume ... Success!
Cleaning up temporary files and directories ... Success!
Restore complete!
```

Errors like `current user cannot be dropped` and `role "postgres" already exists` in the postgres output are expected and harmless.

### Container Names

The scripts expect the containers `planka-postgres-1` and `planka-planka-1`, which is what you get when the compose file is in a folder called `planka`. For anything else, set the names:

```bash
DOCKER_CONTAINER_POSTGRES=myproject-postgres-1 DOCKER_CONTAINER_PLANKA=myproject-planka-1 ./docker-backup.sh
```

## Automate Backups

1. **Create a Folder to Store the Backups**

   ```bash
   mkdir /opt/planka/backup
   ```

2. **Download the Backup and Restore Scripts**

   ```bash
   curl -L https://raw.githubusercontent.com/plankanban/planka/master/docker-backup.sh -o /opt/planka/backup/backup.sh
   curl -L https://raw.githubusercontent.com/plankanban/planka/master/docker-restore.sh -o /opt/planka/backup/restore.sh
   ```

   The crontab holds your passphrase, so keep it readable for its owner only, which is the default.

### With Logging

1. **Create a Log Folder**

   ```bash
   mkdir /opt/planka/backup/logs
   ```

2. **Edit Crontab to Add the Backup Job and Add the Following Lines**

   ```bash
   crontab -e
   ```

   **Create a Backup Every Night at 2 AM:**

   ```bash
   0 2 * * * cd /opt/planka/backup && BACKUP_PASSPHRASE='YOUR_PASSPHRASE' bash /opt/planka/backup/backup.sh > /opt/planka/backup/logs/`date +\%Y\%m\%d\%H\%M`-backup.log 2>&1
   ```

   **Delete Backups Older Than 14 Days:**

   ```bash
   0 2 * * * find /opt/planka/backup -maxdepth 1 -name '*.tgz*' -mtime +14 -delete > /opt/planka/backup/logs/`date +\%Y\%m\%d\%H\%M`-delete-backup.log 2>&1
   ```

   **Delete Log Files Older Than 14 Days:**

   ```bash
   0 2 * * * find /opt/planka/backup/logs -name '*.log' -mtime +14 -delete > /dev/null 2>&1
   ```

   Your crontab should look like this:

   ```bash
   .....
   # For more information see the manual pages of crontab(5) and cron(8)
   #
   # m h  dom mon dow   command

   0 2 * * * cd /opt/planka/backup && BACKUP_PASSPHRASE='YOUR_PASSPHRASE' bash /opt/planka/backup/backup.sh > /opt/planka/backup/logs/`date +\%Y\%m\%d\%H\%M`-backup.log 2>&1
   0 2 * * * find /opt/planka/backup -maxdepth 1 -name '*.tgz*' -mtime +14 -delete > /opt/planka/backup/logs/`date +\%Y\%m\%d\%H\%M`-delete-backup.log 2>&1
   0 2 * * * find /opt/planka/backup/logs -name '*.log' -mtime +14 -delete > /dev/null 2>&1
   ```

### Without Logging

1. **Edit Crontab to Add the Backup Job and Add the Following Lines**

   ```bash
   crontab -e
   ```

   **Create a Backup Every Night at 2 AM:**

   ```bash
   0 2 * * * cd /opt/planka/backup && BACKUP_PASSPHRASE='YOUR_PASSPHRASE' bash /opt/planka/backup/backup.sh > /dev/null 2>&1
   ```

   **Delete Backups Older Than 14 Days:**

   ```bash
   0 2 * * * find /opt/planka/backup -maxdepth 1 -name '*.tgz*' -mtime +14 -delete > /dev/null 2>&1
   ```

   Your crontab should look like this:

   ```bash
   .....
   # For more information see the manual pages of crontab(5) and cron(8)
   #
   # m h  dom mon dow   command

   0 2 * * * cd /opt/planka/backup && BACKUP_PASSPHRASE='YOUR_PASSPHRASE' bash /opt/planka/backup/backup.sh > /dev/null 2>&1
   0 2 * * * find /opt/planka/backup -maxdepth 1 -name '*.tgz*' -mtime +14 -delete > /dev/null 2>&1
   ```

## Restoring a Backup

:::danger
Restoring a backup **will overwrite** your running PLANKA instance.

Please ensure that you are restoring the correct backup.
:::

1. **Enter the Backup Folder**

   ```bash
   cd /opt/planka/backup
   ```

2. **List All Backups**

   ```bash
   ls *.tgz*
   ```

3. **Copy the Name of the Backup You Want to Restore and Run the Restore Script**

   ```bash
   bash restore.sh the_name_of_your_backup.tgz
   ```

   For an encrypted archive:

   ```bash
   BACKUP_PASSPHRASE='YOUR_PASSPHRASE' bash restore.sh the_name_of_your_backup.tgz.enc
   ```

---

:::info
Planning to try [PLANKA Pro](https://planka.app/pro?ref=docs-backup)? Take a backup first. The upgrade to Pro is one-way — there is no downgrade back to Community — so the backup is your only way back.
:::
