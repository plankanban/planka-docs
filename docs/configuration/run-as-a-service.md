---
sidebar_position: 2
---

# Run as a Service (Linux)

To ensure PLANKA runs persistently across reboots, we use **PM2**, a process manager for Node.js applications.

### Step-by-Step Instructions

1. **Install PM2 Globally**

    ```bash
    sudo npm install pm2@latest -g
    ```

2. **Navigate to the PLANKA Directory**

    ```bash
    cd /var/www/planka
    ```

3. **Start PLANKA with PM2**

    ```bash
    pm2 start --name "planka" "npm run db:init && npm start --prod"
    ```

    > This registers PLANKA as a PM2 process named `planka`.

4. **Configure PM2 to Launch on Boot**

    ```bash
    sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u planka --hp /home/planka
    ```

5. **Save the Current PM2 Process List**

    ```bash
    pm2 save
    ```

Now PLANKA will automatically start after system reboots.
