import { Schema, model } from 'mongoose';

const audioSchema = new Schema({
  title: { type: String, required: false },
  artist: { type: String, required: true },
  album: { type: String, required: false },
  url: { type: String, required: true },
});

const Audio = model('Audio', audioSchema);

export default Audio;
