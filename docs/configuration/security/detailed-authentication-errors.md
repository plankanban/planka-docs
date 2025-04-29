---
sidebar_position: 1
---

# Detailed Authentication Errors

By default, Planka uses **generic authentication error messages** to avoid revealing sensitive information to potential attackers.

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
- Enable rate limiting
- Use [Fail2Ban](./fail2ban.md) or a similar tool
- Monitor logs for unusual login activity
:::

## Further Reading

For more insights on secure authentication practices, see: [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#authentication-and-error-messages).
