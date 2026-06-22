declare const MONGODB_URI: string;
/**
 * Connect to MongoDB database
 * Uses mongoose for connection management
 */
export declare const connectDatabase: () => Promise<void>;
/**
 * Disconnect from MongoDB database
 */
export declare const disconnectDatabase: () => Promise<void>;
export { MONGODB_URI as mongodbUri };
declare const _default: {
    connectDatabase: () => Promise<void>;
    disconnectDatabase: () => Promise<void>;
    mongodbUri: string;
};
export default _default;
//# sourceMappingURL=database.d.ts.map