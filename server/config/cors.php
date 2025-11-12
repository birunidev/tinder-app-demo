<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'http://localhost:8081',
        'http://localhost:3000',
        'http://127.0.0.1:8081',
        'http://127.0.0.1:3000',
    ],

    'allowed_origins_patterns' => [
        '#^https?://localhost:\d+$#',
        '#^https?://127\.0\.0\.1:\d+$#',
        '#^https?://192\.168\.\d+\.\d+:\d+$#',
        '#^https?://10\.\d+\.\d+\.\d+:\d+$#',
        '#^https?://.*\.local:\d+$#',
    ],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];
