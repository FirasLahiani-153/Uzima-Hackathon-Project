# 🚀 Quick Deploy to Render

## ✅ Your AI Model is Ready for Render!

I've created all the necessary files for Render deployment. Here's what you need to do:

### 📁 Files Created:
- ✅ `AImodel/render.yaml` - Render configuration
- ✅ `AImodel/build.sh` - Build script
- ✅ `AImodel/start.sh` - Start script
- ✅ `AImodel/requirements.txt` - Updated with gunicorn
- ✅ Model files are present (`disease_predictor.pkl`, `symbipredict_2022.csv`)

### 🚀 Deploy Steps:

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add Render deployment configuration"
   git push
   ```

2. **Go to [Render.com](https://render.com)**
   - Sign up/Login with GitHub
   - Click "New +" → "Web Service"
   - Connect your repository

3. **Configure Service:**
   - **Name:** `uzima-ai-api`
   - **Root Directory:** `AImodel`
   - **Environment:** `Python 3`
   - **Build Command:** `./build.sh`
   - **Start Command:** `./start.sh`
   - **Plan:** Free

4. **Deploy!**
   - Click "Create Web Service"
   - Wait 5-10 minutes for deployment

### 🌐 Your API will be available at:
`https://uzima-ai-api.onrender.com`

### 🔗 Test Endpoints:
- Health: `https://uzima-ai-api.onrender.com/health`
- Docs: `https://uzima-ai-api.onrender.com/docs`
- Predict: `https://uzima-ai-api.onrender.com/predict`

### 📱 Update Frontend:
After deployment, update your frontend to use the Render API:

1. Create `.env` file:
   ```env
   VITE_API_URL=https://uzima-ai-api.onrender.com
   ```

2. Rebuild and redeploy:
   ```bash
   npm run build
   npm run deploy
   ```

### 🎉 That's it! Your AI model will be live on Render!
