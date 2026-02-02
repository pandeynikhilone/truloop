#!/bin/bash
# This script ensures Tailwind CSS v4 binaries are properly installed on Render

echo "🔧 Installing Tailwind CSS v4 with platform-specific binaries..."

# Navigate to frontend directory
cd frontend

# Clean install to ensure all dependencies are fresh
echo "📦 Running npm install..."
npm install

# Explicitly install lightningcss (required for Tailwind v4)
echo "⚡ Installing lightningcss..."
npm install --save-dev lightningcss

# Build the frontend
echo "🏗️ Building frontend..."
npm run build

echo "✅ Build complete!"
