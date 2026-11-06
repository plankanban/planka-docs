---
sidebar_position: 1.5
---

# Environment Variables

Set these in `.env` for a manual installation, or under `environment` in `docker-compose.yml`. Restart PLANKA after changing them.

## Required

| Variable | Description |
| --- | --- |
| `BASE_URL` | The address users open PLANKA at, for example `https://planka.example.com`. |
| `DATABASE_URL` | PostgreSQL connection string, for example `postgresql://planka:PASSWORD@localhost/planka`. Characters that are special in a URL have to be percent-encoded. |
| `SECRET_KEY` | Signs every access token. Generate one with `openssl rand -hex 64`. Anyone who knows it can sign in as any user. |

## Storing Secrets in Files

These variables can be read from a file by adding `__FILE` to the name, which is what Docker secrets need: `DATABASE_URL`, `DATABASE_PASSWORD`, `SECRET_KEY`, `DEFAULT_ADMIN_PASSWORD`, `S3_SECRET_ACCESS_KEY`, `SMTP_PASSWORD`.

```yaml
- SECRET_KEY__FILE=/run/secrets/secret_key
```

`DATABASE_PASSWORD` is used through a placeholder: `DATABASE_URL=postgresql://postgres:$${DATABASE_PASSWORD}@postgres/planka`.

## Database

| Variable | Description |
| --- | --- |
| `DATABASE_SCHEMA` | The schema PLANKA lives in. It must already exist, and the database user must be able to create tables in it. Defaults to the connection's search path. |
| `PGSSLMODE` | Used when `DATABASE_URL` says nothing about TLS. Prefer `?sslmode=verify-full&sslrootcert=/path/to/ca.pem` in the URL. |
| `KNEX_REJECT_UNAUTHORIZED_SSL_CERTIFICATE` | Set to `false` to accept a certificate that cannot be verified. |

## General

| Variable | Default | Description |
| --- | --- | --- |
| `TRUST_PROXY` | `false` | Set to `true` behind a [reverse proxy](./reverse-proxy/nginx.md), so PLANKA sees the real client address. |
| `TOKEN_EXPIRES_IN` | `365` | Lifetime of access tokens in days. |
| `MAX_UPLOAD_FILE_SIZE` | | Largest upload. |
| `STORAGE_LIMIT` | | Total storage limit. |
| `ACTIVE_USERS_LIMIT` | | Maximum number of active users. |
| `DEFAULT_LANGUAGE` | `en-US` | Fallback for users with no language set, also used for per-board notifications and to select the main [terms](./customizing-end-user-terms.md). |
| `SWAGGER_EXPOSED` | `false` | Set to `true` to serve the API specification at `/swagger.json`. |
| `GRAVATAR_BASE_URL` | | Gravatar endpoint. Using Gravatar directly exposes user addresses and hashed emails to a third party, so prefer a proxy you control. Empty disables it. |

## Admin User

`DEFAULT_ADMIN_EMAIL`, `DEFAULT_ADMIN_PASSWORD`, `DEFAULT_ADMIN_NAME` and `DEFAULT_ADMIN_USERNAME` create the first administrator. See [Admin User](./admin-user.md).

## Logging

`LOG_LEVEL`, `LOG_FILE` and `LOG_STDERR_LEVELS`. See [Logging](./logging.md).

## Security

| Variable | Default | Description |
| --- | --- | --- |
| `SHOW_DETAILED_AUTH_ERRORS` | `false` | See [Detailed Authentication Errors](./security/detailed-authentication-errors.md). |
| `AUTH_RATE_LIMIT_WINDOW` | `60` | See [Sign-in Limits](./security/detailed-authentication-errors.md#sign-in-limits). |
| `AUTH_RATE_LIMIT_MAX_PER_IP` | `30` | |
| `AUTH_RATE_LIMIT_MAX_PER_IDENTIFIER` | `10` | |

## Outgoing Requests

| Variable | Description |
| --- | --- |
| `OUTGOING_PROXY` | Sends all outgoing HTTP requests (SMTP, webhooks, Apprise notifications, favicon fetching) through this proxy. |
| `OUTGOING_BLOCKED_IPS`, `OUTGOING_BLOCKED_HOSTS` | Always blocked, highest priority. |
| `OUTGOING_ALLOWED_IPS`, `OUTGOING_ALLOWED_HOSTS` | When set, only these are reachable. |

The Docker image enforces these rules with a built-in proxy, which it starts when `OUTGOING_PROXY` is not set. Its default is `OUTGOING_BLOCKED_HOSTS=localhost,postgres`.

### Apprise Services Without HTTP

Apprise notification services that do not use HTTP, such as email, syslog and IRC, do not go through a proxy. PLANKA applies the same rules to them itself and checks the address each connection resolves to. This covers Apprise only, not email configured with `SMTP_*`.

Outside Docker there is no built-in proxy, so these services are all the rules cover. Everything else, such as webhooks, needs your own `OUTGOING_PROXY` or firewall rules.

- Host lists are resolved once each time notifications are sent. A name that does not resolve is ignored, and subdomain rules with a leading dot (`.example.com`) have no effect here.
- Your own `OUTGOING_PROXY` turns off the default rules. Rules you set yourself still apply to these services.

## Notifications

| Variable | Description |
| --- | --- |
| `APPRISE_ENABLED` | Set to `false` to prevent users from configuring and sending Apprise notifications. |
| `APPRISE_ALLOWED_SCHEMAS` | Comma-separated allowlist, for example `slack,telegram`. When set, `APPRISE_BLOCKED_SCHEMAS` is ignored. |
| `APPRISE_BLOCKED_SCHEMAS` | Comma-separated blocklist. Replaces the built-in list `syslog,dbus,kde,qt,glib,gnome,macosx,windows`. |

## S3 Storage

`S3_ENDPOINT`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_BUCKET`, `S3_FORCE_PATH_STYLE` and `S3_REQUEST_CHECKSUM_CALCULATION`.

## Email

These override and disable the configuration in the UI if set.

`SMTP_HOST`, `SMTP_PORT` (default `587`), `SMTP_NAME`, `SMTP_SECURE`, `SMTP_TLS_REJECT_UNAUTHORIZED`, `SMTP_USER`, `SMTP_PASSWORD` and `SMTP_FROM`. See the [Nodemailer documentation](https://nodemailer.com/smtp/).
