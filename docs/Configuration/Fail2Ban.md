---
sidebar_position: 5
---

### Fail2ban

Fail2ban is a service that uses iptables to automatically drop connections for a pre-defined amount of time from IPs that continuously failed to authenticate to the configured services.

#### Setup a filter and a jail for Planka

A filter defines regex rules to identify when users fail to authenticate on Planka's user interface.

Create a file in `/etc/fail2ban/filter.d` named `planka.conf` with the following contents:

```conf
[Definition]
failregex = ^(.*) Invalid (email or username:|password!) (\"(.*)\"!)? ?\(IP: <ADDR>\)$
ignoreregex =
```

The jail file defines how to handle the failed authentication attempts found by the Planka filter.

Create a file in `/etc/fail2ban/jail.d` named `planka.local` with the following contents:

```conf
[planka]
enabled = true
port = http,https
filter = planka
logpath = /path/to/planka/logs/planka.log
maxretry = 5
bantime = 900
```

Ensure to replace `logpath`'s value with your installation’s `/logs/planka.log` location. If you are using ports other than 80 and 443 for your Web server you should replace those too. The bantime and findtime are defined in seconds.

Restart the fail2ban service. You can check the status of your Planka jail by running:

```bash
fail2ban-client status planka
```
