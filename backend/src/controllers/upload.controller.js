import { uploadImageToCloudinary } from '../utils/upload.utils.js';

/**
 * Upload an image file to Cloudinary
 * @route POST /api/upload/image
 */
export const uploadImage = async (req, res) => {
    try {
        // Check if file exists
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No image file provided'
            });
        }

        // Upload to Cloudinary
        const result = await uploadImageToCloudinary(req.file.buffer);

        res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            data: {
                url: result.secure_url,
                publicId: result.public_id,
                format: result.format,
                width: result.width,
                height: result.height,
            },
        });
    } catch (error) {
        console.error('Image upload error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to upload image',
            error: error.message,
        });
    }
};


/**
 * Upload multiple images to Cloudinary
 * @route POST /api/upload/images
 */
export const uploadMultipleImages = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No image files provided'
            });
        }

        // Upload all images in parallel
        const uploadPromises = req.files.map(file => uploadImageToCloudinary(file.buffer));
        const results = await Promise.all(uploadPromises);

        const uploadedImages = results.map(result => ({
            url: result.secure_url,
            publicId: result.public_id,
            format: result.format,
            width: result.width,
            height: result.height,
        }));

        res.status(200).json({
            success: true,
            message: `${uploadedImages.length} images uploaded successfully`,
            data: uploadedImages,
        });
    } catch (error) {
        console.error('Multiple images upload error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to upload images',
            error: error.message,
        });
    }
};
