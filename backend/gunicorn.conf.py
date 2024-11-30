bind = "0.0.0.0:8000"
workers = 2
timeout = 120
loglevel = "debug"
wsgi_app = "core.wsgi:application"
chdir = "/workspace/backend"
# Add these lines
graceful_timeout = 60
keepalive = 65