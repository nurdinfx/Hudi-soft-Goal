const getApiBaseUrl = () => {
  let envUrl = (import.meta.env.VITE_API_URL || '').trim().replace(/\/$/, '');
  const defaultUrl = 'https://gaol-backend.onrender.com/api';

  // If no env override, use the default
  if (!envUrl) return defaultUrl;

  // Ensure /api is appended if not already present
  if (!envUrl.endsWith('/api')) {
    envUrl = envUrl + '/api';
  }

  return envUrl;
};


const config = {
  apiBaseUrl: getApiBaseUrl(),
  env: import.meta.env.VITE_NODE_ENV || 'development',
  appName: import.meta.env.VITE_APP_NAME || 'Garbage Management System',
  companyName: import.meta.env.VITE_COMPANY_NAME || 'HUDI SOMPROJECTS',
};

export default config;
