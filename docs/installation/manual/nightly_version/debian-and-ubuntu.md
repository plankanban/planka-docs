---
sidebar_position: 1
---

# Debian & Ubuntu

:::danger
This version **is not production-ready** and may result in data loss. Use at your own risk.

**No Backup - No Mercy!**
:::

:::warning
We **strongly recommend** using the [**Docker-based installation**](../docker/production-version.md) for PLANKA.

The manual installation requires additional security configurations and a deep understanding of your environment. For example, to prevent SSRF and accidental access to internal services, you would need to properly configure an outgoing HTTP proxy.

The Docker version comes with a **pre-installed outgoing proxy**, which can be easily configured using Docker-only environment variables (`OUTGOING_BLOCKED_IPS`, `OUTGOING_BLOCKED_HOSTS`, `OUTGOING_ALLOWED_IPS`, `OUTGOING_ALLOWED_HOSTS`) to safely restrict outbound traffic.
:::

### System Requirements

- Debian 11 or Ubuntu 22.04
- PostgreSQL
- Node.js

## PostgreSQL

### Installing PostgreSQL

Refresh your local package index:

```bash
sudo apt update
```

Install PostgreSQL and additional utilities:

```bash
sudo apt install postgresql postgresql-contrib -y
```

If prompted to restart any services, press **ENTER** to accept the defaults.

### Create a PostgreSQL User and Database for PLANKA

**Create a PostgreSQL user:**

```bash
sudo -u postgres createuser --interactive
```

Sample output:

```bash
Enter name of role to add: planka
Shall the new role be a superuser? (y/n) y
```

**Create the database:**

To avoid `sudo` permission issues:

```bash
cd /tmp
```

Then run:

```bash
sudo -u postgres createdb planka
```

### Create a Unix User and Set the Database Password

Create a Unix user named `planka`:

```bash
sudo adduser planka
```

Login to PostgreSQL as the `planka` user:

```bash
sudo -u planka psql
```

Change the password:

```sql
ALTER USER planka PASSWORD 'YOUR_DATABASE_PASSWORD';
```

Exit the PostgreSQL prompt:

```bash
\q
```

## Node.js

Install Node.js using the [NodeSource](https://github.com/nodesource/distributions#nodejs) PPA:

```bash
# Update packages and install dependencies
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg

# Add NodeSource GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

# Add the Node.js repository
NODE_MAJOR=22
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list

# Install Node.js
sudo apt-get update
sudo apt-get install nodejs -y
```

Verify installation:

```bash
node -v
# Output: v22.x.x
```

## Install PLANKA (Nightly)

Install required packages:

```bash
sudo apt install unzip build-essential -y
```

Create the installation directory and set ownership:

```bash
sudo mkdir -p /var/www/planka
sudo chown -R planka:planka /var/www/planka
cd /var/www/planka
```

Switch to the `planka` user:

```bash
sudo -i -u planka
```

Clone the repo:

```bash
cd /var/www/planka
git clone https://github.com/plankanban/planka.git .
```

Install dependencies and build the client:

```bash
npm install

cd client
npm run build
```

### Set Up Symlinks

Instead of copying files, use symbolic links for easier updates:

```bash
ln -s /var/www/planka/client/dist/favicon.ico /var/www/planka/server/public/favicon.ico
ln -s /var/www/planka/client/dist/logo192.png /var/www/planka/server/public/logo192.png
ln -s /var/www/planka/client/dist/logo512.png /var/www/planka/server/public/logo512.png
ln -s /var/www/planka/client/dist/manifest.json /var/www/planka/server/public/manifest.json
ln -s /var/www/planka/client/dist/robots.txt /var/www/planka/server/public/robots.txt
ln -s /var/www/planka/client/dist/assets /var/www/planka/server/public/assets
ln -s /var/www/planka/client/dist/index.html /var/www/planka/server/views/index.html
```

### Configure Environment Variables

Go to the `server` directory and copy the sample `.env` file:

```bash
cd /var/www/planka/server
cp .env.sample .env
```

Generate a secret key:

```bash
openssl rand -hex 64
```

> Note the output - you'll need it for the `.env` file.

Edit the `.env` file:

```bash
nano .env
```

Example `.env` configuration:

```env
## Required

BASE_URL=http://YOUR_DOMAIN_NAME:YOUR_PORT
DATABASE_URL=postgresql://planka:YOUR_DATABASE_PASSWORD@localhost/planka
SECRET_KEY=YOUR_GENERATED_KEY

## Optional

...
```

> **Security note:** For manual installations, you need to configure your own `OUTGOING_PROXY` or implement firewall rules to restrict outbound traffic and prevent access to internal services.

### Initialize the Database and Create an Admin User

**Initialize the database:**

```bash
npm run db:init
```

**Create an admin user:**

```bash
npm run db:create-admin-user
```

Sample output:

```bash
Email: YOUR_ADMIN_EMAIL
Password: YOUR_ADMIN_PASSWORD
Name: ...
Username (optional): ...
```

## Start PLANKA

From the `server` directory, start PLANKA:

```bash
npm start --prod
```

## Access PLANKA

Once the services are running, browse to **http://YOUR_DOMAIN_NAME:YOUR_PORT** and log in as **YOUR_ADMIN_EMAIL** with the password **YOUR_ADMIN_PASSWORD**.
