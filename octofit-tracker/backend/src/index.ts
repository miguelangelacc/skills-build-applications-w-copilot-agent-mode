import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase, mongodbUri } from './config/database';
import { getApiUrl, serverConfig } from './server';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

dotenv.config();

const app = express();
const PORT = serverConfig.port;
const API_URL = getApiUrl();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
connectDatabase().catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
  console.warn('⚠️  Continuing without database connection - API will respond but data routes will fail\n');
});

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'Backend is running',
    timestamp: new Date(),
    apiUrl: API_URL,
    isCodespace: serverConfig.isCodespace,
    codespaceName: serverConfig.codespaceName,
    environment: serverConfig.environment,
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
  console.log(`\n✅ Backend server running on ${API_URL}`);
  console.log(`📍 Environment: ${serverConfig.environment}`);
  console.log(`🔗 API Base URL: ${API_URL}`);
  if (serverConfig.isCodespace) {
    console.log(`🌐 Codespace: ${serverConfig.codespaceName}`);
  } else {
    console.log(`💻 Running locally on http://localhost:${PORT}`);
  }
  console.log(`🗄️  MongoDB: ${mongodbUri}\n`);
});
