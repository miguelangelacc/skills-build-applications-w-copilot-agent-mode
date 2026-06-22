import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB connection URI configuration
const getMongodbUri = (): string => {
  const mongoUri = process.env.MONGODB_URI;
  
  if (mongoUri) {
    return mongoUri;
  }
  
  // Default connection string for local MongoDB on port 27017 with octofit_db database
  return 'mongodb://localhost:27017/octofit_db';
};

const MONGODB_URI = getMongodbUri();

/**
 * Connect to MongoDB database
 * Uses mongoose for connection management
 */
export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
    console.log(`   Database: octofit_db`);
    console.log(`   URI: ${MONGODB_URI}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
};

/**
 * Disconnect from MongoDB database
 */
export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('✅ MongoDB disconnected successfully');
  } catch (error) {
    console.error('❌ MongoDB disconnection error:', error);
    throw error;
  }
};

export { MONGODB_URI as mongodbUri };

export default {
  connectDatabase,
  disconnectDatabase,
  mongodbUri: MONGODB_URI,
};
