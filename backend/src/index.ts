import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import routes from './routes/audioRoutes';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() =>
    console.log('connected to database:', process.env.MONGODB_CONNECTION_STRING)
  );

app.use('/api', routes);

app.listen(4000, () => {
  console.log('server is listening on port 4000');
});
