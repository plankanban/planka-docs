---
sidebar_position: 2
---

# Windows

:::danger
This version **is not production-ready** and may result in data loss. Use at your own risk.

**No Backup - No Mercy!**
:::

### System Requirements

- PostgreSQL (tested with v15.2): https://www.postgresql.org/download/windows/
- Node.js (tested with v18.14.2): https://nodejs.org/en/download/
- Windows PowerShell **as Administrator**

## Install PLANKA (Nightly)

Create the installation directory:

```powershell
mkdir C:\planka
cd C:\planka
```

Clone the repo:

```powershell
git clone https://github.com/plankanban/planka.git .
```

Install dependencies and build the client:

```powershell
npm install

cd client
npm run build
```

### Set Up Symlinks

Instead of copying files, use symbolic links for easier updates:

```powershell
New-Item -ItemType SymbolicLink -Path "C:\planka\server\public\favicon.ico" -Target "C:\planka\client\dist\favicon.ico"
New-Item -ItemType SymbolicLink -Path "C:\planka\server\public\logo192.png" -Target "C:\planka\client\dist\logo192.png"
New-Item -ItemType SymbolicLink -Path "C:\planka\server\public\logo512.png" -Target "C:\planka\client\dist\logo512.png"
New-Item -ItemType SymbolicLink -Path "C:\planka\server\public\manifest.json" -Target "C:\planka\client\dist\manifest.json"
New-Item -ItemType SymbolicLink -Path "C:\planka\server\public\robots.txt" -Target "C:\planka\client\dist\robots.txt"
New-Item -ItemType SymbolicLink -Path "C:\planka\server\public\assets" -Target "C:\planka\client\dist\assets"
New-Item -ItemType SymbolicLink -Path "C:\planka\server\views\index.html" -Target "C:\planka\client\dist\index.html"
```

### Configure Environment Variables

Go to the `server` directory and copy the sample `.env` file:

```powershell
cd C:\planka\server
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

From the `server` directory, start PLANKA:

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
