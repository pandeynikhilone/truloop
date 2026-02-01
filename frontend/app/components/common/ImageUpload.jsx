'use client';

import { useState } from 'react';

/**
 * ImageUpload Component
 * A reusable component for uploading images to Cloudinary
 * 
 * @param {Function} onUploadSuccess - Callback function called with the uploaded image URL
 * @param {Function} onUploadError - Callback function called when upload fails
 * @param {string} buttonText - Text to display on the upload button
 * @param {string} folder - Cloudinary folder path (optional)
 */
export default function ImageUpload({
    onUploadSuccess,
    onUploadError,
    buttonText = 'Upload Image',
    folder = 'products/images'
}) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState(null);

    // Handle file selection
    const handleFileSelect = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            setError('Invalid file type. Please upload a JPEG, PNG, WebP, or GIF image.');
            return;
        }

        // Validate file size (5MB max)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            setError('File size exceeds 5MB. Please choose a smaller image.');
            return;
        }

        setError(null);
        setSelectedFile(file);

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    // Handle drag and drop
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const file = e.dataTransfer.files[0];
        if (file) {
            // Simulate file input change
            const mockEvent = { target: { files: [file] } };
            handleFileSelect(mockEvent);
        }
    };

    // Upload image to backend
    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Please select an image first');
            return;
        }

        setUploading(true);
        setUploadProgress(0);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('image', selectedFile);

            // Simulate upload progress (since fetch doesn't support progress natively)
            const progressInterval = setInterval(() => {
                setUploadProgress((prev) => {
                    if (prev >= 90) {
                        clearInterval(progressInterval);
                        return 90;
                    }
                    return prev + 10;
                });
            }, 200);

            const response = await fetch('http://localhost:5000/api/upload/image', {
                method: 'POST',
                body: formData,
            });

            clearInterval(progressInterval);
            setUploadProgress(100);

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Upload failed');
            }

            // Call success callback with the image URL
            if (onUploadSuccess) {
                onUploadSuccess(data.data.url, data.data);
            }

            // Reset state
            setTimeout(() => {
                setSelectedFile(null);
                setPreview(null);
                setUploadProgress(0);
                setUploading(false);
            }, 1000);

        } catch (err) {
            console.error('Upload error:', err);
            setError(err.message || 'Failed to upload image');
            setUploading(false);
            setUploadProgress(0);

            if (onUploadError) {
                onUploadError(err);
            }
        }
    };

    // Clear selection
    const handleClear = () => {
        setSelectedFile(null);
        setPreview(null);
        setError(null);
        setUploadProgress(0);
    };

    return (
        <div className="image-upload-container">
            {/* Drop Zone */}
            <div
                className="drop-zone"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                style={{
                    border: '2px dashed #4F46E5',
                    borderRadius: '12px',
                    padding: '32px',
                    textAlign: 'center',
                    backgroundColor: preview ? '#F9FAFB' : '#FAFAFA',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                }}
            >
                {preview ? (
                    <div style={{ position: 'relative' }}>
                        <img
                            src={preview}
                            alt="Preview"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '300px',
                                borderRadius: '8px',
                                objectFit: 'contain',
                            }}
                        />
                        {!uploading && (
                            <button
                                onClick={handleClear}
                                style={{
                                    position: 'absolute',
                                    top: '8px',
                                    right: '8px',
                                    background: 'rgba(0, 0, 0, 0.6)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '32px',
                                    height: '32px',
                                    cursor: 'pointer',
                                    fontSize: '18px',
                                }}
                            >
                                ×
                            </button>
                        )}
                    </div>
                ) : (
                    <div>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📸</div>
                        <p style={{ fontSize: '16px', color: '#6B7280', marginBottom: '8px' }}>
                            Drag & drop your image here, or click to browse
                        </p>
                        <p style={{ fontSize: '14px', color: '#9CA3AF' }}>
                            Supports: JPEG, PNG, WebP, GIF (Max 5MB)
                        </p>
                    </div>
                )}

                <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                    id="image-upload-input"
                />
            </div>

            {/* Error Message */}
            {error && (
                <div
                    style={{
                        marginTop: '16px',
                        padding: '12px 16px',
                        backgroundColor: '#FEE2E2',
                        color: '#DC2626',
                        borderRadius: '8px',
                        fontSize: '14px',
                    }}
                >
                    ⚠️ {error}
                </div>
            )}

            {/* Upload Progress */}
            {uploading && (
                <div style={{ marginTop: '16px' }}>
                    <div
                        style={{
                            width: '100%',
                            height: '8px',
                            backgroundColor: '#E5E7EB',
                            borderRadius: '4px',
                            overflow: 'hidden',
                        }}
                    >
                        <div
                            style={{
                                width: `${uploadProgress}%`,
                                height: '100%',
                                backgroundColor: '#4F46E5',
                                transition: 'width 0.3s ease',
                            }}
                        />
                    </div>
                    <p style={{ marginTop: '8px', fontSize: '14px', color: '#6B7280', textAlign: 'center' }}>
                        Uploading... {uploadProgress}%
                    </p>
                </div>
            )}

            {/* Upload Button */}
            <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
                <label
                    htmlFor="image-upload-input"
                    style={{
                        flex: 1,
                        padding: '12px 24px',
                        backgroundColor: '#E0E7FF',
                        color: '#4F46E5',
                        border: '2px solid #4F46E5',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: '600',
                        textAlign: 'center',
                        transition: 'all 0.2s ease',
                    }}
                >
                    Choose File
                </label>

                <button
                    onClick={handleUpload}
                    disabled={!selectedFile || uploading}
                    style={{
                        flex: 1,
                        padding: '12px 24px',
                        backgroundColor: !selectedFile || uploading ? '#D1D5DB' : '#4F46E5',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: !selectedFile || uploading ? 'not-allowed' : 'pointer',
                        fontSize: '16px',
                        fontWeight: '600',
                        transition: 'all 0.2s ease',
                    }}
                >
                    {uploading ? 'Uploading...' : buttonText}
                </button>
            </div>

            {/* Selected File Info */}
            {selectedFile && !uploading && (
                <div
                    style={{
                        marginTop: '12px',
                        padding: '12px',
                        backgroundColor: '#F3F4F6',
                        borderRadius: '8px',
                        fontSize: '14px',
                        color: '#374151',
                    }}
                >
                    <strong>Selected:</strong> {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                </div>
            )}
        </div>
    );
}
