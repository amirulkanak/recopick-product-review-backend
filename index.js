import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/database.js';
import queryRoutes from './routes/queryRoutes.js';
import recommendationRoutes from './routes/recommendationRoutes.js';

// Load environment variables
dotenv.config();

// Create express app
const app = express();

// Middleware
// { origin: process.env.FRONTEND_URL, credentials: true }
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Connect to database
connectDB();

// Query routes
app.use('/query', queryRoutes());
// Recommendation routes
app.use('/recommendation', recommendationRoutes());

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the API - developed by github/amirulkanak');
});

//  Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is online, address: http://localhost:${PORT}`);
});
