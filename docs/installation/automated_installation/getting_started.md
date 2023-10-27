---
sidebar_position: 2
---
# Getting started
## READ BEFORE INSTALL

**Do not run this installer on a server that is already in use.**

**Because you need a fresh server anyway, i recommend Ubuntu 22.04 or Debian 12.**

#### Supported OS
| Ubuntu | Debian | CentOS |
|---|---|---|
| 20.04 | 11 | Stream 8 |
| 22.04 | 12 | Stream 9 |

## Installation
```bash
wget https://raw.githubusercontent.com/plankanban/planka-installer/main/installer.sh -O /opt/planka_installer.sh && bash /opt/planka_installer.sh
```

#### SSL Setup
* You need to have a valid DNS-entry that points to your server.
* Your server needs to be reachable from port 80 and 443.
* A valid mail address is required.

## Migration
**Users who used the installer before Oct. 11 2023 please run the migration script**
```bash
wget https://raw.githubusercontent.com/plankanban/planka-installer/main/migration.sh -O /opt/installer_migration.sh && bash /opt/installer_migration.sh && rm -f /opt/installer_migration.sh
```