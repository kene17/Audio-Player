import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import routes from './routes/audioRoutes';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';

const app = express();

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() =>
    console.log('connected to database:', process.env.MONGODB_CONNECTION_STRING)
  );

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use('/api', routes);
app.use(errorHandler);

app.listen(4000, () => {
  console.log('server is listening on port 4000');
});
