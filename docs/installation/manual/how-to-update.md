---
sidebar_position: 3
---

# How to Update

These steps update a [manual installation](./debian-and-ubuntu.md) on Debian or Ubuntu to the latest release. They do not apply to the nightly version, which you update with `git pull`.

Read the [release notes](https://github.com/plankanban/planka/releases) of every version you skip first. Since 2.3, PLANKA needs **Node.js 24 or newer**; check with `node -v`.

1. **Stop PLANKA**

   ```bash
   sudo systemctl stop planka
   ```

   If you use PM2, run `pm2 stop planka` as the `planka` user instead.

2. **Back Up the Database**

   ```bash
   cd /tmp
   sudo -u postgres pg_dump planka > ~/planka_backup_$(date +%Y%m%d).sql
   ```

3. **Move the Current Version Aside**

   ```bash
   sudo mv /var/www/planka /var/www/planka-old
   sudo mkdir -p /var/www/planka
   sudo chown -R planka:planka /var/www/planka
   ```

4. **Download the New Version**

   ```bash
   sudo -i -u planka
   cd /var/www/planka
   curl -fsSL -O https://github.com/plankanban/planka/releases/latest/download/planka-prebuild.zip
   unzip planka-prebuild.zip -d /var/www/
   rm planka-prebuild.zip
   ```

5. **Copy Your Configuration and Files**

   ```bash
   cp -a /var/www/planka-old/.env /var/www/planka/
   cp -a /var/www/planka-old/data/. /var/www/planka/data/
   ```

   If you use [custom terms](../../configuration/customizing-end-user-terms.md), copy them too:

   ```bash
   cp -a /var/www/planka-old/terms/custom /var/www/planka/terms/
   ```

6. **Install Dependencies and Migrate the Database**

   ```bash
   npm install
   npm run db:init
   ```

7. **Start PLANKA Again**

   ```bash
   exit
   sudo systemctl start planka
   ```

   If you use PM2, run `pm2 restart planka` as the `planka` user instead.

Once everything works, remove the old version:

```bash
sudo rm -rf /var/www/planka-old
```
