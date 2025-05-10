---
sidebar_position: 4
---

# Caddy

Use this guide to configure **Caddy** as a reverse proxy for PLANKA.

### 1. Edit the Caddy Configuration

Open the Caddyfile in your preferred editor:

```bash
sudo nano /etc/caddy/Caddyfile
```

### 2. Add Your Configuration

Replace placeholders with your actual email and domain:

```caddyfile
{
    email your@email.tld
}

your.domain.tld {
    reverse_proxy http://localhost:3000
}
```

This config enables automatic HTTPS via Let's Encrypt.

### 3. Update PLANKA's Base URL

Make sure the `BASE_URL` in your `.env` file or `docker-compose.yml` matches the domain you've configured:

```env
BASE_URL=https://your.domain.tld
```

After saving changes, restart the Caddy service to apply the new configuration:

```bash
sudo systemctl restart caddy
```

---

Now your PLANKA instance should be securely accessible at `https://your.domain.tld`.
