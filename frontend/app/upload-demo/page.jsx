'use client';

import { useState } from 'react';
import ImageUpload from '../components/common/ImageUpload';

export default function UploadDemo() {
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

    const handleImageUploadSuccess = (url, data) => {
        console.log('Image uploaded successfully:', data);
        setUploadedImageUrl(url);
        alert('Image uploaded successfully!');
    };

    const handleUploadError = (error) => {
        console.error('Upload error:', error);
        alert('Upload failed: ' + error.message);
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px', color: '#111827' }}>
                Image Upload Demo
            </h1>
            <p style={{ fontSize: '16px', color: '#6B7280', marginBottom: '40px' }}>
                Test the Cloudinary image upload functionality
            </p>

            {/* Image Upload Section */}
            <div>
                <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', color: '#374151' }}>
                    📸 Image Upload
                </h2>
                <div style={{
                    backgroundColor: 'white',
                    padding: '24px',
                    borderRadius: '12px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                    <ImageUpload
                        onUploadSuccess={handleImageUploadSuccess}
                        onUploadError={handleUploadError}
                    />

                    {uploadedImageUrl && (
                        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#F0FDF4', borderRadius: '8px' }}>
                            <p style={{ fontSize: '14px', color: '#166534', fontWeight: '600', marginBottom: '8px' }}>
                                ✅ Image Uploaded Successfully!
                            </p>
                            <p style={{ fontSize: '12px', color: '#15803D', wordBreak: 'break-all' }}>
                                <strong>URL:</strong> {uploadedImageUrl}
                            </p>
                            <a
                                href={uploadedImageUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-block',
                                    marginTop: '12px',
                                    padding: '8px 16px',
                                    backgroundColor: '#166534',
                                    color: 'white',
                                    borderRadius: '6px',
                                    textDecoration: 'none',
                                    fontSize: '14px',
                                    fontWeight: '600'
                                }}
                            >
                                View Image
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* Instructions */}
            <div style={{
                marginTop: '48px',
                padding: '24px',
                backgroundColor: '#EFF6FF',
                borderRadius: '12px',
                border: '1px solid #DBEAFE'
            }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1E40AF', marginBottom: '12px' }}>
                    ℹ️ Instructions
                </h3>
                <ul style={{ fontSize: '14px', color: '#1E3A8A', lineHeight: '1.8' }}>
                    <li>Make sure your backend server is running on http://localhost:5000</li>
                    <li>Add Cloudinary credentials to your backend .env file</li>
                    <li>Image files must be JPEG, PNG, WebP, or GIF (max 5MB)</li>
                    <li>Uploaded files will be stored in your Cloudinary account</li>
                </ul>
            </div>
        </div>
    );
}
