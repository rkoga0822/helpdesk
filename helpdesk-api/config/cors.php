<?php

return [
    // CORS を適用するパス（API のみ）
    'paths' => ['api/*'],

    'allowed_methods' => ['*'],

    // React 開発サーバー（Vite）からのアクセスを許可
    'allowed_origins' => ['*'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    // 認証なし（Cookie を使わない）ため false
    'supports_credentials' => false,
];
