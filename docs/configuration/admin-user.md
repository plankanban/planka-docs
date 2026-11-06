---
sidebar_position: 1
---

# Admin User

:::info
Starting with version 1.13, an administrator user **is not created automatically**.

You need to run the script or set environment variables to create one.
:::

### Important Notes (For Environment Variables)

- You **can remove** the variables after the first successful startup.
- If you leave `DEFAULT_ADMIN_EMAIL` in place, the corresponding admin user **cannot be deleted or edited** by others.

## Manual Installation

### By Running the Script

From the folder with PLANKA, run the script:

```bash
npm run db:create-admin-user
```

### By Setting Environment Variables

In your `.env` file, uncomment or add the following environment variables:

```env
DEFAULT_ADMIN_EMAIL=demo@demo.demo
DEFAULT_ADMIN_PASSWORD=demo
DEFAULT_ADMIN_NAME=Demo Demo
DEFAULT_ADMIN_USERNAME=demo
```

The variables are read when the database is initialized, so run that, then restart PLANKA:

```bash
npm run db:init
```

With the [systemd service](./run-as-a-service.md), a restart does both:

```bash
sudo systemctl restart planka
```

## Docker Installation

### By Running the Script

From the folder with your `docker-compose.yml`, run the script:

```bash
docker compose run --rm planka npm run db:create-admin-user
```

### By Setting Environment Variables

In your `docker-compose.yml`, uncomment or add the following environment variables:

```yaml
- DEFAULT_ADMIN_EMAIL=demo@demo.demo
- DEFAULT_ADMIN_PASSWORD=demo
- DEFAULT_ADMIN_NAME=Demo Demo
- DEFAULT_ADMIN_USERNAME=demo
```

After making changes, restart PLANKA:

```bash
docker compose up -d
```

## Automated Installation

If you've used the **PLANKA Installer**, you can re-run it to modify admin credentials:

```bash
bash /opt/planka_installer.sh
```

Then select:

```
Configuration → Admin user
```
