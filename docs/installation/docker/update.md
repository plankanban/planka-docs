---
sidebar_position: 2
---

# How to update

:::note
Please create a backup before updating

This can be done with our provided **[scripts](backup_and_restore)**
:::



**Stop Planka**
```bash
cd /opt/planka && docker compose down
```

**Download the latest version**
```bash
docker compose pull
```

**Start Planka again**
```bash
docker compose up -d
```