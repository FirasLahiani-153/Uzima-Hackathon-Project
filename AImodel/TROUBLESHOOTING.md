# 🔧 Troubleshooting Render Deployment

## ❌ "metadata-generation-failed" Error

This error occurs when pip can't generate package metadata, usually due to:
- Incompatible package versions
- Missing system dependencies
- Python version conflicts

## ✅ Solutions

### Option 1: Use Simple Build Script (Recommended)
I've created `build-simple.sh` that installs packages one by one:

```bash
# In Render dashboard, use:
Build Command: ./build-simple.sh
Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
```

### Option 2: Manual Installation
If the simple script fails, try this in Render:

```bash
# Build Command:
pip install --upgrade pip && pip install numpy==1.24.3 && pip install pandas==1.5.3 && pip install scikit-learn==1.2.2 && pip install joblib==1.3.2 && pip install fastapi==0.104.1 && pip install uvicorn==0.24.0 && pip install pydantic==2.5.0 && pip install python-multipart==0.0.6 && pip install gunicorn==21.2.0
```

### Option 3: Use Minimal Requirements
Use `requirements-minimal.txt` with older, more stable versions:

```bash
# Build Command:
pip install -r requirements-minimal.txt
```

## 🐛 Other Common Issues

### 1. Model Files Not Found
**Error:** `FileNotFoundError: disease_predictor.pkl`

**Solution:**
- Ensure model files are in the `AImodel` directory
- Check file names are exactly: `disease_predictor.pkl` and `symbipredict_2022.csv`
- Upload files via Render dashboard if needed

### 2. Memory Issues
**Error:** Service crashes or times out

**Solution:**
- Free tier has 512MB RAM limit
- Consider upgrading to Starter plan ($7/month)
- Optimize model size if possible

### 3. CORS Issues
**Error:** Frontend can't connect to API

**Solution:**
- Update CORS origins in `main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://firaslahiani-153.github.io"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 4. Service Sleeps (Free Tier)
**Issue:** API goes to sleep after 15 minutes

**Solution:**
- Free tier sleeps after inactivity
- Service wakes up when accessed (may take 30 seconds)
- Consider upgrading to Starter plan for always-on service

## 🔍 Debug Steps

1. **Check Build Logs:**
   - Go to Render dashboard
   - Click on your service
   - Check "Logs" tab for build errors

2. **Test Locally First:**
   ```bash
   cd AImodel
   pip install -r requirements-minimal.txt
   python main.py
   ```

3. **Check Health Endpoint:**
   ```bash
   curl https://your-app-name.onrender.com/health
   ```

4. **Test Prediction:**
   ```bash
   curl -X POST https://your-app-name.onrender.com/predict \
     -H "Content-Type: application/json" \
     -d '{"symptoms": ["Fever", "Headache"]}'
   ```

## 📞 Still Having Issues?

1. **Check Render Status:** [status.render.com](https://status.render.com)
2. **Review Logs:** Look for specific error messages
3. **Try Different Python Version:** Use Python 3.10 instead of 3.11
4. **Contact Support:** Render has good documentation and support

## 🎯 Quick Fix Commands

```bash
# If build fails, try this build command:
pip install --upgrade pip && pip install numpy pandas scikit-learn joblib fastapi uvicorn pydantic python-multipart gunicorn

# If you get import errors, check Python version:
python --version

# If model loading fails, check file paths:
ls -la disease_predictor.pkl symbipredict_2022.csv
```

---

**Most common fix: Use the `build-simple.sh` script! 🚀**
