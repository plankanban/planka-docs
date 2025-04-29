---
sidebar_position: 3
---

# How to Update

:::info
Please **create a backup** before updating.

You can use our provided **[scripts](./backup-and-restore)** to create a backup.
:::

### Steps to Update

1. **Stop Planka**
   ```bash
   cd /opt/planka && docker compose down
   ```

2. **Download the Latest Version**
   ```bash
   docker compose pull
   ```

3. **Start Planka Again**
   ```bash
   docker compose up -d
   ```
