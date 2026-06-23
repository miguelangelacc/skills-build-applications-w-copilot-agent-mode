"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongodbUri = exports.disconnectDatabase = exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// MongoDB connection URI configuration
const getMongodbUri = () => {
    const mongoUri = process.env.MONGODB_URI;
    if (mongoUri) {
        return mongoUri;
    }
    // Default connection string for local MongoDB on port 27017 with octofit_db database
    return 'mongodb://localhost:27017/octofit_db';
};
const MONGODB_URI = getMongodbUri();
exports.mongodbUri = MONGODB_URI;
/**
 * Connect to MongoDB database
 * Uses mongoose for connection management
 */
const connectDatabase = async () => {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('✅ MongoDB connected successfully');
        console.log(`   Database: octofit_db`);
        console.log(`   URI: ${MONGODB_URI}`);
    }
    catch (error) {
        console.error('❌ MongoDB connection error:', error);
        throw error;
    }
};
exports.connectDatabase = connectDatabase;
/**
 * Disconnect from MongoDB database
 */
const disconnectDatabase = async () => {
    try {
        await mongoose_1.default.disconnect();
        console.log('✅ MongoDB disconnected successfully');
    }
    catch (error) {
        console.error('❌ MongoDB disconnection error:', error);
        throw error;
    }
};
exports.disconnectDatabase = disconnectDatabase;
exports.default = {
    connectDatabase: exports.connectDatabase,
    disconnectDatabase: exports.disconnectDatabase,
    mongodbUri: MONGODB_URI,
};
//# sourceMappingURL=database.js.map