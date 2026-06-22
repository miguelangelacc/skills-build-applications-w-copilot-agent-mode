"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
// Codespaces-aware API URL
const getApiUrl = () => {
    const codespaceName = process.env.CODESPACE_NAME;
    const githubServer = process.env.GITHUB_SERVER_URL || 'github.com';
    if (codespaceName) {
        return `https://${codespaceName}-8000.${githubServer.replace('https://', '').replace('http://', '')}`;
    }
    return `http://localhost:${PORT}`;
};
const API_URL = getApiUrl();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// MongoDB Connection
(0, database_1.connectDatabase)().catch((err) => {
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
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
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
    console.log(`MongoDB URI: ${database_1.mongodbUri}`);
});
//# sourceMappingURL=index.js.map