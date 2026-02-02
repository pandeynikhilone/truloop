# Render Deployment Checklist

Use this checklist to ensure your deployment to Render goes smoothly.

## Pre-Deployment Checklist

### 1. Code Repository
- [ ] All changes committed to Git
- [ ] Code pushed to GitHub
- [ ] `.env` files are NOT committed (they're in `.gitignore`)
- [ ] `.env.example` files are present for reference

### 2. Environment Variables Prepared
Have these values ready for configuration:

**Backend Variables:**
- [ ] `MONGODB_URI` - Your MongoDB connection string
- [ ] `CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name
- [ ] `CLOUDINARY_API_KEY` - Your Cloudinary API key  
- [ ] `CLOUDINARY_API_SECRET` - Your Cloudinary API secret
- [ ] `CORS_ORIGIN` - Your frontend URL (will add after frontend deploys)
- [ ] `PORT` - Set to 5000 (or let Render auto-assign)

**Frontend Variables:**
- [ ] `NEXT_PUBLIC_API_URL` - Your backend URL (will add after backend deploys)

### 3. Database Setup
- [ ] MongoDB Atlas cluster is running
- [ ] MongoDB allows connections from anywhere (0.0.0.0/0) in Network Access
- [ ] Database user credentials are correct
- [ ] Test connection string works locally

### 4. Third-Party Services
- [ ] Cloudinary account is active
- [ ] Cloudinary credentials are correct
- [ ] Test image upload works locally

---

## Deployment Steps

### Step 1: Create Backend Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +" → "Web Service"**
3. Connect your GitHub repository
4. Configure the backend service:

**Basic Settings:**
- Name: `truloop-backend`
- Region: Oregon (or closest to you)
- Branch: `main`
- Root Directory: *(leave blank)*
- Runtime: Node
- Build Command: `cd backend && npm install`
- Start Command: `cd backend && npm start`

**Environment Variables:**
```
NODE_VERSION=18.17.0
MONGODB_URI=<your-mongodb-uri>
CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>
PORT=5000
```

5. Click **"Create Web Service"**
6. Wait for deployment to complete (check Logs tab)
7. **Copy the backend URL** (e.g., `https://truloop-backend.onrender.com`)

**Checklist After Backend Deploy:**
- [ ] Deployment succeeded (green checkmark)
- [ ] Service is live at the provided URL
- [ ] Backend URL copied for frontend configuration
- [ ] Logs show "Server running at port 5000"
- [ ] MongoDB connected successfully (check logs)

---

### Step 2: Create Frontend Service on Render

1. Click **"New +" → "Web Service"** again
2. Connect the same GitHub repository
3. Configure the frontend service:

**Basic Settings:**
- Name: `truloop-frontend`
- Region: Oregon (same as backend)
- Branch: `main`
- Root Directory: *(leave blank)*
- Runtime: Node
- Build Command: `cd frontend && npm install && npm run build`
- Start Command: `cd frontend && npm start`

**Environment Variables:**
```
NODE_VERSION=18.17.0
NODE_ENV=production
NEXT_PUBLIC_API_URL=<your-backend-url-from-step-1>
```

4. Click **"Create Web Service"**
5. Wait for deployment (this may take 5-10 minutes due to Next.js build)
6. **Copy the frontend URL** (e.g., `https://truloop-frontend.onrender.com`)

**Checklist After Frontend Deploy:**
- [ ] Deployment succeeded
- [ ] Frontend is accessible at the provided URL
- [ ] No 404 errors on the homepage
- [ ] Frontend URL copied for backend CORS configuration

---

### Step 3: Update Backend CORS

1. Go back to **backend service** in Render
2. Go to **Environment** tab
3. Add/Update environment variable:
   ```
   CORS_ORIGIN=<your-frontend-url-from-step-2>
   ```
4. Service will automatically redeploy

**Checklist:**
- [ ] `CORS_ORIGIN` is set to frontend URL
- [ ] Backend redeployed successfully

---

### Step 4: Test the Deployment

**Backend Tests:**
- [ ] Visit `<backend-url>/` - Should see a response (or 404 if no root route)
- [ ] Check `<backend-url>/api/products` - Should return products list
- [ ] Check Render logs for any errors

**Frontend Tests:**
- [ ] Visit `<frontend-url>` - Homepage loads correctly
- [ ] Navigate to Products page - Products load from API
- [ ] Click on a product - Product details load
- [ ] Check browser console for CORS errors (should be none)
- [ ] Try submitting a review - Should work end-to-end

**Integration Tests:**
- [ ] Images load from Cloudinary
- [ ] New product can be added (if you have admin access)
- [ ] Reviews can be submitted
- [ ] All API calls work without CORS errors

---

## Troubleshooting

### Issue: Tailwind CSS Build Fails

**Error:** `Failed to download cli-linux-x64 binary`

**Solution:** See `TAILWIND_TROUBLESHOOT.md` for detailed solutions.

Quick fix:
1. Go to frontend service settings
2. Update Build Command to: `cd frontend && npm ci && npm run build`
3. Trigger manual deploy

---

### Issue: Backend Can't Connect to MongoDB

**Error:** `MongooseServerSelectionError: Could not connect to any servers`

**Solutions:**
1. Check MongoDB Atlas Network Access:
   - Go to MongoDB Atlas Dashboard
   - Navigate to Network Access
   - Add IP: `0.0.0.0/0` (Allow from anywhere)
   
2. Verify connection string:
   - Check `MONGODB_URI` in Render environment variables
   - Make sure password doesn't have special characters that need encoding
   - Test the connection string locally

---

### Issue: CORS Errors in Browser

**Error:** `Access to fetch at '...' has been blocked by CORS policy`

**Solutions:**
1. Check `CORS_ORIGIN` in backend environment variables
2. Make sure it matches your frontend URL exactly (no trailing slash)
3. Redeploy backend after changing environment variables

---

### Issue: Environment Variables Not Working

**Solutions:**
1. In Render dashboard, go to service → Environment tab
2. Click "Add Environment Variable"
3. Make sure you click "Save Changes"
4. Service will auto-redeploy
5. Check logs to verify variables are loaded

---

### Issue: Build Takes Too Long / Times Out

**For Frontend:**
- Tailwind CSS v4 builds can be slow on first deploy
- Free tier has limited resources
- Solution: Wait patiently (up to 15 minutes for first build)

**For Backend:**
- Should be fast (< 2 minutes)
- If slow, check for large node_modules or dependencies

---

### Issue: Service Keeps Spinning Down

**Explanation:**
- Render free tier spins down after 15 minutes of inactivity
- Cold starts can take 30+ seconds

**Solutions:**
1. Upgrade to paid plan for 24/7 uptime
2. Use a service like [UptimeRobot](https://uptimerobot.com/) (free) to ping every 5 minutes
3. Accept the limitation for development/demo purposes

---

## Post-Deployment

### Security Improvements (Recommended)

- [ ] Change MongoDB password
- [ ] Create separate MongoDB user for production
- [ ] Rotate Cloudinary API credentials
- [ ] Set up proper authentication for admin routes
- [ ] Add rate limiting to API endpoints

### Monitoring

- [ ] Set up Render notifications for failed deploys
- [ ] Bookmark both service dashboards
- [ ] Check logs regularly for errors
- [ ] Monitor MongoDB Atlas metrics

### Future Deployments

For subsequent deployments:
1. Push changes to GitHub
2. Render auto-deploys on git push (if auto-deploy enabled)
3. Or manually trigger deploy from Render dashboard

---

## Quick Reference

**Backend URL:** `https://truloop-backend.onrender.com`  
**Frontend URL:** `https://truloop-frontend.onrender.com`

**Environment Variables Summary:**

Backend:
```
MONGODB_URI
CLOUDINARY_CLOUD_NAME  
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
CORS_ORIGIN
PORT=5000
NODE_VERSION=18.17.0
```

Frontend:
```
NEXT_PUBLIC_API_URL
NODE_VERSION=18.17.0
NODE_ENV=production
```

---

## Support

If you encounter issues not covered here:
1. Check Render logs (most errors are visible there)
2. Review `DEPLOYMENT.md` for detailed explanations
3. Check `TAILWIND_TROUBLESHOOT.md` for CSS-specific issues
4. Consult Render documentation: https://render.com/docs

---

**Good luck with your deployment! 🚀**
