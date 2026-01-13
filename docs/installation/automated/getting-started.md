---
sidebar_position: 2
---

# Getting Started

:::warning
This installation method **is outdated** and may not include all current configuration options.

For the best experience, we recommend using the [**Docker-based installation**](../docker/production-version.md).
:::

:::warning
**Do not run** this installer on a server that is already in use.

Since you need a fresh server, I recommend using Ubuntu 22.04 or Debian 12.
:::

### Supported Operating Systems

| Ubuntu    | Debian    | CentOS       |
|-----------|-----------|--------------|
| 20.04     | 11        | Stream 8     |
| 22.04     | 12        | Stream 9     |

## Installation

Run the following command to start the installation process:

```bash
wget https://raw.githubusercontent.com/plankanban/planka-installer/main/installer.sh -O /opt/planka_installer.sh && bash /opt/planka_installer.sh
```

#### SSL Setup

- You must have a valid DNS entry that points to your server.
- Your server needs to be reachable on ports 80 and 443.
- A valid email address is required for SSL certificates.

## Migration

**Users who used the installer before October 11, 2023, should run the migration script.**

To do so, use the following command:

```bash
wget https://raw.githubusercontent.com/plankanban/planka-installer/main/migration.sh -O /opt/installer_migration.sh && bash /opt/installer_migration.sh && rm -f /opt/installer_migration.sh
```
