import { Request, Response } from 'express';
import path from 'path';
import Audio from '../models/models';
import { parseFile } from 'music-metadata';
import { fileURLToPath } from 'url';

export const getAudios = async (req: Request, res: Response) => {
  try {
    const audios = await Audio.find();
    res.status(200).json(audios);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const addAudio = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    const newAudio = new Audio({
      title: req.body.title || req.file.originalname,
      artist: req.body.artist || 'Unknown Artist',
      album: req.body.album || 'Unknown Album',
      url: fileUrl,
    });

    await newAudio.save();
    res.status(201).json(newAudio);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getMetadata = async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ message: 'URL is required' });
    }

    const filePath = path.join(__dirname, '..', 'uploads', path.basename(url));
    console.log('filePath:', filePath);

    const metadata = await parseFile(filePath);
    console.log('metatadata:', metadata);

    res.status(200).json({
      title: metadata.common.title || 'Unknown Title',
      artist: metadata.common.artist || 'Unknown Artist',
      album: metadata.common.album || 'Unknown Album',
      picture: metadata.common.picture || null,
    });
  } catch (error) {
    console.error('Error parsing metadata:', error);
    res.status(500).json({ message: 'Server error', error: error });
  }
};
