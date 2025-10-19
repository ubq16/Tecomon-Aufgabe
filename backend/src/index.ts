import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routes from './routes/widget';
const app = express();
dotenv.config();


app.use(cors());
app.use(express.json());
app.use('/api', routes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/widgets')
  .then(() => console.log('MongoDB connected'))
  .catch((err: any) => console.error('MongoDB connection error:', err));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));