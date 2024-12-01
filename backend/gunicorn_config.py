# Using powershell to create the file
@"
import multiprocessing
import os

# Bind to 0.0.0.0:8000
bind = "0.0.0.0:8000"

# Worker Options
workers = 2
worker_class = 'sync'

# Logging Options
loglevel = 'debug'
accesslog = '-'
errorlog = '-'

# Path Configuration
chdir = os.getcwd()
pythonpath = os.getcwd()
wsgi_app = 'core.wsgi:application'

# Debugging aid
print(f"Current Directory: {os.getcwd()}")
print(f"PYTHONPATH: {pythonpath}")
print(f"WSGI App: {wsgi_app}")
"@ | Out-File -FilePath gunicorn_config.py -Encoding utf8