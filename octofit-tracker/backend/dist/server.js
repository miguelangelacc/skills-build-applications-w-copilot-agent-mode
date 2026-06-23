"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverConfig = exports.getApiUrl = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**
 * Get the API base URL for the current environment
 * - Codespaces: https://$CODESPACE_NAME-8000.app.github.dev
 * - Localhost: http://localhost:8000
 */
const getApiUrl = () => {
    const codespaceName = process.env.CODESPACE_NAME;
    const port = process.env.PORT || 8000;
    if (codespaceName) {
        return `https://${codespaceName}-8000.app.github.dev`;
    }
    return `http://localhost:${port}`;
};
exports.getApiUrl = getApiUrl;
/**
 * Environment configuration
 */
exports.serverConfig = {
    apiUrl: (0, exports.getApiUrl)(),
    port: process.env.PORT || 8000,
    isCodespace: !!process.env.CODESPACE_NAME,
    codespaceName: process.env.CODESPACE_NAME,
    environment: process.env.NODE_ENV || 'development',
};
exports.default = exports.serverConfig;
//# sourceMappingURL=server.js.map