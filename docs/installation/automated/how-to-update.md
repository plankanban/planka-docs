---
sidebar_position: 3
---

# How to Update

Updates are installed automatically once a day. A backup is created before each update.

You can also update manually.

## Steps to Update Manually

1. **Stop Planka**
   ```bash
   cd /opt/planka/ && docker compose down
   ```

2. **Create a Backup**
   ```bash
   bash cron/backup.sh
   ```

3. **Download the Latest Version**
   ```bash
   docker compose pull
   ```

4. **Start Planka Again**
   ```bash
   docker compose --env-file .env up -d
   ```
