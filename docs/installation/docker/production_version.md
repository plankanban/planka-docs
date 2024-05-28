---
sidebar_position: 1
---
# Production Version
### Docker Compose

[![](https://d207aa93qlcgug.cloudfront.net/1.95.5.qa/img/nav/docker-logo-loggedout.png)](https://hub.docker.com/r/meltyshev/planka)

- Make sure you have [Docker](https://docs.docker.com/install/) and [Docker Compose](https://docs.docker.com/compose/install/) installed and operational.

**Create a folder to store the compose file**
```bash
mkdir /opt/planka
```


**Download the docker-compose.yml**
```bash
curl -L https://raw.githubusercontent.com/plankanban/planka/master/docker-compose.yml -o /opt/planka/docker-compose.yml
```

**Generate a secret key**
```bash
openssl rand -hex 64
```

**Enter the folder and edit ``docker-compose.yml``**
Past in your generated **SECRET_KEY**, change the **BASE_URL** und setup your default admin user by uncommenting the lines starting with **DEFAULT_ADMIN_**
```bash
cd /opt/planka
nano docker-compose.yml
```



**Pull images and start services**
```bash
docker compose up -d
```

:::tip
Now you can browse to **http://YOUR_DOMAIN_NAME:YOUR_PORT** and login as **YOUR_ADMIN_EMAIL** with password **YOUR_ADMIN_PASSWORD**
:::

:::info
If you're not using Docker volumes and prefer to directly link folders (bind mounts), you'll need to adjust the permissions of those folders. This allows the default user running the Node.js application (usually called "node" and has a user ID of 1000) to make changes to the files and folders inside. You can achieve this by running the following command: `chown -R 1000:1000 /mnt/path`
:::
