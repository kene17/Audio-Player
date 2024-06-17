import mongoose from 'mongoose';

const audioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, default: 'Unknown Artist' },
  album: { type: String, default: 'Unknown Album' },
  url: { type: String, required: true },
});

const Audio = mongoose.model('Audio', audioSchema);

export default Audio;
