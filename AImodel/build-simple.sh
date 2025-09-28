#!/usr/bin/env bash
# Simple build script for Render

# Upgrade pip
pip install --upgrade pip

# Install dependencies one by one to avoid conflicts
pip install numpy==1.24.3
pip install pandas==1.5.3
pip install scikit-learn==1.2.2
pip install joblib==1.3.2
pip install fastapi==0.104.1
pip install uvicorn==0.24.0
pip install pydantic==2.5.0
pip install python-multipart==0.0.6
pip install gunicorn==21.2.0
