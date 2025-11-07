export const API_BASE_URL = import.meta.env.MODE === 'production' 
  ? 'https://greenaro.ilimat-it.com/api'
  : 'http://localhost:5000';

export const config = {
  apiUrl: API_BASE_URL,
  env: import.meta.env.MODE,
};
