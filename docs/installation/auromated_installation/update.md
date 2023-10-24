---
sidebar_position: 3
---

# How to update
Update are installed automatically once a day.
A backup is created before the update.


You can do this manually too.

**Stop Planka**
```bash
cd /opt/planka/ && docker compose down
```

**Create a Backup**
```bash
bash cron/backup.sh
```

**Download the latest version**
```bash
docker compose pull
```

**Start Planka again**
```bash
docker compose --env-file .env up -d
```