---
sidebar_position: 3
---

# Logging

PLANKA supports exposing its internal log directory to the host machine via a shared Docker volume.

This feature is **disabled by default**.

## Enable Host Log Access

To enable logging to the host, add the following volume entry under `services.planka.volumes` in your `docker-compose.yml`:

```yaml
volumes:
  - ./logs/:/app/logs/
```

- `./logs/` refers to the **host** machine.
- `/app/logs/` refers to the **container**.

This will create a `logs` directory next to your `docker-compose.yml` and map it to PLANKA's internal logging folder.

> **Tip:** If logs aren't appearing, check file and folder permissions. You may need to `chown` or `chmod` the host directory appropriately.

## Log Rotation

Over time, logs can consume disk space. Use **logrotate** to automatically manage log size and retention.

### Configure logrotate for PLANKA

Create a file at `/etc/logrotate.d/planka` with the following content:

```
/path/to/planka/logs/planka.log {
  daily
  missingok
  rotate 14
  compress
  delaycompress
  notifempty
  create 640 root adm
  sharedscripts
}
```

Be sure to replace `/path/to/planka/logs/planka.log` with your actual log file path on the host system.

To apply changes:

```bash
sudo systemctl restart logrotate
```

This setup will:

- Rotate logs **daily**
- Keep the last **14** logs
- Compress old logs to save space
- Only rotate if the log is **not empty**

---

Now your logs will be persisted on the host and managed efficiently.
