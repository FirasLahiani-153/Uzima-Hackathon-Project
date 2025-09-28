#!/usr/bin/env bash
# Start script for Render deployment

# Use gunicorn for production
exec gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT
