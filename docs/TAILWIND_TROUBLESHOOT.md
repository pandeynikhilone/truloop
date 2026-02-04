# Troubleshooting Tailwind CSS v4 on Render

## Problem
Tailwind CSS v4 uses platform-specific native binaries (Lightning CSS) that need to be installed for the OS where the build is happening. On Render (Linux), sometimes these binaries fail to download automatically.

## Error Messages You Might See
```
Failed to download cli-linux-x64 binary
Error: Cannot find module '@tailwindcss/postcss'
ENOENT: no such file or directory, open 'node_modules/@tailwindcss/postcss/...'
```

## Solutions (Try in Order)

### Solution 1: Clean Install (Recommended)
Make sure `lightningcss` is explicitly listed in your `package.json` devDependencies:

```json
{
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "lightningcss": "^1.30.2",
    "tailwindcss": "^4"
  }
}
```

This is already configured in your project!

### Solution 2: Custom Build Command
If Solution 1 doesn't work, update the build command in Render dashboard or `render.yaml`:

```bash
cd frontend && npm ci && npm run build
```

The `npm ci` command does a clean install which can help with binary installation.

### Solution 3: Explicit Binary Installation
Update your build command to:

```bash
cd frontend && npm install && npx @tailwindcss/cli@latest install && npm run build
```

### Solution 4: Use Node 18 or Later
Make sure you're using Node.js 18 or later. This is already configured in `render.yaml`:

```yaml
envVars:
  - key: NODE_VERSION
    value: 18.17.0
```

## How to Update Build Command on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click on your frontend service (`truloop-frontend`)
3. Go to **Settings** tab
4. Scroll to **Build & Deploy** section
5. Update the **Build Command** field
6. Click **Save Changes**
7. Manually trigger a new deploy from the main page

## Verification

After deploying, check the build logs:

1. Go to your service dashboard
2. Click on **Logs** tab
3. Look for these success messages:
   ```
   ✓ Installing lightningcss...
   ✓ Building frontend...
   ✓ Compiled successfully
   ```

If you see errors about missing binaries, try the next solution.

## Alternative: Downgrade to Tailwind CSS v3

If all else fails, you can downgrade to v3 (stable but older):

```bash
cd frontend
npm uninstall tailwindcss @tailwindcss/postcss lightningcss
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

But v4 should work with the solutions above!

## Current Configuration Status

✅ Your project is configured with:
- Tailwind CSS v4
- Lightning CSS (for fast builds)
- Node.js 18.17.0
- Proper environment variables
- Clean build commands

The configuration should work on Render!
