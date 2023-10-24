# PHP REST API
Thanks to [decole](https://github.com/decole) for the amazing work.
For more information, see [Github Repo](https://github.com/decole/planka-php-sdk)

Tested on Planka version **1.10.3**
Implemented all entrypoints for the bar version **1.10.3** and later.


## Install

`composer require decole/planka-php-sdk`


## How to use

See /src/[PlankaClient.php](https://github.com/decole/planka-php-sdk/blob/master/src/PlankaClient.php)

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

$result = $client->project->list();

var_dump($result);
```

You can test this bundle for Rest API with a test script, in the folder/tests/index.php

Copy [config.example.php](https://github.com/decole/planka-php-sdk/blob/master/tests/config.example.php) for `config.php` and customize to your
planka credentials.

In the test script, comments describe what is being done and the project, board and card are also created and carried 
out with them manipulations, at the end of the card, board and project are deleted.

All necessary entrypoints are conveniently divided into controllers. You can view the controllers 
in the `src/Controllers/` folder.

Result data output is strongly typed and returned in Dto objects
