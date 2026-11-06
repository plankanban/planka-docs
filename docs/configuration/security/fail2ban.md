---
sidebar_position: 2
---

# Fail2ban

PLANKA already limits failed sign-ins on its own (see [Sign-in Limits](./detailed-authentication-errors.md#sign-in-limits)). Fail2ban adds to that by blocking an offending address at the firewall, based on PLANKA's log file.

## Requirements

- The log file has to be reachable from the host. In a manual installation it is at `/var/www/planka/logs/planka.log`; with Docker, you have to [mount it](../logging.md#docker).
- Behind a reverse proxy, set [`TRUST_PROXY=true`](../reverse-proxy/nginx.md). Otherwise, every failed sign-in is logged with the address of the proxy, and Fail2ban locks everybody out by banning it.

## Setup

1. **Create the Filter**

   Create `/etc/fail2ban/filter.d/planka.conf`:

   ```ini
   [Definition]
   failregex = ^(.*) Invalid (email or username:|password!) (\"(.*)\"!)? ?\(IP: <ADDR>\)$
               ^(.*) Login rate limit hit \(IP: <ADDR>\)$
   ignoreregex =
   ```

2. **Create the Jail**

   Create `/etc/fail2ban/jail.d/planka.local`:

   ```ini
   [planka]
   enabled = true
   backend = polling
   port = http,https
   filter = planka
   logpath = /var/www/planka/logs/planka.log
   maxretry = 5
   bantime = 900
   ```

   Adjust `logpath` and `port` to your setup. `maxretry` is the number of failed attempts before an address is banned, `bantime` is how long the ban lasts in seconds.

   :::warning
   Are you publishing PLANKA's port directly from Docker, with no reverse proxy on the host? Then add `chain = DOCKER-USER` to the jail. Docker's forwarded traffic bypasses the default `INPUT` chain, so the ban would have no effect.
   :::

3. **Test the Filter and Restart Fail2ban**

   ```bash
   sudo fail2ban-regex /var/www/planka/logs/planka.log /etc/fail2ban/filter.d/planka.conf
   sudo systemctl restart fail2ban
   ```

4. **Check the Jail**

   ```bash
   sudo fail2ban-client status planka
   ```
