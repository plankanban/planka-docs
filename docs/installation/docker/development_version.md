---
sidebar_position: 2
---
# Development Version
:::danger
This version is not production ready and may result in data loss

Use at your own risk

**No Backup – No Mercy!**
:::

### Docker Compose

[![](https://d207aa93qlcgug.cloudfront.net/1.95.5.qa/img/nav/docker-logo-loggedout.png)](https://hub.docker.com/r/meltyshev/planka)
- Make sure you have [Docker](https://docs.docker.com/install/) and [Docker Compose](https://docs.docker.com/compose/install/) installed and operational.



**Create a folder to store the compose file**
```bash
mkdir /opt/planka
```


**Download the docker-compose.yml**
```bash
curl -L https://raw.githubusercontent.com/plankanban/planka/master/docker-compose-dev.yml -o /opt/planka/docker-compose.yml
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
docker-compose up -d
```

:::tip
Now you can browse to **http://YOUR_DOMAIN_NAME:YOUR_PORT** and login as **YOUR_ADMIN_EMAIL** with password **YOUR_ADMIN_PASSWORD**
:::