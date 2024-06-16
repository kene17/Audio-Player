import { Request, Response } from 'express';
import Audio from '../models/models';

//when this api is called it shoulf retrieve audio
export const getAudios = async (req: Request, res: Response) => {
  try {
    const audios = await Audio.find();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const addAudio = async (req: Request, res: Response) => {
  try {
    const { title, artist, album, url } = req.body;
    const newAudio = new Audio({ title, artist, album, url });
    await newAudio.save();
    res.status(201).json(newAudio);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
