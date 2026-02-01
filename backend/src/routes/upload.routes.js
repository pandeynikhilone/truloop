import express from 'express';
import { uploadImage } from '../middleware/upload.middleware.js';
import * as uploadController from '../controllers/upload.controller.js';

const router = express.Router();

/**
 * @route   POST /api/upload/image
 * @desc    Upload a single image
 * @access  Public (add authentication middleware later if needed)
 */
router.post('/image', uploadImage, uploadController.uploadImage);


export default router;
