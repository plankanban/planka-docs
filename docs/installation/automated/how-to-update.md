---
sidebar_position: 3
---

# How to Update

:::warning
This installation method **is outdated** and may not include all current configuration options.

For the best experience, we recommend using the [**Docker-based installation**](../docker/production-version.md).
:::

Updates are installed automatically once a day. A backup is created before each update.

You can also update manually.

## Steps to Update Manually

1. **Stop PLANKA**

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

4. **Start PLANKA Again**

   ```bash
   docker compose --env-file .env up -d
   ```
