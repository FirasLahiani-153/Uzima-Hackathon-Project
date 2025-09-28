@echo off
echo 🚀 Starting Uzima AI Model Deployment...

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed. Please install Docker first.
    exit /b 1
)

REM Check if Docker Compose is installed
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Compose is not installed. Please install Docker Compose first.
    exit /b 1
)

REM Check if required files exist
if not exist "disease_predictor.pkl" (
    echo ❌ disease_predictor.pkl not found. Please train the model first.
    exit /b 1
)

if not exist "symbipredict_2022.csv" (
    echo ❌ symbipredict_2022.csv not found. Please add the dataset.
    exit /b 1
)

echo ✅ All required files found.

REM Build and start the services
echo 🔨 Building Docker images...
docker-compose build

echo 🚀 Starting services...
docker-compose up -d

REM Wait for the API to be ready
echo ⏳ Waiting for API to be ready...
timeout /t 10 /nobreak >nul

REM Check if the API is responding
curl -f http://localhost:8000/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ API is running successfully!
    echo 🌐 API URL: http://localhost:8000
    echo 📚 API Docs: http://localhost:8000/docs
    echo ❤️  Health Check: http://localhost:8000/health
) else (
    echo ❌ API is not responding. Check the logs:
    docker-compose logs uzima-ai-api
    exit /b 1
)

echo 🎉 Deployment completed successfully!
echo.
echo To stop the services, run: docker-compose down
echo To view logs, run: docker-compose logs -f
pause
