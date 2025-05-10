---
sidebar_position: 3
---

# Traefik (Docker Only)

This guide helps you configure **Traefik** as a reverse proxy for PLANKA when running with Docker. Traefik handles HTTPS certificates automatically using Let's Encrypt.

### 1. Create Traefik Folder

```bash
mkdir -p /opt/traefik && cd /opt/traefik
```

### 2. Create the Traefik Configuration

Create the `traefik.yml` file:

```bash
nano traefik.yml
```

Paste and edit the following (replace `your@email-com`):

```yaml
global:
  checkNewVersion: true
  sendAnonymousUsage: false

api:
  dashboard: false
  # Set insecure to false for production!
  insecure: false

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
      email: your@email-com
      storage: /ssl-certs/acme.json
      httpChallenge:
        entryPoint: web

providers:
  docker:
    exposedByDefault: false
```

### 3. Create the Traefik Docker Compose File

Create `docker-compose.yml`:

```bash
nano docker-compose.yml
```

Insert:

```yaml
version: "3"

services:
  traefik:
    image: traefik:v2.9
    ports:
      - "80:80"
      - "443:443"
      # Uncomment to enable dashboard (insecure for production)
      # - "8080:8080"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /opt/traefik/traefik.yml:/etc/traefik/traefik.yml
      - /opt/traefik/ssl/:/ssl-certs/
```

### 4. Add Labels to PLANKA's `docker-compose.yml`

Update your PLANKA service with Traefik labels. Replace `domain.tld` with your actual domain:

```yaml
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.frontend.rule=Host(`domain.tld`)"
  - "traefik.http.routers.frontend.entrypoints=websecure"
  - "traefik.http.routers.frontend.tls.certresolver=default"
```

### 5. Start Traefik

```bash
docker compose up -d
```

---

Now Traefik will automatically manage HTTPS for your PLANKA instance.
