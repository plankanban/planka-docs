---
sidebar_position: 2
---

# Docker

:::danger
There is **no way to revert** after migrating to v2 without a proper backup.
:::

:::warning
Hosting under a path like `https://example.domain/planka` is **not currently supported**.

Consider using a subdomain instead.
:::

:::warning
After the migration, due date completion statuses **will be reset**.

See [this issue](https://github.com/plankanban/planka/issues/1519) for the cause and how to fix it.
:::

:::info
Before proceeding, ensure you are running **>= 1.26.2** of PLANKA.

If not, update to this version first.
:::

## 1. Create a Backup

Navigate to the directory containing your `docker-compose.yml` file.

### Database Backup

The instance should be running while performing the backup.

```bash
docker compose exec postgres pg_dump -U postgres planka > planka_backup_$(date +%Y%m%d).sql
```

### Volume Backups

> **Important:** Replace the volume names (`planka_user-avatars`, `planka_attachments`, `planka_project-background-images`) below with the actual volume names used in your setup.
>
> After running the commands, verify the created `.tar.gz` files contain the expected data.

```bash
docker run --rm -v $(pwd):/backup -v planka_user-avatars:/data alpine tar -czvf /backup/user-avatars.tar.gz -C /data .
docker run --rm -v $(pwd):/backup -v planka_attachments:/data alpine tar -czvf /backup/attachments.tar.gz -C /data .
docker run --rm -v $(pwd):/backup -v planka_project-background-images:/data alpine tar -czvf /backup/project-background-images.tar.gz -C /data .
```

## 2. Stop and Remove Containers

```bash
docker compose down
```

## 3. Add New Volumes

Update the `volumes` sections:

```
services:
  planka:
    ...
    volumes:
+     - data:/app/data
      - user-avatars:/app/public/user-avatars
      - project-background-images:/app/public/project-background-images
+     - background-images:/app/public/background-images
      - attachments:/app/private/attachments
    ...

volumes:
+ data:
  user-avatars:
  project-background-images:
+ background-images:
  attachments:
  db-data:
```

## 4. Clean Up Environment Variables

### Remove Deprecated Variables

Delete the following from your environment section:

* `ALLOW_ALL_TO_CREATE_PROJECTS` — Now managed via user-specific global roles.
* `SLACK_*`, `GOOGLE_*`, `TELEGRAM_*` — Replaced by in-app notifications with support for 100+ services.
* `TZ` - No longer needed, now handled automatically.

### Update the `TRUST_PROXY` Value

Regardless of whether you've previously set the `TRUST_PROXY` environment variable, you have to ensure it uses the correct boolean string value. If it's currently set to `0`, update it to `false` (even if the variable is commented out). If it's set to `1`, update it to `true`. The use of numeric values (`0` or `1`) is no longer supported and may lead to unexpected behavior.

### Add New Variables

Add these new environment variable if needed:

```yaml
# - MAX_UPLOAD_FILE_SIZE=

# - STORAGE_LIMIT=
# - ACTIVE_USERS_LIMIT=

# The default application language used as a fallback when a user's language is not set.
# This language is also used for per-board notifications.
# - DEFAULT_LANGUAGE=en-US

# All outgoing HTTP requests (SMTP, webhooks, Apprise notifications, favicon fetching, etc.)
# will be sent through this proxy if set.
# If commented out, an internal Squid proxy will be started inside the container,
# which you can control via OUTGOING_BLOCKED_* and OUTGOING_ALLOWED_* below.
# - OUTGOING_PROXY=http://proxy:3128

# - OIDC_USE_OAUTH_CALLBACK=true
# - OIDC_PROJECT_OWNER_ROLES=project_owner
# - OIDC_BOARD_USER_ROLES=board_user
# - OIDC_DEBUG=true

# - SMTP_NAME=

# Using Gravatar directly exposes user IPs and hashed emails to a third party (GDPR risk).
# Use a proxy you control for privacy, or leave commented out or empty to disable.
# - GRAVATAR_BASE_URL=https://www.gravatar.com/avatar/

# --------------------------------------------------------------------
# Outgoing traffic control (internal Squid proxy)
# --------------------------------------------------------------------

# These IPs/hostnames will always be blocked (highest priority)
# - OUTGOING_BLOCKED_IPS=
# - OUTGOING_BLOCKED_HOSTS=localhost,postgres

# Only these IPs/hostnames will be reachable
# - OUTGOING_ALLOWED_IPS=
# - OUTGOING_ALLOWED_HOSTS=
```

If you are using S3, OIDC, or other internal integrations, we recommend uncommenting `OUTGOING_BLOCKED_HOSTS` and adding their hostnames to the blocked list.

## 5. Pull the Docker Image

Ensure the PLANKA image is set to the `latest` tag in your `docker-compose.yml`.

```bash
docker compose pull
```

## 6. Copy Background Images to New Location

Copy existing background images to the new volume:

```bash
docker compose run --rm --user root planka sh -c 'cp -av /app/public/project-background-images/. /app/public/background-images && chown -R node:node /app/public/background-images'
```

## 7. Run the Upgrade Script

:::info
This must be done before starting PLANKA for the first time.
:::

```bash
docker compose run --rm planka npm run db:upgrade
```

## 8. Upgrade to New Data Structure

Copy data files to the new unified volume:

```bash
docker compose run --rm planka sh -c 'mkdir -p /app/data/protected /app/data/private && for folder in user-avatars background-images; do cp -av /app/public/$folder /app/data/protected; done && cp -av /app/private/attachments /app/data/private'
```

## 9. Remove the Old Volume Reference

Update your `docker-compose.yml` to remove the old volumes:

```
services:
  planka:
    ...
    volumes:
      - data:/app/data
-     - user-avatars:/app/public/user-avatars
-     - project-background-images:/app/public/project-background-images
-     - background-images:/app/public/background-images
-     - attachments:/app/private/attachments
    ...

volumes:
  data:
- user-avatars:
- project-background-images:
- background-images:
- attachments:
  db-data:
```

## 10. Start PLANKA and Verify

Start PLANKA:

```bash
docker compose up -d
```

Monitor logs for issues:

```bash
docker compose logs -f
```

### Verify:

- Application starts successfully
- You can log in
- Projects, boards, and cards are displayed
- All uploaded images and files appear correctly

## 11. Clean Up

Once confirmed everything works, remove the old volumes:

```bash
docker volume rm planka_user-avatars planka_project-background-images planka_background-images planka_attachments
```

## Troubleshooting

If you encounter issues:

- Check logs with `docker compose logs -f planka`
- Ensure every command completed successfully
- If necessary, restore from your backup and try again
