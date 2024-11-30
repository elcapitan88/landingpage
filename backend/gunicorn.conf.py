# gunicorn.conf.py
bind = "0.0.0.0:8000"
workers = 2
timeout = 120
graceful_timeout = 90
keepalive = 65
worker_class = "sync"
worker_connections = 1000
loglevel = "debug"
capture_output = True
enable_stdio_inheritance = True
wsgi_app = "core.wsgi:application"
chdir = "/workspace/backend"