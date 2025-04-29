---
sidebar_position: 1
---

# Default Admin

:::info
Starting with version 1.13, a default administrator **is not created automatically**.

You need to set environment variables to create one.
:::

### Important Notes

- You **can remove** the variables after the first successful startup.
- If you leave `DEFAULT_ADMIN_EMAIL` in place, the corresponding admin user **cannot be deleted or edited** by others.

## Automated Installation

If you've used the **Planka Installer**, you can re-run it to modify admin credentials:

```bash
bash /opt/planka_installer
```

Then select:
```
Configuration → Admin user
```

## Manual Installation

In your `.env` file (located in the `server` directory), set the following variables:

```env
DEFAULT_ADMIN_EMAIL=demo@demo.demo # Do not remove if you want to prevent this user from being edited/deleted
DEFAULT_ADMIN_PASSWORD=demo
DEFAULT_ADMIN_NAME=Demo Demo
DEFAULT_ADMIN_USERNAME=demo
```

After updating the file, restart Planka:

If you're using **PM2**:
```bash
service planka restart
```

## Docker Installation

In your `docker-compose.yml`, uncomment or add the following environment variables:

```yaml
- DEFAULT_ADMIN_EMAIL=demo@demo.demo # Do not remove if you want to prevent this user from being edited/deleted
- DEFAULT_ADMIN_PASSWORD=demo
- DEFAULT_ADMIN_NAME=Demo Demo
- DEFAULT_ADMIN_USERNAME=demo
```

After making changes, restart Planka:

```bash
docker compose up -d
```
