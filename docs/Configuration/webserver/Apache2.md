#### Apache2 configuration sample

Here is an example of Apache2 configuration for Planka, make sure to replace domain with your domain name, and make sure to configure the SSL.

**Note:** You have to enable ``ws-proxy`` and ``rewrite`` in apache.

```bash
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