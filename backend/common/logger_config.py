# import os
# from pathlib import Path
# import logging.config

# BASE_DIR = Path(__file__).resolve().parent.parent

# LOG_DIR = os.path.join(BASE_DIR, "logs")
# os.makedirs(LOG_DIR, exist_ok=True)


# LOGGING = {
#     "version": 1,
#     "disable_existing_loggers": False,
#     "formatters": {
#         "verbose": {
#             "format": "{levelname} {asctime} {name} {module} {process:d} {thread:d} {message}",
#             "style": "{",
#         },
#         "simple": {
#             "format": "{levelname} {message}",
#             "style": "{",
#         },
#     },
#     "handlers": {
#         "console": {
#             "class": "logging.StreamHandler",
#             "formatter": "simple",
#             "level": "INFO",
#         },
#         "file": {
#             "class": "logging.handlers.RotatingFileHandler",
#             "filename": os.path.join(LOG_DIR, "django.log"),
#             "maxBytes": 1024 * 1024 * 5,  # 5 MB
#             "backupCount": 5,
#             "formatter": "verbose",
#             "level": "DEBUG",
#         },
#         "error_file": {
#             "class": "logging.handlers.RotatingFileHandler",
#             "filename": os.path.join(LOG_DIR, "django_errors.log"),
#             "maxBytes": 1024 * 1024 * 5,
#             "backupCount": 5,
#             "formatter": "verbose",
#             "level": "ERROR",
#         },
#     },
#     "root": {  
#         "handlers": ["console", "file"],
#         "level": "INFO",
#     },
#     "loggers": {
#         "django": {
#             "handlers": ["console", "file"],
#             "level": "DEBUG",
#             "propagate": True,
#         },
#         "django.request": {
#             "handlers": ["error_file"],
#             "level": "ERROR",
#             "propagate": False,
#         },
        
#         "events": {
#             "handlers": ["console", "file"],
#             "level": "DEBUG",
#             "propagate": False,
#         },
#     },
# }
