---
sidebar_position: 5
---

# PostgreSQL Major Upgrade

This guide is for the PostgreSQL container from PLANKA's `docker-compose.yml`. PLANKA works with PostgreSQL 15 or newer, so nothing forces you to do this until your version reaches [end of life](https://www.postgresql.org/support/versioning/).

If you run PostgreSQL yourself, follow the [PostgreSQL upgrade documentation](https://www.postgresql.org/docs/current/upgrading.html).

:::danger
**Do not just change the image tag.** A major version cannot read the data directory of another one: the container keeps restarting with `database files are incompatible with server`. Your data is not lost, and setting the old tag again brings it back.

Create a [backup](./backup-and-restore.md) before you start.
:::

The commands below go from 16 to 18. From the folder with your `docker-compose.yml`:

1. **Export All Databases**

   ```bash
   docker compose exec -T postgres pg_dumpall -U postgres > planka-postgres.sql
   ```

2. **Stop the Stack**

   ```bash
   docker compose down
   ```

   Do not add `-v`: that would delete the volumes.

3. **Edit `docker-compose.yml`**

   Change the image and give it a new volume:

   ```yaml
   services:
     postgres:
       image: postgres:18-alpine
       volumes:
         - db-data-18:/var/lib/postgresql

   volumes:
     data:
     db-data:
     db-data-18:
   ```

   :::warning
   Starting with PostgreSQL 18, the image expects its volume at `/var/lib/postgresql`. For 17 and older, keep `/var/lib/postgresql/data`.
   :::

4. **Start PostgreSQL and Import**

   ```bash
   docker compose up -d --wait postgres
   docker compose exec -T postgres psql -U postgres < planka-postgres.sql
   ```

   Two errors are expected and harmless: `role "postgres" already exists` and `database "planka" already exists`.

5. **Start PLANKA**

   ```bash
   docker compose up -d
   ```

6. **Clean Up**

   Once you have checked that everything is there, remove the export and the old volume. The volume name starts with your Compose project name:

   ```bash
   rm planka-postgres.sql
   docker volume rm planka_db-data
   ```

   Remove `db-data:` from your `docker-compose.yml` afterwards.
