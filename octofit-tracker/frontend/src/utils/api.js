/**
 * API Configuration for Octofit Tracker
 * 
 * Environment Variables (define in .env.local):
 * - VITE_CODESPACE_NAME: GitHub Codespace name (e.g., "myspace")
 * 
 * URL Format:
 * - Codespaces: https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api
 * - Localhost: http://localhost:8000/api
 */

/**
 * Get the API base URL for the current environment
 * @returns {string} Base API URL with fallback to localhost
 */
export const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  
  // Use Codespaces URL if available
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }
  
  // Fallback to localhost for local development
  return 'http://localhost:8000/api';
};

/**
 * Fetch data from API endpoint with error handling
 * @param {string} endpoint - API endpoint (e.g., '/users', '/activities')
 * @returns {Promise<Array>} Array of data or empty array on error
 */
export const fetchFromApi = async (endpoint) => {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      console.warn(`API Error: ${response.status} ${response.statusText} at ${url}`);
      return [];
    }
    
    const data = await response.json();
    
    // Handle paginated responses (data.data) or direct arrays
    return Array.isArray(data) ? data : (data.data || []);
  } catch (error) {
    console.error(`Failed to fetch from ${url}:`, error);
    return [];
  }
};

export default {
  getApiBaseUrl,
  fetchFromApi,
};
