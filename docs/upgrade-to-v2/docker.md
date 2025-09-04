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

:::info
Before proceeding, ensure you are running **>= 1.26.2** of PLANKA.

If not, update to this version first.
:::

## 1. Create a Backup

Navigate to the directory containing your `docker-compose.yml` file.

### Database Backup

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

## 3. Change Image Tag to `2.0.0-rc.4`

Edit your `docker-compose.yml` file and update the PLANKA image:

```
services:
  planka:
-   image: ghcr.io/plankanban/planka:latest
+   image: ghcr.io/plankanban/planka:2.0.0-rc.4
    ...
```

## 4. Add New Volumes

Update the `volumes` sections:

```
services:
  planka:
    ...
    volumes:
+     - favicons:/app/public/favicons
      - user-avatars:/app/public/user-avatars
      - project-background-images:/app/public/project-background-images # Will be deleted after migration
+     - background-images:/app/public/background-images
      - attachments:/app/private/attachments
    ...

volumes:
+ favicons:
  user-avatars:
  project-background-images:
+ background-images:
  attachments:
  db-data:
```

## 5. Clean Up Environment Variables

### Remove Deprecated Variables

Delete the following from your environment section:

* `ALLOW_ALL_TO_CREATE_PROJECTS` — Now managed via user-specific global roles.
* `SLACK_*`, `GOOGLE_*`, `TELEGRAM_*` — Replaced by in-app notifications with support for 100+ services.

### Update the `TRUST_PROXY` Value

Regardless of whether you've previously set the `TRUST_PROXY` environment variable, you have to ensure it uses the correct boolean string value. If it's currently set to `0`, update it to `false` (even if the variable is commented out). If it's set to `1`, update it to `true`. The use of numeric values (`0` or `1`) is no longer supported and may lead to unexpected behavior.

### Add New Variable

Add this new environment variable:

```yaml
DEFAULT_LANGUAGE=en-US
```

This sets the default language for sending notifications per user (if a user hasn't selected a language) and per board. It also acts as a fallback when translations are not available.

## 6. Pull the Docker Image

```bash
docker compose pull
```

## 7. Copy Background Images to New Location

Copy existing background images to the new volume:

```bash
docker compose run --rm planka cp -av /app/public/project-background-images/. /app/public/background-images
```

## 8. Run the Database Upgrade Script

:::info
This must be done before starting PLANKA for the first time.
:::

```bash
docker compose run --rm planka npm run db:upgrade
```

## 9. Remove the Old Volume Reference

Update your `docker-compose.yml` to remove the old `project-background-images` volume:

```
services:
  planka:
    ...
    volumes:
      - favicons:/app/public/favicons
      - user-avatars:/app/public/user-avatars
-     - project-background-images:/app/public/project-background-images
      - background-images:/app/public/background-images
      - attachments:/app/private/attachments
    ...

volumes:
  favicons:
  user-avatars:
- project-background-images:
  background-images:
  attachments:
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
- Background images are visible

## 11. Clean Up

Once confirmed everything works, remove the old volume:

```bash
docker volume rm planka_project-background-images
```

## Troubleshooting

If you encounter issues:

- Check logs with `docker compose logs -f planka`
- Ensure database migrations completed successfully
- If necessary, restore from your backup and try again
