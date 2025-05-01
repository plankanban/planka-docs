---
sidebar_position: 2
---

# PHP

Thanks to [decole](https://github.com/decole) for the amazing work.
For more information, see the [planka-php-sdk GitHub repository](https://github.com/decole/planka-php-sdk).

> Tested with Planka versions: **1.10.3**, **1.11**, **1.24.3**  
> Supports all endpoints from version **1.10.3** and later.

## Install

```bash
composer require decole/planka-php-sdk
```

## How to use

Wrapper executes the requests that Planka makes over the web socket or hidden REST API.
Wrapper use hidden REST API. See endpoints in https://github.com/plankanban/planka/blob/master/server/config/routes.js.

To understand how to use the wrapper, you can go to the web socket and see how the web client of the web socket 
works with its server. Requests and responses are identical. I just standardized the answers in the DTO. 
The data inside the DTO is identical to the server responses.

It is also not important to understand that you are working under a specific user. Accordingly, if you do not see 
a project or some board, this means that this user is prohibited from having access by access rights.

You need to add a user. For which you come as a wrapper in the projects and boards you need.

Wrapper endpoint - [PlankaClient.php](https://github.com/decole/planka-php-sdk/blob/master/src/PlankaClient.php)

```php
<?php

use Planka\Bridge\PlankaClient;
use Planka\Bridge\TransportClients\Client;

require __DIR__ . '/vendor/autoload.php';

$config = new Config(
    user: 'login',
    password: '***************',
    baseUri: 'http://192.168.1.101', // https://your.domain.com
    port: 3000                       // 443
);

$planka = new PlankaClient($config);

$planka->authenticate();

$result = $planka->project->list();

var_dump($result);
```
