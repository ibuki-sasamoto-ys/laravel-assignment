# PHP 8.3
FROM php:8.3-fpm

# 作業ディレクトリの設定
WORKDIR /var/www/html

# 必要なパッケージのインストール（nodejs、npmを追加）
RUN apt-get update && apt-get install -y \
    git \
    curl \
    zip \
    unzip \
    libonig-dev \
    libzip-dev \
    nodejs \
    npm \
    && rm -rf /var/lib/apt/lists/*

# PHPエクステンションのインストール（Laravel必須）
RUN docker-php-ext-install \
    pdo_mysql \
    mbstring \
    zip

# Composerのインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Xdebugのインストール（デバッグツール）
RUN pecl install xdebug \
    && docker-php-ext-enable xdebug \
    && echo "xdebug.mode=debug" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.client_host=host.docker.internal" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

# 権限設定
RUN chown -R www-data:www-data /var/www/html

EXPOSE 9000
CMD ["php-fpm"]