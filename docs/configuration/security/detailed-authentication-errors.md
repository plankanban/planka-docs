---
sidebar_position: 1
---

# Detailed Authentication Errors

By default, PLANKA uses **generic authentication error messages** to avoid revealing sensitive information to potential attackers.

## Enable Detailed Error Messages

To aid in debugging or improve user experience, you can enable more specific error messages, such as:

- "Invalid email or username"
- "Invalid password"

Set the following environment variable in your `.env` file or Docker environment:

```env
SHOW_DETAILED_AUTH_ERRORS=true
```

> After setting this, restart the application for the change to take effect.

## Security Warning

:::danger
**Do not enable** detailed authentication errors in production without proper protections.

Detailed error messages can help attackers perform brute force or enumeration attacks.

You should:

- Keep the built-in [sign-in limits](#sign-in-limits) in place
- Use [Fail2Ban](./fail2ban.md) or a similar tool
- Monitor logs for unusual login activity
:::

## Sign-in Limits

Since version 2.3, PLANKA limits failed sign-ins on its own. Once a limit is reached, it answers with `Rate limit exceeded` (HTTP 409), even for the correct password, until the window has passed.

| Variable | Default | Description |
| --- | --- | --- |
| `AUTH_RATE_LIMIT_WINDOW` | `60` | Length of the window in seconds. |
| `AUTH_RATE_LIMIT_MAX_PER_IP` | `30` | Attempts per client address. |
| `AUTH_RATE_LIMIT_MAX_PER_IDENTIFIER` | `10` | Attempts per email address or username. |

Behind a reverse proxy, set `TRUST_PROXY=true`. Otherwise, all users count as one client address and share one limit.

The counters live in the PLANKA process. If you run several instances, each one counts on its own.

## Further Reading

For more insights on secure authentication practices, see: [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#authentication-and-error-messages).
