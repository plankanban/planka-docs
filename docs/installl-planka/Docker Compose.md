---
sidebar_position: 1
---

### Docker Compose

[![](https://d207aa93qlcgug.cloudfront.net/1.95.5.qa/img/nav/docker-logo-loggedout.png)](https://hub.docker.com/r/meltyshev/planka)

- Make sure you have [Docker](https://docs.docker.com/install/) and [Docker Compose](https://docs.docker.com/compose/install/) installed and operational.
- Create `docker-compose.yml` based on [the example](https://raw.githubusercontent.com/plankanban/planka/master/docker-compose.yml). This is the ONLY file you will need. You can create this file on your own machine by copy and pasting the content.
- Edit `BASE_URL` to match your domain name or IP address.
- Edit `SECRET_KEY` with random value. You can generate it by `openssl rand -hex 64`.
- Uncomment and edit `DEFAULT_ADMIN_*` variables if you need an initial administrator account.

Download the docker-compose.yml:

```
curl -L https://raw.githubusercontent.com/plankanban/planka/master/docker-compose.yml -o docker-compose.yml
```

Pull images and start services:

```
docker-compose up -d
```

Now you can browse to **http://YOUR_DOMAIN_NAME:YOUR_PORT** and login as **YOUR_ADMIN_EMAIL** with password **YOUR_ADMIN_PASSWORD**
