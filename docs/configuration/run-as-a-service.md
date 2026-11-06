---
sidebar_position: 3
---

# Run as a Service (Linux)

To keep a [manual installation](../installation/manual/debian-and-ubuntu.md) running across reboots, run it as a systemd service. If you already use PM2, see [below](#using-pm2). With Docker you do not need any of this: the container restarts on its own.

## Using systemd

1. **Create the Service**

   Create `/etc/systemd/system/planka.service`:

   ```ini
   [Unit]
   Description=PLANKA
   After=network-online.target postgresql.service
   Wants=network-online.target

   [Service]
   User=planka
   WorkingDirectory=/var/www/planka
   Environment=NODE_ENV=production
   ExecStartPre=/usr/bin/node db/init.js
   ExecStart=/usr/bin/node app.js --prod
   Restart=on-failure
   RestartSec=5

   [Install]
   WantedBy=multi-user.target
   ```

   For the nightly version, set `WorkingDirectory` to `/var/www/planka/server`. `db/init.js` applies pending database migrations on every start, so an update only needs a restart.

2. **Enable and Start It**

   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable --now planka
   ```

3. **Check It**

   ```bash
   systemctl status planka
   journalctl -u planka -f
   ```

:::info
Does your existing service use `npm start --prod` and fail after an npm update? npm 12 rejects that flag. Replace the `ExecStart` line with the one above, then run `sudo systemctl daemon-reload` and `sudo systemctl restart planka`.
:::

## Using PM2

1. **Install PM2 Globally**

   ```bash
   sudo npm install pm2@latest -g
   ```

2. **Start PLANKA as the `planka` User**

   ```bash
   sudo -i -u planka
   cd /var/www/planka
   pm2 start --name planka "npm run db:init && npm run start:prod"
   ```

3. **Save the Process List**

   ```bash
   pm2 save
   ```

4. **Launch on Boot**

   ```bash
   pm2 startup systemd
   ```

   This prints a `sudo` command. Run it from an account that can use `sudo`.
