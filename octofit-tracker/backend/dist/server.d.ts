/**
 * Get the API base URL for the current environment
 * - Codespaces: https://$CODESPACE_NAME-8000.app.github.dev
 * - Localhost: http://localhost:8000
 */
export declare const getApiUrl: () => string;
/**
 * Environment configuration
 */
export declare const serverConfig: {
    apiUrl: string;
    port: string | number;
    isCodespace: boolean;
    codespaceName: string | undefined;
    environment: string;
};
export default serverConfig;
//# sourceMappingURL=server.d.ts.map