#!/usr/bin/env bash
# exit on error
set -o errexit

# Install dependencies
pip install -r requirements.txt

# Create necessary directories
mkdir -p data

# The model and dataset files should be uploaded separately
# or included in the repository
