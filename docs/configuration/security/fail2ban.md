---
sidebar_position: 2
---

# Fail2ban

Fail2ban is a security tool that helps protect your system from brute-force attacks. It monitors log files and, upon detecting a series of failed login attempts, blocks the offending IP addresses for a specified time using `iptables`.

## Setup a Filter and a Jail for PLANKA

To protect PLANKA from brute-force attacks, you'll need to set up both a **filter** and a **jail** in Fail2ban.

### 1. Create the Filter

A **filter** defines regular expressions to identify failed authentication attempts in the log files.

Create a file named `planka.conf` in `/etc/fail2ban/filter.d` with the following contents:

```conf
[Definition]
failregex = ^(.*) Invalid (email or username:|password!) (\"(.*)\"!)? ?\(IP: <ADDR>\)$
ignoreregex =
```

### 2. Create the Jail

A **jail** controls how to handle the failed authentication attempts found by the filter. 

Create a file named `planka.local` in `/etc/fail2ban/jail.d` with the following contents:

```conf
[planka]
enabled = true
port = http,https
filter = planka
logpath = /path/to/planka/logs/planka.log
maxretry = 5
bantime = 900
```

> **Note:** Replace `/path/to/planka/logs/planka.log` with the actual location of your PLANKA log file (ensure you've enabled [logging](../logging.md)).

- `maxretry` defines the number of failed login attempts before banning an IP.
- `bantime` is the duration (in seconds) for which the offending IP will be blocked (900 seconds = 15 minutes).

### 3. Restart Fail2ban

After setting up the filter and jail, restart the Fail2ban service to apply the changes:

```bash
sudo systemctl restart fail2ban
```

### 4. Check the Status of PLANKA's Jail

To monitor the status of the Fail2ban jail for PLANKA, use the following command:

```bash
fail2ban-client status planka
```

## Additional Considerations

Make sure you:

- Have **logging** enabled in your PLANKA setup.
- Adjust the `logpath` in the jail configuration if your log file is in a different location or has a different name.
- Update the `port` field if you're using non-standard ports for HTTP or HTTPS.

---

By using Fail2ban, you can significantly reduce the risk of brute-force attacks on your PLANKA instance.
