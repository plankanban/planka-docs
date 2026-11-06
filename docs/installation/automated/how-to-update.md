---
sidebar_position: 3
---

# How to Update

Updates are installed automatically once a day. A backup is created before each update.

You can also update manually.

## Steps to Update Manually

:::danger
**Older servers: do not run `docker compose down`.** Installations set up before November 2026 keep uploaded files in a volume that does not survive it: they are gone from PLANKA after the next start. Fresh installs are not affected.
:::

1. **Create a Backup**

   ```bash
   cd /opt/planka/ && bash cron/backup.sh
   ```

2. **Download the Latest Version**

   ```bash
   docker compose pull
   ```

3. **Restart PLANKA With It**

   ```bash
   docker compose --env-file .env up -d
   ```
