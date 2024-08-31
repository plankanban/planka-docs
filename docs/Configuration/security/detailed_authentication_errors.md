# Detailed Authentication Errors

By default, the authentication error messages are kept simple to avoid leaking sensitive information.

However, in some cases, you may want to provide more detailed error messages to help users. In this case, you can enable detailed authentication errors.

:::danger
Enabling detailed authentication errors without a rate limiter or a similar mechanism may expose your application to security risks. (e.g. brute force attacks)
Use [fail2ban](/docs/Configuration/security/Fail2Ban) or similar tools to protect your application.

Good source for more information about this topic: [OWASP - Cheatsheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#authentication-and-error-messages)
:::

To enable detailed authentication errors, set the `SHOW_DETAILED_AUTH_ERRORS` environment variable to `true`.

```bash
SHOW_DETAILED_AUTH_ERRORS=true
```

After setting this environment variable, the authentication error messages will include more detailed information about the error : "Invalid email or username" and "Invalid password".