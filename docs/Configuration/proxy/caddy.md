---
sidebar_position: 4
---
# Caddy
Edit the Caddy config file
```bash
nano /etc/caddy/Caddyfile
```


Enter a valid email address and the domainname you want to use
```bash
{
    email <your@email.tld>
}

<domain.tld> {
    reverse_proxy http://localhost:3000
}
```

Do not forget to change the BaseURL in docker-compose.yml or .env