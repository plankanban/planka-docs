---
sidebar_position: 3
---
# Windows
### System requirements
* PostgreSQL (testet with v15.2) https://www.postgresql.org/download/windows/
* Nodejs (testet with 18.14.2) https://nodejs.org/en/download/
* Windows Powershell as **Administrator**
### Install Planka
**Our installation directory is `C:\planka`**
```powershell
mkdir C:\planka
```

**Download the prebuild version of Planka.**
```powershell
cd C:\planka
curl https://github.com/plankanban/planka/releases/download/v1.15.7/planka-prebuild-v1.15.7.zip -o planka-prebuild.zip
Expand-Archive  planka-prebuild.zip -DestinationPath C:\
rm planka-prebuild.zip
```

**Install dependencies for client and build it.**
```powershell
npm install
```

#### Configure environment variables.
Edit the ``.env`` file
First we have to copy the ``.env.sample`` file

```powershell
cp .env.sample .env
```

Before we open the .env file, we need a screct_key
you can generate one using this Powershell command

```powershell
-join ((33..126) | Get-Random -Count 32 | % {[char]$_})
```
**Note the output down**


Edit ``.env`` file
```powershell
notepad.exe .env
```

Your ``.env`` file should look like this

```powershell
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
in the ``C:\planka`` directory just type

```powershell
npm run db:init
npm start --prod
```

Now you can browse to **http://YOUR_DOMAIN_NAME:YOUR_PORT** and login as **YOUR_ADMIN_EMAIL** with password **YOUR_ADMIN_PASSWORD**


### Problems

It's possible that you are running into an issue while building Planka in Windows

Use this command, should fix it.
```powershell
git config --global core.autocrlf false
```

After that, you need restart the whole installation
