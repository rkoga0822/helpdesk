FROM php:8.4-cli

# MySQL 接続に必要な PHP 拡張をインストール
RUN apt-get update && apt-get install -y unzip \
    && docker-php-ext-install pdo pdo_mysql \
    && rm -rf /var/lib/apt/lists/*

# Composer を公式イメージからコピー
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# コンテナ内の作業ディレクトリを設定
WORKDIR /var/www/html

# ソースコードをコンテナにコピー
COPY . .

# Composer の依存関係をインストール
RUN composer install --no-interaction

# ポートを開放
EXPOSE 8000

# コンテナ起動時に php artisan serve を実行
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]