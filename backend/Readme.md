# Commands To Run The Backend Properly

<!-- Run Redis Server -->

1. redis-server

<!-- Start The Celery Worker -->

celery -A core worker --loglevel=info


<!-- Start The Celery Beat -->

celery -A core beat --loglevel=info


<!-- Start The Django App -->

python manage.py runserver