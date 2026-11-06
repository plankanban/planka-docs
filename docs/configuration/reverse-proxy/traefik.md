---
sidebar_position: 3
---

# Traefik (Docker Only)

This guide helps you configure **Traefik** as a reverse proxy for PLANKA when running with Docker. Traefik handles HTTPS certificates automatically using Let's Encrypt.

### 1. Create a Shared Network

```bash
docker network create proxy
```

### 2. Create the Traefik Folder

```bash
mkdir -p /opt/traefik && cd /opt/traefik
```

### 3. Create the Traefik Configuration

Create `traefik.yml` and replace `your@email.com`:

```yaml
global:
  checkNewVersion: true
  sendAnonymousUsage: false

api:
  dashboard: false

entryPoints:
  web:
    address: ":80"
    http:
      redirections:
        entryPoint:
          to: websecure
          scheme: https

  websecure:
    address: ":443"
    http:
      tls:
        certResolver: default

certificatesResolvers:
  default:
    acme:
      email: your@email.com
      storage: /ssl-certs/acme.json
      httpChallenge:
        entryPoint: web

providers:
  docker:
    exposedByDefault: false
    network: proxy
```

### 4. Create the Traefik Compose File

Create `docker-compose.yml`:

```yaml
services:
  traefik:
    image: traefik:v3
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - /opt/traefik/traefik.yml:/etc/traefik/traefik.yml:ro
      - /opt/traefik/ssl/:/ssl-certs/
    networks:
      - proxy

networks:
  proxy:
    external: true
```

### 5. Update PLANKA's `docker-compose.yml`

Replace `domain.tld` with your actual domain. Set `BASE_URL` and `TRUST_PROXY`, remove the `ports` section so that PLANKA can only be reached through Traefik, then add the labels and the network:

```yaml
services:
  planka:
    environment:
      - BASE_URL=https://domain.tld
      - TRUST_PROXY=true
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.planka.rule=Host(`domain.tld`)"
      - "traefik.http.routers.planka.entrypoints=websecure"
      - "traefik.http.routers.planka.tls.certresolver=default"
      - "traefik.http.services.planka.loadbalancer.server.port=1337"
    networks:
      - default
      - proxy

networks:
  proxy:
    external: true
```

### 6. Start Everything

```bash
cd /opt/traefik && docker compose up -d
cd /opt/planka && docker compose up -d
```

---

Now Traefik will automatically manage HTTPS for your PLANKA instance.
