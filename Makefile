DOCKER_COMPOSE := $(shell command -v docker-compose >/dev/null 2>&1 && echo docker-compose || echo docker compose)

up:
	$(DOCKER_COMPOSE) up --build

key:
	$(DOCKER_COMPOSE) exec app php artisan key:generate

down:
	$(DOCKER_COMPOSE) down

restart: down up

logs:
	$(DOCKER_COMPOSE) logs -f

app-bash:
	$(DOCKER_COMPOSE) exec app bash

db-bash:
	$(DOCKER_COMPOSE) exec db bash

db:
	$(DOCKER_COMPOSE) exec db psql -U postgres -d task

migrate:
	$(DOCKER_COMPOSE) exec app php artisan migrate

composer:
	composer install

fresh:
	$(DOCKER_COMPOSE) exec app php artisan migrate:fresh

env:
	cp .env.example .env

seed:
	$(DOCKER_COMPOSE) exec app php artisan db:seed

model:
	$(DOCKER_COMPOSE) exec app php artisan make:model $(name) -m

enum:
	$(DOCKER_COMPOSE) exec app php artisan make:enum

policy:
	$(DOCKER_COMPOSE) exec app php artisan make:policy $(name)

controller:
	$(DOCKER_COMPOSE) exec app php artisan make:controller $(name) --resource

request:
	$(DOCKER_COMPOSE) exec app php artisan make:request $(name)

optimize:
	$(DOCKER_COMPOSE) exec app php artisan optimize:clear

composer-install:
	$(DOCKER_COMPOSE) exec app composer install

npm-install:
	$(DOCKER_COMPOSE) exec app npm install

npm-build:
	$(DOCKER_COMPOSE) exec app npm run build
