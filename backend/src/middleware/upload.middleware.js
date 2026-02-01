import multer from 'multer';

// Configure multer to use memory storage (files stored in memory as Buffer)
const storage = multer.memoryStorage();

// File filter for images
const imageFilter = (req, file, cb) => {
    // Accept only image files
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF images are allowed.'), false);
    }
};

// Upload middleware for images (max 5MB)
export const uploadImage = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
    fileFilter: imageFilter,
}).single('image'); // 'image' is the field name in the form

// Generic upload middleware
export const uploadFile = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
    },
}).single('file');
