---
sidebar_position: 4
---

# Backup & Restore

Planka comes with two scripts that allow for manual backup and restore when running Planka with `docker-compose.yml`.

Backups can be triggered with the `docker-backup.sh` script, which exports the database, user avatars, project backgrounds, and attachments into a single `.tgz` file.

### Backup Example
```bash
$ ./docker-backup.sh
Exporting postgres database ... Success!
Exporting user-avatars ... Success!
Exporting project-background-images ... Success!
Exporting attachments ... Success!
Creating final tarball 2023-01-17T15-37-22Z-backup.tgz ... Success!
Cleaning up temporary files and folders ... Success!
Backup Complete!
```

The resulting backup can be restored using the `docker-restore.sh` script.

### Restore Example
```bash
$ ./docker-restore.sh 2023-01-17T15-37-22Z-backup.tgz
Extracting tarball 2023-01-17T11-10-54Z-backup.tgz ... Success!
Importing postgres database ...

[Many lines of postgres output]
...

Success!
Importing user-avatars ... Success!
Importing project-background-images ... Success!
Importing attachments ... Success!
Cleaning up temporary files and folders ... Success!
Restore complete!
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
   0 2 * * * cd /opt/planka/backup && bash /opt/planka/backup/backup.sh > /opt/planka/backup/logs/`date +\%Y\%m\%d\%H\%M`-backup.log 2>&1
   ```

   **Delete Backups Older Than 14 Days:**
   ```bash
   0 2 * * * find /opt/planka/backup/*.tgz -mindepth 1 -mtime +14 -delete > /opt/planka/backup/logs/`date +\%Y\%m\%d\%H\%M`-delete-backup.log 2>&1
   ```

   **Delete Log Files Older Than 14 Days:**
   ```bash
   0 2 * * * find /opt/planka/backup/logs/*.log -mindepth 1 -mtime +14 -delete > /dev/null 2>&1
   ```

   Your crontab should look like this:
   ```bash
   .....
   # For more information see the manual pages of crontab(5) and cron(8)
   #
   # m h  dom mon dow   command

   0 2 * * * cd /opt/planka/backup && bash /opt/planka/backup/backup.sh > /opt/planka/backup/logs/`date +\%Y\%m\%d\%H\%M`-backup.log 2>&1
   0 2 * * * find /opt/planka/backup/*.tgz -mtime +14 -delete > /opt/planka/backup/logs/`date +\%Y\%m\%d\%H\%M`-delete-backup.log 2>&1
   0 2 * * * find /opt/planka/backup/logs/*.log -mindepth 1 -mtime +14 -delete > /dev/null 2>&1
   ```

### Without Logging

1. **Edit Crontab to Add the Backup Job and Add the Following Lines**
   ```bash
   crontab -e
   ```

   **Create a Backup Every Night at 2 AM:**
   ```bash
   0 2 * * * cd /opt/planka/backup && bash /opt/planka/backup/backup.sh > /dev/null 2>&1
   ```

   **Delete Backups Older Than 14 Days:**
   ```bash
   0 2 * * * find /opt/planka/backup/*.tgz -mindepth 1 -mtime +14 -delete > /dev/null 2>&1
   ```

   Your crontab should look like this:
   ```bash
   .....
   # For more information see the manual pages of crontab(5) and cron(8)
   #
   # m h  dom mon dow   command

   0 2 * * * cd /opt/planka/backup && bash /opt/planka/backup/backup.sh > /dev/null 2>&1
   0 2 * * * find /opt/planka/backup/*.tgz -mtime +14 -delete > /dev/null 2>&1
   ```

## Restoring a Backup

:::danger
Restoring a backup **will overwrite** your running Planka instance.

Please ensure that you are restoring the correct backup.
:::

1. **Enter the Backup Folder**
   ```bash
   cd /opt/planka/backup
   ```

2. **List All Backups**
   ```bash
   ls *.tgz
   ```

3. **Copy the Name of the Backup You Want to Restore and Run the Restore Script**
   ```bash
   bash restore.sh the_name_of_your_backup.tgz
   ```
