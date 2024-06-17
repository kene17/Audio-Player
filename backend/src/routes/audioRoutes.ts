import express from 'express';

import { errorHandler } from '../middleware/errorHandler';
import {
  addAudio,
  getAudios,
  getMetadata,
} from '../controller/audioControllers';
import multer from 'multer';
import { upload } from '../middleware/fileUpload';

const router = express.Router();

router.post('/audios', upload.single('file'), addAudio);
router.get('/audios', getAudios);

router.use(errorHandler);

export default router;
