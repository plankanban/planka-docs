### Backup and Restore

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