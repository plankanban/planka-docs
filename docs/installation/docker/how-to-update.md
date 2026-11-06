---
sidebar_position: 3
---

# How to Update

:::info
Please **create a backup** before updating.

You can use our provided **[scripts](./backup-and-restore)** to create a backup.
:::

### Steps to Update

1. **Stop PLANKA**

   ```bash
   cd /opt/planka && docker compose down
   ```

2. **Download the Latest Version**

   ```bash
   docker compose pull
   ```

3. **Start PLANKA Again**

   ```bash
   docker compose up -d
   ```

Database migrations run automatically when the container starts.

### Before You Update

- Read the [release notes](https://github.com/plankanban/planka/releases) of every version you skip.
- `docker compose pull` does not touch the PostgreSQL version your database runs on. To change that, see [PostgreSQL Major Upgrade](./postgresql-upgrade.md).
- Since 2.3, failed sign-ins are limited per client address. Behind a reverse proxy, make sure `TRUST_PROXY=true` is set, or all your users share one limit.
