---
sidebar_position: 1.5
---

import ProComparison from './_pro-comparison.mdx';

# Community or Pro?

PLANKA comes in two editions. This page describes what each one does, so that you can decide before you install rather than after.

## Community is a complete application

PLANKA Community is not a trial and not a reduced edition. Boards, lists and cards with real-time collaboration, markdown descriptions, attachments, comments, custom fields, the stopwatch, due dates, webhooks, a documented REST API, two-factor authentication and notifications through more than a hundred providers are all part of it. You run it on your own server, against your own database, with your own backups, and it is free to self-host.

If you work alone or in a small team, host your own instance and do not need a calendar or timeline view, Community is the whole answer. Install it and read no further — nothing on this page describes a wall you are about to run into.

## What each edition includes

<ProComparison />

## What Pro is for

Pro is aimed at organisations that run PLANKA as part of how they operate, where the people using it are not all sitting at a desk and not all of them are employees.

- **Away from the desk** — phones and tablets, five themes and an accent color.
- **A view across projects** — a dashboard covering every project, plus calendar, timeline, map and media views rather than the board alone.
- **Structure that repeats** — recurring cards, card and board templates, and one card that can sit on more than one board.
- **People outside the team** — guest roles and single sign-on through OIDC.
- **Getting things back out** — PDF and HTML export.
- **Someone to ask** — support from the developers rather than a ticket queue.

Pro is self-hosted on your own infrastructure, exactly as Community is.

## Upgrading from Community

Pro upgrades an existing Community installation in place. Your database, your volume and your data stay where they are.

It is a real migration rather than an image swap: Pro adds a Valkey service to your compose file and needs a one-off schema promote (`npm run db:promote`). The promote accepts only certain Community releases as a starting point — currently 2.1.x and 2.2.x — and from any other version it stops without changing anything.

:::danger The upgrade is one-way
There is no downgrade from Pro back to Community, and it cannot be improvised afterwards. Pro carries 90 schema migrations against Community's 21, and most of them have no counterpart in Community at all. Once the promote has run, the migration table lists entries for which no file exists in the Community codebase, and knex will refuse to run against it.

Take a backup before you start, or try the upgrade on a copy of your instance.
:::

The step-by-step upgrade guide is in the customer center, which you can reach once you have a license key; it lists the releases the promote accepts.

## What happens when a license expires

The instance locks. It does not fall back to read-only, and it does not fall back to Community. Signing in and entering a license key keep working; everything else — boards, cards, attachments — stops responding, including for reading.

Nothing is deleted. Your data stays in the database exactly as it was, and a valid key opens it again. This is a deliberate decision: an expired Pro instance is not meant to carry on as an unlimited archive.

## Trying it

Pro can be [trialled for 30 days](https://planka.app/trial?ref=docs-compare) on your own server — on a copy of your instance, if you would rather not touch the live one.
