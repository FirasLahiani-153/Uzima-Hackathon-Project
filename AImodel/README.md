# 🧠 Uzima AI Disease Predictor Backend

AI-powered disease prediction API built with FastAPI and scikit-learn.

## 🚀 Quick Start

### Local Development

1. **Install dependencies:**
   ```bash
   cd AImodel
   pip install -r requirements.txt
   ```

2. **Run the API:**
   ```bash
   python main.py
   ```

3. **Access the API:**
   - API: http://localhost:8000
   - Docs: http://localhost:8000/docs
   - Health: http://localhost:8000/health

### Docker Deployment

1. **Build and run with Docker Compose:**
   ```bash
   cd AImodel
   docker-compose up --build
   ```

2. **Access the API:**
   - API: http://localhost:8000
   - With Nginx: http://localhost:80

## 📋 API Endpoints

### `GET /`
- **Description:** API information
- **Response:** Basic API details

### `GET /health`
- **Description:** Health check
- **Response:** `{"status": "healthy", "model_loaded": true}`

### `GET /symptoms`
- **Description:** Get all available symptoms
- **Response:** `{"symptoms": ["Fever", "Headache", ...]}`

### `POST /predict`
- **Description:** Predict disease based on symptoms
- **Request Body:**
  ```json
  {
    "symptoms": ["Fever", "Headache", "Cough"]
  }
  ```
- **Response:**
  ```json
  {
    "disease": "Common Cold",
    "confidence": 0.85,
    "symptoms_used": ["Fever", "Headache", "Cough"]
  }
  ```

## 🐳 Docker Commands

```bash
# Build image
docker build -t uzima-ai-api .

# Run container
docker run -p 8000:8000 uzima-ai-api

# Run with docker-compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🔧 Configuration

### Environment Variables
- `PYTHONUNBUFFERED=1` - Enable Python output buffering

### Required Files
- `disease_predictor.pkl` - Trained ML model
- `symbipredict_2022.csv` - Training dataset

## 🚀 Production Deployment

### Option 1: Docker on VPS/Cloud
1. Upload your code to a VPS
2. Install Docker and Docker Compose
3. Run `docker-compose up -d`

### Option 2: Cloud Platforms
- **Heroku:** Use the included `Dockerfile`
- **Railway:** Deploy directly from GitHub
- **DigitalOcean App Platform:** Use Docker deployment
- **AWS ECS/Fargate:** Use the Docker image

### Option 3: Traditional VPS
1. Install Python 3.11+
2. Install dependencies: `pip install -r requirements.txt`
3. Run with Gunicorn: `gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker`

## 📊 Model Information

- **Algorithm:** Random Forest Classifier
- **Features:** 132 symptoms (binary)
- **Target:** Disease prognosis
- **Training:** 80/20 train/test split
- **Performance:** See model training logs

## 🔍 Monitoring

- Health check: `GET /health`
- API documentation: `GET /docs`
- Logs: Check container logs with `docker-compose logs`

## 🛠️ Development

### Adding New Features
1. Update `main.py` with new endpoints
2. Update `requirements.txt` if new dependencies needed
3. Test locally: `python main.py`
4. Test with Docker: `docker-compose up --build`

### Model Updates
1. Retrain model in Jupyter notebook
2. Save new model as `disease_predictor.pkl`
3. Restart the API service

## 📝 Notes

- The API automatically loads the model on startup
- CORS is enabled for all origins (configure for production)
- All endpoints include proper error handling
- The API includes confidence scores when available
