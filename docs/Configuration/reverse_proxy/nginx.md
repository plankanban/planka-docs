---
sidebar_position: 1
---

# Nginx

## Configuration Sample

Below is an example configuration for running Planka behind an **Nginx reverse proxy**. Replace `<domain>` with your actual domain name, and be sure to configure SSL separately (e.g., via Let's Encrypt).

```nginx
upstream planka {
   server localhost:1337;
   keepalive 32;
}

server {
    listen 80;
    listen [::]:80;
    server_name <domain>;

    access_log /var/log/nginx/planka-access.log;
    error_log  /var/log/nginx/planka-error.log error;

    # Make sure to allow socket.io connections
    location ~* \.io {
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        client_max_body_size 50M;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Frame-Options SAMEORIGIN;
        proxy_buffers 256 16k;
        proxy_buffer_size 16k;
        client_body_timeout 60;
        send_timeout 300;
        lingering_timeout 5;
        proxy_connect_timeout 1d;
        proxy_send_timeout 1d;
        proxy_read_timeout 1d;
        proxy_pass http://planka;
    }

    location / {
        client_max_body_size 50M;
        proxy_set_header Connection "";
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Frame-Options SAMEORIGIN;
        proxy_buffers 256 16k;
        proxy_buffer_size 16k;
        proxy_read_timeout 600s;
        proxy_cache_revalidate on;
        proxy_cache_min_uses 2;
        proxy_cache_use_stale timeout;
        proxy_cache_lock on;
        proxy_http_version 1.1;
        proxy_pass http://planka;
    }
}
```

## Notes
- SSL is **not included** in this configuration. For production, it is strongly recommended to use HTTPS.
- Consider redirecting HTTP to HTTPS and setting up SSL with Let's Encrypt and `certbot`.
