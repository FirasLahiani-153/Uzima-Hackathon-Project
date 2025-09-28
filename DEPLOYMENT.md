# 🚀 Uzima Deployment Guide

Complete guide to deploy your Uzima healthcare application with AI backend.

## 📋 Prerequisites

- **Docker** and **Docker Compose** installed
- **Node.js** (for frontend development)
- **Python 3.11+** (for AI model development)

## 🏗️ Project Structure

```
Uzima-Hackathon-Project/
├── src/                    # React frontend
├── AImodel/               # AI backend
│   ├── main.py            # FastAPI application
│   ├── requirements.txt   # Python dependencies
│   ├── Dockerfile         # Container configuration
│   ├── docker-compose.yml # Multi-service setup
│   ├── deploy.bat         # Windows deployment script
│   └── README.md          # Backend documentation
├── index.html             # Frontend entry point
└── vite.config.js         # Vite configuration
```

## 🚀 Quick Deployment

### 1. **Deploy AI Backend**

```bash
cd AImodel

# Windows
deploy.bat

# Linux/Mac
./deploy.sh
```

### 2. **Deploy Frontend**

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## 🔧 Manual Deployment Steps

### AI Backend (FastAPI)

1. **Navigate to AI directory:**
   ```bash
   cd AImodel
   ```

2. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run locally:**
   ```bash
   python main.py
   ```

4. **Or with Docker:**
   ```bash
   docker-compose up --build
   ```

### Frontend (React + Vite)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set API URL (optional):**
   ```bash
   # Create .env file
   echo "VITE_API_URL=https://your-api-domain.com" > .env
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```

## 🌐 Production Deployment Options

### Option 1: Cloud Platforms

#### **Railway** (Recommended)
1. Connect your GitHub repository
2. Select the `AImodel` folder for backend
3. Railway will auto-detect FastAPI and deploy
4. Update frontend `VITE_API_URL` to Railway URL

#### **Heroku**
1. Create `Procfile` in `AImodel/`:
   ```
   web: uvicorn main:app --host 0.0.0.0 --port $PORT
   ```
2. Deploy with Heroku CLI
3. Update frontend API URL

#### **DigitalOcean App Platform**
1. Connect GitHub repository
2. Configure build settings for Python
3. Set environment variables
4. Deploy both frontend and backend

### Option 2: VPS/Cloud Server

1. **Set up server** (Ubuntu/CentOS)
2. **Install Docker:**
   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh
   ```

3. **Clone repository:**
   ```bash
   git clone https://github.com/firaslahiani-153/uzima-hackathon-project.git
   cd uzima-hackathon-project
   ```

4. **Deploy backend:**
   ```bash
   cd AImodel
   docker-compose up -d
   ```

5. **Deploy frontend:**
   ```bash
   npm install
   npm run build
   # Serve with nginx or similar
   ```

## 🔗 API Endpoints

Once deployed, your AI backend will be available at:

- **API Base:** `https://your-domain.com`
- **Health Check:** `GET /health`
- **Symptoms List:** `GET /symptoms`
- **Disease Prediction:** `POST /predict`
- **API Documentation:** `GET /docs`

## ⚙️ Configuration

### Environment Variables

**Frontend (.env):**
```env
VITE_API_URL=https://your-api-domain.com
```

**Backend (AImodel/.env):**
```env
PYTHONUNBUFFERED=1
PORT=8000
```

### CORS Configuration

The backend is configured to allow all origins. For production, update `main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-frontend-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 📊 Monitoring

### Health Checks
- **Backend:** `GET /health`
- **Frontend:** Check browser console for errors

### Logs
```bash
# Docker logs
docker-compose logs -f

# Specific service
docker-compose logs -f uzima-ai-api
```

## 🐛 Troubleshooting

### Common Issues

1. **API not responding:**
   - Check if Docker containers are running
   - Verify port 8000 is not in use
   - Check logs: `docker-compose logs`

2. **Frontend can't connect to API:**
   - Verify `VITE_API_URL` is correct
   - Check CORS configuration
   - Ensure API is running

3. **Model not loading:**
   - Verify `disease_predictor.pkl` exists
   - Check file permissions
   - Review startup logs

### Debug Commands

```bash
# Check container status
docker ps

# View container logs
docker logs <container_id>

# Test API locally
curl http://localhost:8000/health

# Test prediction
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"symptoms": ["Fever", "Headache"]}'
```

## 🔄 Updates

### Updating the Model
1. Retrain model in Jupyter notebook
2. Replace `disease_predictor.pkl`
3. Restart backend: `docker-compose restart`

### Updating the Frontend
1. Make changes to React code
2. Build: `npm run build`
3. Deploy: `npm run deploy`

## 📞 Support

- **Backend Issues:** Check `AImodel/README.md`
- **Frontend Issues:** Check browser console
- **Deployment Issues:** Review this guide

## 🎯 Next Steps

1. **Set up monitoring** (e.g., Uptime Robot)
2. **Configure SSL certificates** for HTTPS
3. **Set up CI/CD** for automatic deployments
4. **Add database** for storing predictions
5. **Implement authentication** for production use

---

**Your Uzima application is now ready for production! 🎉**
