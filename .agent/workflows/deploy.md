---
description: How to deploy the Truloop application to Render
---

# Deploy to Render Workflow

This workflow guides you through deploying the Truloop application to Render.

## Prerequisites

Before starting:
1. Ensure all code is committed and pushed to GitHub
2. Have your MongoDB URI ready
3. Have your Cloudinary credentials ready
4. Create a Render account at https://render.com

## Step 1: Prepare Environment Variables

Gather these values:

**Backend:**
- MONGODB_URI (from MongoDB Atlas)
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET

**Frontend:**
- Will be set after backend is deployed

## Step 2: Deploy Backend Service

// turbo
1. Go to https://dashboard.render.com/
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `pandeynikhilone/truloop`
4. Configure the service:
   - **Name:** `truloop-backend`
   - **Region:** Oregon
   - **Branch:** `main`
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
   
5. Add environment variables:
   - NODE_VERSION: `18.17.0`
   - MONGODB_URI: `<your-mongodb-uri>`
   - CLOUDINARY_CLOUD_NAME: `<your-cloud-name>`
   - CLOUDINARY_API_KEY: `<your-api-key>`
   - CLOUDINARY_API_SECRET: `<your-api-secret>`
   - PORT: `5000`

6. Click "Create Web Service"
7. **Wait for deployment to complete**
8. **Copy your backend URL** (e.g., https://truloop-backend.onrender.com)

## Step 3: Deploy Frontend Service

1. Click "New +" → "Web Service" again
2. Connect the same repository
3. Configure:
   - **Name:** `truloop-frontend`
   - **Region:** Oregon
   - **Branch:** `main`
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Start Command:** `cd frontend && npm start`

4. Add environment variables:
   - NODE_VERSION: `18.17.0`
   - NODE_ENV: `production`
   - NEXT_PUBLIC_API_URL: `<backend-url-from-step-2>`

5. Click "Create Web Service"
6. **Wait for build (5-10 minutes)**
7. **Copy your frontend URL** (e.g., https://truloop-frontend.onrender.com)

## Step 4: Update Backend CORS

1. Go back to backend service in Render
2. Navigate to "Environment" tab
3. Add environment variable:
   - CORS_ORIGIN: `<frontend-url-from-step-3>`
4. Service will auto-redeploy

## Step 5: Verify Deployment

Test your deployment:

1. **Backend Health Check:**
   - Visit: `<backend-url>/api/products`
   - Should return product list JSON

2. **Frontend Health Check:**
   - Visit: `<frontend-url>`
   - Homepage should load
   - Navigate to products page
   - Click on a product

3. **Integration Test:**
   - Open browser dev tools (F12)
   - Check Console tab for errors
   - Try submitting a review
   - Verify no CORS errors

## Troubleshooting

### Tailwind CSS Build Fails

**Error:** Failed to download cli-linux-x64 binary

**Solution:**
1. Go to frontend service settings
2. Change Build Command to: `cd frontend && npm ci && npm run build`
3. Trigger manual deploy

See `TAILWIND_TROUBLESHOOT.md` for more solutions.

### MongoDB Connection Fails

**Solution:**
1. Go to MongoDB Atlas
2. Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)
3. Verify MONGODB_URI is correct in Render environment

### CORS Errors

**Solution:**
1. Verify CORS_ORIGIN in backend matches frontend URL exactly
2. No trailing slash in URL
3. Redeploy backend

## Post-Deployment

✅ Your app is now live!

- Backend: `<your-backend-url>`
- Frontend: `<your-frontend-url>`

### Next Steps:

1. Test all features thoroughly
2. Set up monitoring (optional)
3. Consider upgrading to paid plan to avoid spin-down (optional)
4. Update your local `.env.local` if needed for development

## Future Deployments

For subsequent updates:
1. Push code to GitHub
2. Render will auto-deploy (if auto-deploy is enabled)
3. Or manually trigger deploy from Render dashboard

## References

- Detailed guide: `DEPLOYMENT.md`
- Step-by-step checklist: `DEPLOYMENT_CHECKLIST.md`
- Tailwind troubleshooting: `TAILWIND_TROUBLESHOOT.md`
