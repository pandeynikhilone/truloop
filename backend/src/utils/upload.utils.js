import cloudinary from '../config/cloudinary.config.js';
import streamifier from 'streamifier';

/**
 * Upload an image to Cloudinary
 * @param {Buffer} fileBuffer - The file buffer from multer
 * @param {string} folder - The folder name in Cloudinary (default: 'products/images')
 * @returns {Promise<Object>} - Cloudinary upload result with secure_url
 */
export const uploadImageToCloudinary = (fileBuffer, folder = 'products/images') => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: 'image',
                transformation: [
                    { quality: 'auto', fetch_format: 'auto' }, // Auto-optimize quality and format
                ],
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        // Convert buffer to stream and pipe to Cloudinary
        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
    });
};


/**
 * Delete a file from Cloudinary
 * @param {string} publicId - The public ID of the file to delete
 * @param {string} resourceType - The resource type ('image' or 'raw')
 * @returns {Promise<Object>} - Cloudinary deletion result
 */
export const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
    try {
        const result = await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
        return result;
    } catch (error) {
        throw error;
    }
};
