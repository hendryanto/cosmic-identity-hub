// This file manages server configuration for the frontend
const getServerUrl = () => {
  // For development, you might want to use environment variables
  // but for now we'll use the production URL
  return 'http://34.101.240.126';
};

export const SERVER_URL = getServerUrl();