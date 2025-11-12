<?php

namespace App;

use OpenApi\Attributes as OA;

#[OA\Info(
    version: '1.0.0',
    title: 'Tinder App API Documentation',
    description: 'Tinder App API documentation for the application

## Demo User

A demo user is available for testing the API:

**Credentials:**
- Email: `demo@demo.app`
- Password: `password`

**Profile Information:**
- Name: Demo User
- Age: 25
- Location: New York, NY
- Gender: M
- Pictures: 3 pictures included

You can use these credentials to login and test all API endpoints.'
)]
#[OA\Server(
    url: '/api/v1',
    description: 'API Server'
)]
class OpenApi
{
    //
}
