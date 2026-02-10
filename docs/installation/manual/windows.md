---
sidebar_position: 2
---

# Windows

:::warning
We **strongly recommend** using the [**Docker-based installation**](../docker/production-version.md) for PLANKA.

The manual installation requires additional security configurations and a deep understanding of your environment. For example, to prevent SSRF and accidental access to internal services, you would need to properly configure an outgoing HTTP proxy.

The Docker version comes with a **pre-installed outgoing proxy**, which can be easily configured using Docker-only environment variables (`OUTGOING_BLOCKED_IPS`, `OUTGOING_BLOCKED_HOSTS`, `OUTGOING_ALLOWED_IPS`, `OUTGOING_ALLOWED_HOSTS`) to safely restrict outbound traffic.
:::

### System Requirements

- PostgreSQL (tested with v16): https://www.postgresql.org/download/windows/
- Node.js (tested with v22): https://nodejs.org/en/download/
- Windows PowerShell **as Administrator**

## Install PLANKA

Create the installation directory:

```powershell
mkdir C:\planka
cd C:\planka
```

Download and extract the prebuilt version of PLANKA:

```powershell
curl -O https://github.com/plankanban/planka/releases/latest/download/planka-prebuild.zip
Expand-Archive planka-prebuild.zip -DestinationPath C:\
rm planka-prebuild.zip
```

Install dependencies:

```powershell
npm install
```

### Configure Environment Variables

Copy the sample `.env` file:

```powershell
cp .env.sample .env
```

Generate a secret key:

```powershell
-join ((33..126) | Get-Random -Count 32 | % {[char]$_})
```

> Note the output - you'll need it for the `.env` file.

Edit the `.env` file:

```powershell
notepad.exe .env
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

```powershell
npm run db:init
```

**Create an admin user:**

```powershell
npm run db:create-admin-user
```

Sample output:

```powershell
Email: YOUR_ADMIN_EMAIL
Password: YOUR_ADMIN_PASSWORD
Name: ...
Username (optional): ...
```

## Start PLANKA

From the `C:\planka` directory, start PLANKA:

```powershell
npm start --prod
```

## Access PLANKA

Once the services are running, browse to **http://YOUR_DOMAIN_NAME:YOUR_PORT** and log in as **YOUR_ADMIN_EMAIL** with the password **YOUR_ADMIN_PASSWORD**.

## Troubleshooting

If you encounter issues during the build process on Windows, try:

```powershell
git config --global core.autocrlf false
```

Then restart the installation process from the beginning.
