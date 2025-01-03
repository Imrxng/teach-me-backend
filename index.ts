import express, { Express } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import APIROUTER from './routers/api';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './server/mongo.db';

dotenv.config();

// Initialiseer express app
const APP: Express = express();

APP.set('view engine', 'ejs');
APP.set('views', path.join(__dirname, 'views'));

APP.use(express.json({ limit: '10mb' }));
APP.use(express.urlencoded({ limit: '10mb', parameterLimit: 50, extended: true }));
APP.use(express.static(path.join(__dirname, 'public')));
APP.use(cookieParser());
APP.use(cors({
  origin: 'https://imrxng.github.io/teach-me-ui/',
  credentials: true,
}));

APP.set('port', process.env.PORT ?? 3000);

APP.use('/api', APIROUTER);

APP.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Databaseverbinding mislukt:', error);
    res.status(500).send('Databaseverbinding mislukt');
  }
});

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
