import dotenv from 'dotenv';

dotenv.config();

/**
 * Get the API base URL for the current environment
 * - Codespaces: https://$CODESPACE_NAME-8000.app.github.dev
 * - Localhost: http://localhost:8000
 */
export const getApiUrl = (): string => {
  const codespaceName = process.env.CODESPACE_NAME;
  const port = process.env.PORT || 8000;

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return `http://localhost:${port}`;
};

/**
 * Environment configuration
 */
export const serverConfig = {
  apiUrl: getApiUrl(),
  port: process.env.PORT || 8000,
  isCodespace: !!process.env.CODESPACE_NAME,
  codespaceName: process.env.CODESPACE_NAME,
  environment: process.env.NODE_ENV || 'development',
};

export default serverConfig;
