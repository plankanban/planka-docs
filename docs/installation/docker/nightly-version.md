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

## Steps to Install Planka (Nightly Version)

1. **Create a Folder**
   ```bash
   mkdir /opt/planka
   ```

2. **Download the `docker-compose-dev.yml`**
   ```bash
   curl -L https://raw.githubusercontent.com/plankanban/planka/master/docker-compose-dev.yml -o /opt/planka/docker-compose.yml
   ```

3. **Generate a Secret Key**
   ```bash
   openssl rand -hex 64
   ```

4. **Enter the Folder and Edit `docker-compose.yml`**

   Paste your generated **SECRET_KEY**, change the **BASE_URL**, and set up your default admin user by uncommenting the lines starting with **DEFAULT_ADMIN_**.

   ```bash
   cd /opt/planka
   nano docker-compose.yml
   ```

5. **Pull Images and Start Services**
   ```bash
   docker-compose up -d
   ```

## Access Planka

Once the services are running, browse to **BASE_URL** and log in as **DEFAULT_ADMIN_EMAIL** with the password **DEFAULT_ADMIN_PASSWORD**.

## Additional Info

If you're not using Docker volumes and prefer to directly link folders (bind mounts), you'll need to adjust the permissions of those folders. This ensures that the default user running the Node.js application (usually called "node" with a user ID of 1000) can make changes to the files and folders inside. Run the following command to adjust the permissions:

```bash
chown -R 1000:1000 /mnt/path
```
