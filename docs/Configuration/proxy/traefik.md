---
sidebar_position: 3
---

# Traefik (Docker only)
Create the folder and enter it

```bash
mkdir /opt/traefik && cd /opt/traefik
```

Create the config file and insert the following, change **your@email-com** to your valid email address

```bash
nano traefik.yml
```

```bash
global:
  checkNewVersion: true
  sendAnonymousUsage: false

api:
  dashboard: false
  # Set insecure to false for production!
  insecure: false

entryPoints:
  web:
    address: :80
    http:
      redirections:
        entryPoint:
          to: websecure
          scheme: https

  websecure:
    address: :443
    http:
      tls:
        certResolver: default

certificatesResolvers:
  default:
    acme:
      email: your@email-com
      storage: /ssl-certs/acme.json
      httpChallenge:
        entryPoint: web

providers:
  docker:
    exposedByDefault: false

```

Create the docker-compose.yml file and insert the following
```bash
nano docker-compose.yml
```


```bash
traefik:
  image: traefik:v2.9
  ports:
    - "80:80"
    - "443:443"
    # remove port 8080 for production
    # - "8080:8080"
  volumes:
    - /var/run/docker.sock:/var/run/docker.sock
    - /opt/traefik/traefik.yml:/etc/traefik/traefik.yml
    - /opt/traefik/ssl/:/ssl-certs/
```

Add the following to Plankas docker-compose.yml, replace **domain.tld** with the domain, you want to use.
```bash
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.frontend.rule=Host(`domain.tld`)"
```

Start Traefik
```bash
docker compose up -d
``````