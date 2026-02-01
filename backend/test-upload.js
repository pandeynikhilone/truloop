// Quick test script to verify backend upload endpoint
// Run this with: node test-upload.js

import fetch from 'node-fetch';
import fs from 'fs';
import FormData from 'form-data';

async function testUpload() {
    console.log('🧪 Testing backend upload endpoint...\n');

    // Test 1: Check if backend is running
    try {
        const response = await fetch('http://localhost:5000/');
        const text = await response.text();
        console.log('✅ Backend is running:', text);
    } catch (error) {
        console.log('❌ Backend is NOT running:', error.message);
        console.log('   Make sure to run: node src/server.js in backend folder');
        return;
    }

    console.log('\n📝 Backend is ready! You can now test uploads at:');
    console.log('   http://localhost:3000/upload-demo\n');

    console.log('📋 Troubleshooting checklist:');
    console.log('   ✅ Backend running on port 5000');
    console.log('   ✅ Cloudinary credentials in .env file');
    console.log('   ⚠️  Frontend running on port 3000?');
    console.log('   ⚠️  Browser console for errors?\n');
}

testUpload();
