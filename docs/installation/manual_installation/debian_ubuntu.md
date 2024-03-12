---
sidebar_position: 2
---
# Debian & Ubuntu
### System requirements
 + Debian 11 or Ubuntu 22.04
 + PostgreSQL
 + Nodejs



### PostgreSQL
###### Installing PostgreSQL

To install PostgreSQL, first refresh your server’s local package index:
```bash
sudo apt update
```

Then, install the Postgres package along with a -contrib package that adds some additional utilities and functionality:


```bash
sudo apt install postgresql postgresql-contrib -y
```

If you are prompted to restart any services, press **ENTER** to accept the defaults and continue.

##### Creating User and Database
You need to create a User and a Database for Planka

**Create the user**
```bash
sudo -u postgres createuser --interactive
```


The script will prompt you with some choices and, based on your responses, execute the correct Postgres commands to create a user to your specifications.

```bash
Output
Enter name of role to add: planka
Shall the new role be a superuser? (y/n) y
```



**Create the Database**

Change directory to prevent a sudo permission error
```bash
cd /tmp
```

Now create the database, you are not getting any response from this command.
```bash
sudo -u postgres createdb planka
```



##### Create a Unix User and test Database acceess and change the password
We need this user later to run planka as non-root user too

```bash
sudo adduser planka
```


Login to the Database as user Planka
```bash
sudo -u planka psql
```

Change the database password
```bash
ALTER USER planka PASSWORD 'YOUR_DATABASE_PASSWORD';
```

Cloese the database with

```bash
\q
```


### Nodejs
Installing Node.js with Apt Using a [NodeSource](https://github.com/nodesource/distributions#nodejs) PPA

```bash
# Download and import the Nodesource GPG key
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

# Create deb repository
NODE_MAJOR=18
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
```

Then run update and install
```bash
sudo apt-get update
sudo apt-get install nodejs -y
```

Verify that you’ve installed the new version by running node with the -v version flag:
```bash
node -v
```
```bash
Output
v18.X.X
```

### Install Planka
First we have to prepare some stuff
our installation directory is `/vaw/www/planka`

```bash
sudo mkdir -p /var/www/planka/
sudo chown -R planka:planka /var/www/planka/
```

Now we can work as user **Planka**
```bash
sudo -i -u planka
```

**Download the prebuild version of Planka.**
```bash
cd /var/www/planka
curl -fsSL https://github.com/plankanban/planka/releases/download/v1.15.6/planka-prebuild-v1.15.6.zip -o planka-prebuild.zip
unzip planka-prebuild.zip -d /var/www/
rm planka-prebuild.zip
```


**Install dependencies.**
```bash
cd planka
npm install
```

#### Configure environment variables.
Edit the ``.env`` file
First we have to copy the ``.env.sample`` file

```bash
cp .env.sample .env
```

Before we open the .env file, we need a screct_key
you can generate one using the openssl command
```bash
openssl rand -hex 64
```
**Note the output down**


Edit ``.env`` file
```bash
nano .env
```

Your ``.env`` file should look like this

```bash
## Required
BASE_URL=http://YOUR_DOMAIN_NAME:YOUR_PORT
DATABASE_URL=postgresql://planka:YOUR_DATABASE_PASSWORD@localhost/planka
SECRET_KEY=YOUR_GENERATED_KEY

## Optional

# TRUST_PROXY=0
# TOKEN_EXPIRES_IN=365 # In days

# related: https://github.com/knex/knex/issues/2354
# As knex does not pass query parameters from the connection string we
# have to use environment variables in order to pass the desired values, e.g.
# PGSSLMODE=<value>

# Configure knex to accept SSL certificates
# KNEX_REJECT_UNAUTHORIZED_SSL_CERTIFICATE=false

DEFAULT_ADMIN_EMAIL=YOUR_ADMIN_EMAIL # Do not remove if you want to prevent this user from being edited/deleted
DEFAULT_ADMIN_PASSWORD=YOUR_ADMIN_PASSWORD
DEFAULT_ADMIN_NAME=YOUR_ADMIN_NAME
DEFAULT_ADMIN_USERNAME=YOUR_ADMIN_USERNAME

# OIDC_ISSUER=
# OIDC_CLIENT_ID=
# OIDC_CLIENT_SECRET=
# OIDC_SCOPES=openid email profile
# OIDC_ADMIN_ROLES=admin
# OIDC_ROLES_ATTRIBUTE=groups
# OIDC_IGNORE_ROLES=true

## Do not edit this

TZ=UTC
```



#### Start Planka the first Time
in the ``/var/www/planka/`` directory just type

```bash
npm run db:init && npm start --prod
```

Now you can browse to **http://YOUR_DOMAIN_NAME:YOUR_PORT** and login as **YOUR_ADMIN_EMAIL** with password **YOUR_ADMIN_PASSWORD**
