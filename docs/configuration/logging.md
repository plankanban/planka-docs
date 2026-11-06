---
sidebar_position: 4
---

# Logging

PLANKA writes every log line to the console and to `logs/planka.log` below its working directory. The file is rotated at 10 MB and at most three files are kept, so you do not need `logrotate`.

## Settings

| Variable | Default | Description |
| --- | --- | --- |
| `LOG_LEVEL` | `warn` | One of `error`, `warn`, `info`, `http`, `verbose`, `debug`, `silly`, from least to most verbose. |
| `LOG_FILE` | `logs/planka.log` | Where the log file is written. Set it to `none` for console output only. |
| `LOG_STDERR_LEVELS` | empty | Comma-separated levels to write to stderr instead of stdout, for example `error,warn`. |

## Docker

Read the console output with:

```bash
docker compose logs -f planka
```

That is enough for most setups. If a log collector already reads it, set `LOG_FILE=none`, since the file is only a second copy.

To get the log file on the host, for example for [Fail2ban](./security/fail2ban.md), add this under `services.planka.volumes` in your `docker-compose.yml`:

```yaml
volumes:
  - ./logs/:/app/logs/
```

The container runs as uid 1000, so that user has to be able to write to the folder:

```bash
mkdir -p logs
sudo chown -R 1000:1000 logs
```

## Manual Installation

The log file is at `/var/www/planka/logs/planka.log`. With the [systemd service](./run-as-a-service.md), the console output is also available through `journalctl -u planka`.
