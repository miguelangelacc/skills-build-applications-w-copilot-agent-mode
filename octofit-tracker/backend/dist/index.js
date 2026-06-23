"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const server_1 = require("./server");
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = server_1.serverConfig.port;
const API_URL = (0, server_1.getApiUrl)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// MongoDB Connection
(0, database_1.connectDatabase)().catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    console.warn('⚠️  Continuing without database connection - API will respond but data routes will fail\n');
});
// Health Check Route
app.get('/api/health', (req, res) => {
    res.json({
        status: 'Backend is running',
        timestamp: new Date(),
        apiUrl: API_URL,
        isCodespace: server_1.serverConfig.isCodespace,
        codespaceName: server_1.serverConfig.codespaceName,
        environment: server_1.serverConfig.environment,
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
    console.log(`\n✅ Backend server running on ${API_URL}`);
    console.log(`📍 Environment: ${server_1.serverConfig.environment}`);
    console.log(`🔗 API Base URL: ${API_URL}`);
    if (server_1.serverConfig.isCodespace) {
        console.log(`🌐 Codespace: ${server_1.serverConfig.codespaceName}`);
    }
    else {
        console.log(`💻 Running locally on http://localhost:${PORT}`);
    }
    console.log(`🗄️  MongoDB: ${database_1.mongodbUri}\n`);
});
//# sourceMappingURL=index.js.map