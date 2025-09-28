# 🚀 Deploy Uzima AI Model to Render

Complete guide to deploy your AI model backend to Render.com

## 📋 Prerequisites

- Render.com account (free tier available)
- GitHub repository with your code
- Model files (`disease_predictor.pkl` and `symbipredict_2022.csv`)

## 🚀 Step-by-Step Deployment

### 1. **Prepare Your Repository**

Make sure your `AImodel` folder contains:
- ✅ `main.py` (FastAPI application)
- ✅ `requirements.txt` (Python dependencies)
- ✅ `render.yaml` (Render configuration)
- ✅ `build.sh` (Build script)
- ✅ `start.sh` (Start script)
- ✅ `disease_predictor.pkl` (Trained model)
- ✅ `symbipredict_2022.csv` (Dataset)

### 2. **Deploy to Render**

1. **Go to [Render.com](https://render.com)**
2. **Sign up/Login** with your GitHub account
3. **Click "New +"** → **"Web Service"**
4. **Connect your GitHub repository**
5. **Configure the service:**
   - **Name:** `uzima-ai-api`
   - **Root Directory:** `AImodel`
   - **Environment:** `Python 3`
   - **Build Command:** `./build.sh`
   - **Start Command:** `./start.sh`
   - **Plan:** Free

6. **Click "Create Web Service"**

### 3. **Upload Model Files**

Since model files are large, you have two options:

#### Option A: Upload via Render Dashboard
1. Go to your service dashboard
2. Click "Files" tab
3. Upload `disease_predictor.pkl` and `symbipredict_2022.csv`

#### Option B: Use Git LFS (Recommended)
```bash
# Install Git LFS
git lfs install

# Track large files
git lfs track "*.pkl"
git lfs track "*.csv"

# Add and commit
git add .gitattributes
git add AImodel/disease_predictor.pkl
git add AImodel/symbipredict_2022.csv
git commit -m "Add model files with LFS"
git push
```

### 4. **Configure Environment Variables**

In your Render service dashboard:
- Go to "Environment" tab
- Add these variables:
  ```
  PYTHON_VERSION=3.11.0
  PORT=10000
  ```

### 5. **Deploy and Test**

1. **Click "Deploy"** in your service dashboard
2. **Wait for deployment** (5-10 minutes)
3. **Test your API:**
   - Health check: `https://your-app-name.onrender.com/health`
   - API docs: `https://your-app-name.onrender.com/docs`

## 🔧 Alternative: Manual Deployment

If you prefer manual setup:

1. **Create new Web Service**
2. **Select your repository**
3. **Configure:**
   - **Root Directory:** `AImodel`
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`

## 🌐 Update Frontend

Once deployed, update your frontend to use the Render API:

1. **Create `.env` file in project root:**
   ```env
   VITE_API_URL=https://your-app-name.onrender.com
   ```

2. **Rebuild and redeploy frontend:**
   ```bash
   npm run build
   npm run deploy
   ```

## 📊 Monitor Your Deployment

### Health Checks
- **API Health:** `GET https://your-app-name.onrender.com/health`
- **API Docs:** `https://your-app-name.onrender.com/docs`

### Logs
- View logs in Render dashboard
- Check for any startup errors
- Monitor memory usage

## 🐛 Troubleshooting

### Common Issues

1. **Build Fails:**
   - Check `requirements.txt` syntax
   - Verify Python version compatibility
   - Review build logs

2. **Model Not Loading:**
   - Ensure model files are uploaded
   - Check file paths in `main.py`
   - Verify file permissions

3. **Service Crashes:**
   - Check memory usage (free tier has limits)
   - Review error logs
   - Verify all dependencies are installed

4. **CORS Issues:**
   - Update CORS origins in `main.py`
   - Add your frontend domain to allowed origins

### Debug Commands

```bash
# Test API locally first
curl https://your-app-name.onrender.com/health

# Test prediction
curl -X POST https://your-app-name.onrender.com/predict \
  -H "Content-Type: application/json" \
  -d '{"symptoms": ["Fever", "Headache"]}'
```

## 💰 Render Pricing

- **Free Tier:** 750 hours/month, sleeps after 15 min inactivity
- **Starter:** $7/month, always on
- **Standard:** $25/month, better performance

## 🔄 Updates

### Updating Your Model
1. Replace model files in repository
2. Push changes to GitHub
3. Render will auto-deploy

### Updating Code
1. Push changes to GitHub
2. Render will auto-deploy
3. Check deployment logs

## 🎯 Next Steps

1. **Set up custom domain** (optional)
2. **Configure SSL** (automatic with Render)
3. **Set up monitoring** (Uptime Robot)
4. **Scale up** if needed

---

**Your AI model is now live on Render! 🎉**

**API URL:** `https://your-app-name.onrender.com`
