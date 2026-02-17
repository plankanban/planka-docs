---
sidebar_position: 2
---

# Customizing End User Terms

PLANKA includes a default End User Terms of Service template.

This template is intended as a starting point and **must be reviewed and adapted to meet your own legal requirements**.

You can fully replace the provided Terms with your own customized version.

## Terms File Structure

Each Terms file:

- Must be written in **Markdown**
- Must be named using a language code
- Must use the `.md` extension

Example: `en-US.md`, `de-DE.md`

### File Format

A Terms file consists of:

1. The main Terms content (Markdown)
2. A confirmation section separated by a special marker

The confirmation section will be rendered as one or more checkboxes that users must accept.

Use the following separator before your confirmation section:

```
[confirmations]::
---
```

Example confirmation block:

```
[confirmations]::
---

✔️ **I have read and accept these End User Terms of Service**
```

### Complete Example Structure

```
# End User Terms of Service – On-Premise Version

**Effective: February 11, 2026 – v1.0**

## 1. Scope and Your Relationship with PLANKA

...

[confirmations]::
---

✔️ **I have read and accept these End User Terms of Service**
```

You can view the full default template [here](https://raw.githubusercontent.com/plankanban/planka/refs/heads/master/server/terms/_template/en-US.md).

## Where to Place Your Custom Terms

Your custom Terms must be placed in:

```
/app/terms/custom
```

How you do this depends on your installation method.

### Manual Installation

Create the directory:

```bash
mkdir -p /var/www/planka/terms/custom
```

Then place your `.md` Terms files inside that directory.

Restart PLANKA after adding or modifying files.

### Docker Installation

1. Create a `terms` directory next to your `docker-compose.yml`:

```bash
mkdir terms
```

2. Place your `.md` Terms files inside that directory.

3. Mount the directory inside the container by enabling the `./terms` volume:

```yaml
services:
  planka:
    ...
    volumes:
      - data:/app/data
      - ./terms:/app/terms/custom
    ...
```

4. Restart your containers:

```bash
docker compose down
docker compose up -d
```

## Important Notes

- If no custom Terms are found, PLANKA will fall back to the built-in template.
- The **main Terms** are selected based on your configured `DEFAULT_LANGUAGE`. This file is considered the canonical version for legal acceptance.
- Users are required to re-accept the Terms on their next login only if the main Terms file has been modified. Adding a new translation file does not affect users who have already accepted the Terms.
- Removing the Terms entirely **is not supported**. However, you can replace the content with a minimal greeting for users and optionally omit the confirmations section. In that case, the continue button will be active by default, and no checkbox acceptance is required.
