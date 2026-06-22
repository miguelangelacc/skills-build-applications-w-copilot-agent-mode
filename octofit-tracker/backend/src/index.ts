import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase, mongodbUri } from './config/database';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Codespaces-aware API URL
const getApiUrl = (): string => {
  const codespaceName = process.env.CODESPACE_NAME;
  const githubServer = process.env.GITHUB_SERVER_URL || 'github.com';
  
  if (codespaceName) {
    return `https://${codespaceName}-8000.${githubServer.replace('https://', '').replace('http://', '')}`;
  }
  
  return `http://localhost:${PORT}`;
};

const API_URL = getApiUrl();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
connectDatabase().catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
});

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'Backend is running',
    timestamp: new Date(),
    apiUrl: API_URL,
    environment: process.env.NODE_ENV || 'development',
  });
});

// API Routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.path,
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Backend server running on ${API_URL}`);
  console.log(`MongoDB URI: ${mongodbUri}`);
});
