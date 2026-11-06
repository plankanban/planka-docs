---
sidebar_position: 3
---

# PHP

Thanks to [decole](https://github.com/decole) for the amazing work.
For more information, see the [planka-php-sdk GitHub repository](https://github.com/decole/planka-php-sdk).

> SDK 2.x is built for PLANKA v2 and needs PHP 8.1 or newer. Its author tested it with PLANKA Community 2.2.1.
> For PLANKA v1, use the legacy SDK: `composer require decole/planka-php-sdk:^1.3`.

## Install

```bash
composer require decole/planka-php-sdk
```

## How to Use

The SDK supports two ways to authenticate.

### Username and Password

```php
<?php

use Planka\Bridge\Config;
use Planka\Bridge\PlankaClient;

require __DIR__ . '/vendor/autoload.php';

$config = new Config(
    user: 'admin@example.com',
    password: 'secure_password',
    baseUri: 'http://192.168.1.100',
    port: 3000
);

$planka = new PlankaClient($config);
$result = $planka->authenticate();

if (!$result->success) {
    if ($result->requiresTotp()) {
        $result = $planka->verifyTotp($result->pendingToken, '123456');
    }

    if ($result->requiresTerms()) {
        $terms = $planka->terms()->get();
        $result = $planka->acceptTerms($result->pendingToken, $terms->signature);
    }
}

$projects = $planka->project()->list();
```

### API Key

```php
<?php

use Planka\Bridge\Config;
use Planka\Bridge\PlankaClient;

require __DIR__ . '/vendor/autoload.php';

$config = new Config(
    baseUri: 'http://192.168.1.100',
    port: 3000,
    apiKey: 'your_user_api_key_here'
);

$planka = new PlankaClient($config);

$projects = $planka->project()->list();
```

See the [README](https://github.com/decole/planka-php-sdk#readme) of the SDK for exception handling, custom transports and all endpoints.
