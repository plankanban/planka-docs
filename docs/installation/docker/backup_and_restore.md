---
sidebar_position: 3
---

# Backup and Restore

Planka comes with two scripts that allow for manual backup and restore when running Planka with docker-compose.yml.
Backups can be triggered with `docker-backup.sh` which will export the Database, User Avatars, Project Backgrounds and Attachments into a single tgz file.

```
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

```
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

**Create a folder to store the backups**
```bash
mkdir /opt/planka/backup
```

**Download the backup and restore scripts**
```bash
curl -L https://raw.githubusercontent.com/plankanban/planka/master/docker-backup.sh -o /opt/planka/backup/backup.sh
curl -L https://raw.githubusercontent.com/plankanban/planka/master/docker-restore.sh -o /opt/planka/backup/restore.sh
```


### With logging
**Create a logfolder**
```bash
mkdir /opt/planka/backup/logs
```

**Edit Crontab to add the the backup job and add the folling lines**
```bash
crontab -e
```

**Creates a backup every night at 2 am**
```bash
0 2 * * * cd /opt/planka/backup && bash /opt/planka/backup/backup.sh > /opt/planka/backup/logs/`date +\%Y\%m\%d\%H\%M`-backup.log 2>&1
```

**Deletes backups older than 14 days**
```bash
0 2 * * * find /opt/planka/backup/*.tgz -mindepth 1 -mtime +14 -delete > /opt/planka/backup/logs/`date +\%Y\%m\%d\%H\%M`-delete-backup.log 2>&1
```

**Deletes logfiles older than 14 days**
```bash
0 2 * * * find /opt/planka/backup/logs/*.log -mindepth 1 -mtime +14 -delete > /dev/null 2>&1
```

:::info
Your crontab should look like this
```bash
.....
# For more information see the manual pages of crontab(5) and cron(8)
#
# m h  dom mon dow   command

0 2 * * * cd /opt/planka/backup && bash /opt/planka/backup/backup.sh > /opt/planka/backup/logs/`date +\%Y\%m\%d\%H\%M`-backup.log 2>&1
0 2 * * * find /opt/planka/backup/*.tgz -mtime +14 -delete > /opt/planka/backup/logs/`date +\%Y\%m\%d\%H\%M`-delete-backup.log 2>&1
0 2 * * * find /opt/planka/backup/logs/*.log -mindepth 1 -mtime +14 -delete > /dev/null 2>&1
```
:::


### Without logging
**Edit Crontab to add the the backup job and add the folling lines**
```bash
crontab -e
```

**Creates a backup every night at 2 am**
```bash
0 2 * * * cd /opt/planka/backup && bash /opt/planka/backup/backup.sh > /dev/null 2>&1
```
**Deletes backups older than 14 days**
```bash
0 2 * * * find /opt/planka/backup/*.tgz -mindepth 1 -mtime +14 -delete > /dev/null 2>&1
```

:::info
Your crontab should look like this

```bash
.....
# For more information see the manual pages of crontab(5) and cron(8)
#
# m h  dom mon dow   command

0 2 * * * cd /opt/planka/backup && bash /opt/planka/backup/backup.sh > /dev/null 2>&1
0 2 * * * find /opt/planka/backup/*.tgz -mtime +14 -delete > /dev/null 2>&1
```

:::


## Restoring
:::danger
This will overide your running Planka instance
:::

**Enter the backup folder**
```bash
cd /opt/planka/backup
```

**List all backups**
```bash
ls *.tgz
```

**Copy the name of the backup you want to restore and run the restore script**
```bash
bash restore.sh the_name_of_your_backup.tgz
```