---
sidebar_position: 4
---
# Planka service (Linux)

### Run Planka as service
To run Planka reboot save, we are using PM2

**Install PM2**
```bash
sudo npm install pm2@latest -g
```

```bash
cd /var/www/planka
```

```bash
pm2 start --name "planka" "npm run db:init && npm start --prod"
```

```bash
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u planka --hp /home/planka
```

```bash
pm2 save
```
