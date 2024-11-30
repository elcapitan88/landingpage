# backend/gunicorn.conf.py
bind = "0.0.0.0:8000"
workers = 2
timeout = 120
loglevel = "debug"
wsgi_app = "core.wsgi:application"
chdir = "/workspace/backend"