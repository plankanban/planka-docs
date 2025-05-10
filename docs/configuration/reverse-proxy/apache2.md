---
sidebar_position: 2
---

# Apache2

## Configuration Sample

Below is an example configuration for running PLANKA behind an **Apache2 reverse proxy**. Replace `domain` with your actual domain name and make sure to set up **SSL** correctly.

**Note:** You have to enable ``ws-proxy`` and ``rewrite`` in apache.

```apache
<VirtualHost *:80>

    ServerName domain

    RewriteEngine On
        RewriteCond %{HTTP:Upgrade} =websocket [NC]
        RewriteRule /(.*)            ws://localhost:1337/$1 [P,L]

    SSLProxyEngine on
    ProxyPreserveHost On
    ProxyRequests Off
            ProxyPass /.well-known !
            ProxyPassReverse /.well-known !
            ProxyPass /robots.txt !
            ProxyPassReverse /robots.txt !
            ProxyPass / http://localhost:1337/
            ProxyPassReverse / http://localhost:1337/

</VirtualHost>
```

## Notes

- This configuration assumes PLANKA is running on `localhost:1337`.
- For production use, you should also set up an HTTPS VirtualHost (`<VirtualHost *:443>`) with a valid SSL certificate (e.g., via Let's Encrypt).
