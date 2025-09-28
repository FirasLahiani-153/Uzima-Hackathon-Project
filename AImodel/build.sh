#!/usr/bin/env bash
# exit on error
set -o errexit

# Upgrade pip first
pip install --upgrade pip

# Install system dependencies for scikit-learn
apt-get update && apt-get install -y gcc g++ && rm -rf /var/lib/apt/lists/*

# Install dependencies with specific order to avoid conflicts
pip install numpy==1.24.3
pip install pandas==2.0.3
pip install scikit-learn==1.3.0
pip install -r requirements.txt

# Create necessary directories
mkdir -p data

# The model and dataset files should be uploaded separately
# or included in the repository
