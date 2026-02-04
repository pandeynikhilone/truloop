# Render Deployment Guide for Truloop

## Overview
This guide will help you deploy both the backend (Express) and frontend (Next.js) services on Render.

## Prerequisites
- GitHub repository with your code pushed
- Render account (free tier is fine)
- Environment variables ready

---

## Known Issues & Solutions

### 🔧 Tailwind CSS v4 Binary Issue
Tailwind CSS v4 uses platform-specific native binaries that need to be explicitly installed on Linux servers.

**Solution**: We've configured the frontend to use a custom build command that ensures the correct binaries are installed.

---

## Deployment Steps

### Step 1: Prepare Your Repository

1. Make sure all changes are committed and pushed to GitHub:
```bash
git add .
git commit -m "Add Render deployment configuration"
git push origin main
```

### Step 2: Create Render Services

#### Option A: Using render.yaml (Recommended - Blueprint)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New" → "Blueprint"**
3. Connect your GitHub repository
4. Render will detect the `render.yaml` file and create both services automatically
5. Set the following environment variables when prompted:

**Backend Environment Variables:**
- `MONGODB_URI`: `mongodb+srv://Nikhilpandey:qIOLt96QhAEQyyGb@cluster0.pwte9hp.mongodb.net/truloop?retryWrites=true&w=majority`
- `CLOUDINARY_CLOUD_NAME`: `dgymupqli`
- `CLOUDINARY_API_KEY`: `195535991912214`
- `CLOUDINARY_API_SECRET`: `gcXF2cWmn_sEtQmbmsnA9SPNpPc`
- `CORS_ORIGIN`: (Your frontend URL - e.g., `https://truloop-frontend.onrender.com`)

**Frontend Environment Variables:**
- `NEXT_PUBLIC_API_URL`: (Your backend URL - e.g., `https://truloop-backend.onrender.com`)

#### Option B: Manual Service Creation

If you prefer to create services manually:

**Backend Service:**
1. Click **"New" → "Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `truloop-backend`
   - **Root Directory**: Leave blank
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - Add environment variables (same as above)

**Frontend Service:**
1. Click **"New" → "Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `truloop-frontend`
   - **Root Directory**: Leave blank
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Start Command**: `cd frontend && npm start`
   - Add environment variables (same as above)

### Step 3: Update CORS Configuration

After getting your frontend URL from Render:

1. Go to backend service settings on Render
2. Update `CORS_ORIGIN` environment variable with your frontend URL
3. The backend will automatically restart

### Step 4: Update Frontend API URL

If your frontend needs to call the backend:

1. Create `.env.local` in frontend with:
```
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
```
2. Update any API calls in your frontend code to use `process.env.NEXT_PUBLIC_API_URL`

---

## Troubleshooting

### Issue: Tailwind CSS v4 Build Fails

**Error Message**: 
```
Failed to download cli-linux-x64 binary
```

**Solution**:
1. Make sure `lightningcss` is in your `devDependencies`
2. Use the build command: `cd frontend && npm install && npm run build`
3. The binaries should be automatically installed during `npm install`

If the issue persists, you can add a custom build command:
```bash
cd frontend && npm install && npx @tailwindcss/postcss build && npm run build
```

### Issue: Backend Can't Connect to MongoDB

**Solution**:
1. Check that `MONGODB_URI` is set correctly in Render environment variables
2. Make sure your MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
3. Check MongoDB Atlas Network Access settings

### Issue: CORS Errors

**Solution**:
1. Set `CORS_ORIGIN` in backend to match your frontend URL exactly
2. Make sure credentials are enabled in CORS config (already done in your code)

### Issue: Free Tier Services Spin Down

Render free tier services spin down after 15 minutes of inactivity.

**Solution**:
- Upgrade to a paid plan for 24/7 uptime
- Or use a service like [UptimeRobot](https://uptimerobot.com/) to ping your services every 5 minutes

---

## Post-Deployment Checklist

- [ ] Both services deployed successfully
- [ ] Backend is accessible (test with backend URL)
- [ ] Frontend is accessible (test with frontend URL)
- [ ] Database connection working
- [ ] CORS configured correctly
- [ ] Image uploads to Cloudinary working
- [ ] All environment variables set

---

## Monitoring & Logs

Access logs for each service:
1. Go to Render Dashboard
2. Click on your service
3. Navigate to "Logs" tab
4. Monitor real-time logs for errors

---

## Need Help?

If you encounter any issues:
1. Check the logs on Render Dashboard
2. Verify all environment variables are set correctly
3. Make sure your MongoDB Atlas network settings allow Render's IP addresses
4. Check that packages are installed correctly (especially Tailwind CSS v4 binaries)

---

## Important Notes

⚠️ **Security**: Never commit `.env` files to Git. Always use Render's environment variable settings.

⚠️ **Database**: Your MongoDB credentials are currently in this file. Consider:
1. Rotating your MongoDB password
2. Creating a separate database user for production
3. Setting proper IP whitelist on MongoDB Atlas

⚠️ **Free Tier Limitations**:
- Services spin down after 15 minutes of inactivity
- Limited build minutes per month
- Cold starts can take 30+ seconds
