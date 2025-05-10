---
sidebar_position: 2
---

# Docker

:::danger
There is **no way to revert** after migrating to v2 without a proper backup.
:::

:::info
Before proceeding, ensure you are running **at least version 1.26.2** of PLANKA.

If not, update to version 1.26.2 first.
:::

## 1. Stop and Remove Containers

To stop and remove the containers, run the following command from the folder containing your `docker-compose.yml` file:

```bash
docker compose down
```

## 2. Create a Backup

### Database Backup

```bash
docker compose exec postgres pg_dump -U postgres planka > planka_backup_$(date +%Y%m%d).sql
```

### Volume Backups

```bash
docker run --rm -v $(pwd):/backup -v planka_user-avatars:/data alpine tar -czvf /backup/user-avatars.tar.gz -C /data .
docker run --rm -v $(pwd):/backup -v planka_attachments:/data alpine tar -czvf /backup/attachments.tar.gz -C /data .
docker run --rm -v $(pwd):/backup -v planka_project-background-images:/data alpine tar -czvf /backup/project-background-images.tar.gz -C /data .
```

## 3. Change Image Tag to `2.0.0-rc.2`

Edit your `docker-compose.yml` file and update the PLANKA image:

```
services:
  planka:
-   image: ghcr.io/plankanban/planka:latest
+   image: ghcr.io/plankanban/planka:2.0.0-rc.2
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
+     - background-images:/app/public/background-images
      - attachments:/app/private/attachments
      - project-background-images:/app/public/project-background-images # Will be deleted after migration
    ...

volumes:
+ favicons:
  user-avatars:
+ background-images:
  attachments:
  db-data:
  project-background-images:
```

## 5. Clean Up Environment Variables

### Remove Deprecated Variables

Delete the following from your environment section:

* `ALLOW_ALL_TO_CREATE_PROJECTS` — Now managed via user-specific global roles.
* `SLACK_*`, `GOOGLE_*`, `TELEGRAM_*` — Replaced by in-app notifications with support for 140+ services.

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
      - background-images:/app/public/background-images
      - attachments:/app/private/attachments
-     - project-background-images:/app/public/project-background-images
    ...

volumes:
  favicons:
  user-avatars:
  background-images:
  attachments:
  db-data:
- project-background-images:
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
