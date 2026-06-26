up:
	docker compose up -d

down:
	docker compose stop

migrate:
	docker compose exec app php artisan migrate

seed:
	docker compose exec app php artisan db:seed --class=InquirySeeder

fresh:
	docker compose exec app php artisan migrate:fresh --seed