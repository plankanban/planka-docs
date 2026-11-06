---
sidebar_position: 2
---

# Getting Started

:::warning
**Do not run** this installer on a server that is already in use.

You need a fresh server with one of the operating systems listed below.
:::

### Supported Operating Systems

- Debian 13
- Ubuntu 26.04 LTS

## Installation

Run the following command to start the installation process:

```bash
wget https://raw.githubusercontent.com/plankanban/planka-installer/main/installer.sh -O /opt/planka_installer.sh && bash /opt/planka_installer.sh
```

#### SSL Setup

- You must have a valid DNS entry that points to your server.
- Your server needs to be reachable on ports 80 and 443.
- A valid email address is required for SSL certificates.
