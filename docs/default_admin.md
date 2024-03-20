---
sidebar_position: 2
---
# Default Admin
:::danger
Starting with version 1.13, a default administrator is not created until you set the following variables
:::

## Informations
You can remove the variables after the first start of Planka

If the let the variable `DEFAULT_ADMIN_EMAIL` stay in place, your admin user can not be deleted or changed from other admins


## Automated installer
If you have installed Planka using the installer, you can re-run the installer to change the credentials

```bash
bash /opt/planka_installer
```

Choose Configuration, than Admin user

## Docker
To use the default admin user, you have to uncomment the following variables in the **docker-compose.yml**

```bash
    - DEFAULT_ADMIN_EMAIL=demo@demo.demo # Do not remove if you want to prevent this user from being edited/deleted
    - DEFAULT_ADMIN_PASSWORD=demo
    - DEFAULT_ADMIN_NAME=Demo Demo
    - DEFAULT_ADMIN_USERNAME=demo
```

After changing variables, you have to restart Planka
```bash
docker compose up -d
```

## Manual Installation
To use the default admin user, you have to uncomment the following variables in the **.env** file.

```bash
DEFAULT_ADMIN_EMAIL=demo@demo.demo # Do not remove if you want to prevent this user from being edited/deleted
DEFAULT_ADMIN_PASSWORD=demo
DEFAULT_ADMIN_NAME=Demo Demo
DEFAULT_ADMIN_USERNAME=demo
```

After changing variables, you have to restart Planka

If you're using our guide with PM2, just run
```bash
service plaka restart
```
