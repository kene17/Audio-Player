import express from 'express';
import { addAudio, getAudios } from '../controller/audioControllers';

const router = express.Router();

router.get('/audios', getAudios);
router.post('/audios', addAudio);

export default router;
