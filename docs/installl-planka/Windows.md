---
sidebar_position: 4
---

### System requirements
* PostgreSQL (testet with v15.2) https://www.postgresql.org/download/windows/
* Nodejs (testet with 18.14.2) https://nodejs.org/en/download/
* Windows Powershell as **Administrator**
### Install Planka
First we have to prepare some stuff
our installation directory is `C:\planka`
```batch
mkdir C:\planka
cd C:\planka
```

**Clone the repository into the directory.**
```batch
git clone https://github.com/plankanban/planka.git .
```



**Install dependencies for client and build it.**

```batch
npm install

cd client
npm run build
```

**Symlink Fun**
Normaly we have to copy everything from ``client\build`` to ``server\public`` and ``build\index.html`` to ``server\views\index.ejs``, we don't want to go this way.
instead we are using symlinks, this makes updating way easier and faster.


```batch
New-Item -ItemType SymbolicLink -Path "C:\planka\server\public\asset-manifest.json" -Target "C:\planka\client\build\asset-manifest.json"
New-Item -ItemType SymbolicLink -Path "C:\planka\server\public\favicon.ico" -Target "C:\planka\client\build\favicon.ico"
New-Item -ItemType SymbolicLink -Path "C:\planka\server\public\logo192.png" -Target "C:\planka\client\build\logo192.png"
New-Item -ItemType SymbolicLink -Path "C:\planka\server\public\logo512.png" -Target "C:\planka\client\build\logo512.png"
New-Item -ItemType SymbolicLink -Path "C:\planka\server\public\manifest.json" -Target "C:\planka\client\build\manifest.json"
New-Item -ItemType SymbolicLink -Path "C:\planka\server\public\robots.txt" -Target "C:\planka\client\build\robots.txt"
New-Item -ItemType SymbolicLink -Path "C:\planka\server\public\static" -Target "C:\planka\client\build\static"
New-Item -ItemType SymbolicLink -Path "C:\planka\server\views\index.ejs" -Target "C:\planka\client\build\index.html"
```


#### Configure environment variables.
Go into the ``server`` directory and edit the ``.env`` file

First we have to copy the ``.env.sample`` file
```batch
cd C:\planka\server
cp .env.sample .env
```

Before we open the .env file, we need a screct_key
you can generate one using this Powershell command

```batch
-join ((33..126) | Get-Random -Count 32 | % {[char]$_})
```
**Note the output down**


Edit ``.env`` file
```batch
notepad.exe .env
```

Your ``.env`` file should look like this

```batch
## Required
BASE_URL=YOUR_DOMAINNAME:YOUR_PORT
DATABASE_URL=postgresql://planka:YOUR_DATABASE_PASSWORD@localhost/planka
SECRET_KEY=YOUR_GENERATED_KEY

## Optional

# TRUST_PROXY=0
# TOKEN_EXPIRES_IN=365 # In days

## Do not edit this

TZ=UTC
```



#### Start Planka the first Time
in the ``C:\planka\server`` directory just type

```batch
npm run db:init
npm start --prod
```

Now you can browse to **http://YOUR_DOMAINNAME:1337** and login with ``demo@demo.demo`` with password ``demo``


### Problems

It's possible that you are running into an issue while building Planka in Windows

Use this command, should fix it.
```batch
git config --global core.autocrlf false
```

After that, you need restart the whole installation 
