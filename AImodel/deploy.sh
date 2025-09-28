#!/bin/bash

# Uzima AI Model Deployment Script

echo "🚀 Starting Uzima AI Model Deployment..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check if required files exist
if [ ! -f "disease_predictor.pkl" ]; then
    echo "❌ disease_predictor.pkl not found. Please train the model first."
    exit 1
fi

if [ ! -f "symbipredict_2022.csv" ]; then
    echo "❌ symbipredict_2022.csv not found. Please add the dataset."
    exit 1
fi

echo "✅ All required files found."

# Build and start the services
echo "🔨 Building Docker images..."
docker-compose build

echo "🚀 Starting services..."
docker-compose up -d

# Wait for the API to be ready
echo "⏳ Waiting for API to be ready..."
sleep 10

# Check if the API is responding
if curl -f http://localhost:8000/health > /dev/null 2>&1; then
    echo "✅ API is running successfully!"
    echo "🌐 API URL: http://localhost:8000"
    echo "📚 API Docs: http://localhost:8000/docs"
    echo "❤️  Health Check: http://localhost:8000/health"
else
    echo "❌ API is not responding. Check the logs:"
    docker-compose logs uzima-ai-api
    exit 1
fi

echo "🎉 Deployment completed successfully!"
echo ""
echo "To stop the services, run: docker-compose down"
echo "To view logs, run: docker-compose logs -f"
