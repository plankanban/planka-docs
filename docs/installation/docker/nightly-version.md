---
sidebar_position: 2
---

# Nightly Version

:::danger
This version **is not production-ready** and may result in data loss. Use at your own risk.

**No Backup - No Mercy!**
:::

### Docker Compose

[![](https://d207aa93qlcgug.cloudfront.net/1.95.5.qa/img/nav/docker-logo-loggedout.png)](https://hub.docker.com/r/meltyshev/planka)

- Make sure you have [Docker](https://docs.docker.com/install/) and [Docker Compose](https://docs.docker.com/compose/install/) installed and operational.

## Steps to Install PLANKA (Nightly Version)

1. **Create a Folder**

   ```bash
   mkdir /opt/planka
   ```

2. **Download the `docker-compose-dev.yml`**

   ```bash
   curl -L https://raw.githubusercontent.com/plankanban/planka/master/docker-compose.yml -o /opt/planka/docker-compose.yml
   ```

3. **Generate a Secret Key**

   ```bash
   openssl rand -hex 64
   ```

4. **Enter the Folder and Edit `docker-compose.yml`**

   ```bash
   cd /opt/planka
   nano docker-compose.yml
   ```

   Change the image tag to `nightly` by replacing `ghcr.io/plankanban/planka:latest` with `ghcr.io/plankanban/planka:nightly`.

   Paste your generated **SECRET_KEY** and change the **BASE_URL**.

5. **Create an Admin User**

   ```bash
   docker compose run --rm planka npm run db:create-admin-user
   ```

   Sample output:

   ```bash
   Email: YOUR_ADMIN_EMAIL
   Password: YOUR_ADMIN_PASSWORD
   Name: ...
   Username (optional): ...
   ```

6. **Pull Images and Start Services**

   ```bash
   docker compose up -d
   ```

## Access PLANKA

Once the services are running, browse to **BASE_URL** and log in as **YOUR_ADMIN_EMAIL** with the password **YOUR_ADMIN_PASSWORD**.

## Additional Info

If you're not using Docker volumes and prefer to directly link folders (bind mounts), you'll need to adjust the permissions of those folders. This ensures that the default user running the Node.js application (usually called "node" with a user ID of 1000) can make changes to the files and folders inside. Run the following command to adjust the permissions:

```bash
chown -R 1000:1000 /mnt/pat
```
