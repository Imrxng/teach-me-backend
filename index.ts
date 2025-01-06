import express, { Express } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import APIROUTER from './routers/api';
import { connectDB } from './server/mongo.db';
import { verifyAuthToken } from './middleware/middleware';

dotenv.config();

const APP: Express = express();

APP.set('view engine', 'ejs');
APP.set('views', path.join(__dirname, 'views'));

APP.use(express.json({ limit: '10mb' }));
APP.use(express.urlencoded({ limit: '10mb', parameterLimit: 50, extended: true }));
APP.use(express.static(path.join(__dirname, 'public')));
APP.use(cookieParser());
APP.use(cors({
  origin: 'https://teach-me-ui.vercel.app', 
  credentials: true, 
}));

(async () => {
  try {
    await connectDB();
    console.log('Succesvol verbonden met de database');
  } catch (error) {
    console.error('Databaseverbinding mislukt:', error);
    process.exit(1); 
  }
})();

APP.use(verifyAuthToken);
APP.use('/api', APIROUTER);

APP.use((req, res) => {
  res.status(404).json({
    error: 'The specified path does not exist.',
  });
});

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  APP.listen(PORT, () => {
    console.log(`Server draait op http://localhost:${PORT}`);
  });
}

export default APP;
