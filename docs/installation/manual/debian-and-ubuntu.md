---
sidebar_position: 1
---

# Debian & Ubuntu

:::warning
We **strongly recommend** using the [**Docker-based installation**](../docker/production-version.md) for PLANKA.

The manual installation requires additional security configurations and a deep understanding of your environment. For example, to prevent SSRF and accidental access to internal services, you would need to properly configure an outgoing HTTP proxy.

The Docker version comes with a **pre-installed outgoing proxy**, which can be easily configured using Docker-only environment variables (`OUTGOING_BLOCKED_IPS`, `OUTGOING_BLOCKED_HOSTS`, `OUTGOING_ALLOWED_IPS`, `OUTGOING_ALLOWED_HOSTS`) to safely restrict outbound traffic.
:::

### System Requirements

- Debian 13 or Ubuntu 26.04 LTS (Debian 12 and Ubuntu 24.04 work as well)
- PostgreSQL 15 or newer (the version your distribution ships is fine)
- Node.js 24 or newer
- Python 3.11 or newer

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

To avoid `sudo` permission issues, run these from `/tmp`:

```bash
cd /tmp
```

**Create a PostgreSQL user:**

```bash
sudo -u postgres createuser planka
```

**Create the database, owned by that user:**

```bash
sudo -u postgres createdb -O planka planka
```

The `planka` user does not have to be a superuser.

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
NODE_MAJOR=24
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list

# Install Node.js
sudo apt-get update
sudo apt-get install nodejs -y
```

Verify installation:

```bash
node -v
# Output: v24.x.x
```

## Install PLANKA

Install required packages:

```bash
sudo apt install unzip build-essential python3-venv -y
```

Create the installation directory and set ownership:

```bash
sudo mkdir -p /var/www/planka/
sudo chown -R planka:planka /var/www/planka/
cd /var/www/planka
```

Switch to the `planka` user:

```bash
sudo -i -u planka
cd /var/www/planka
```

Download and extract the prebuilt version of PLANKA:

```bash
curl -fsSL -O https://github.com/plankanban/planka/releases/latest/download/planka-prebuild.zip
unzip planka-prebuild.zip -d /var/www/
rm planka-prebuild.zip
```

Install dependencies:

```bash
npm install
```

### Configure Environment Variables

Copy the sample `.env` file:

```bash
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

From the `/var/www/planka/` directory, start PLANKA:

```bash
npm run start:prod
```

:::info
`npm run start:prod` is the command for production. `npm start` runs the development file watcher instead, and npm 12 rejects the `npm start --prod` that older guides used.
:::

To keep PLANKA running across reboots, see [Run as a Service](../../configuration/run-as-a-service.md). To update it later, see [How to Update](./how-to-update.md).

## Access PLANKA

Once the services are running, browse to **http://YOUR_DOMAIN_NAME:YOUR_PORT** and log in as **YOUR_ADMIN_EMAIL** with the password **YOUR_ADMIN_PASSWORD**.

