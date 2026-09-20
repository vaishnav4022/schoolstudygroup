import axios from 'axios';

const api = axios.create({
  // Use a relative base URL so requests go through Vite's proxy in development.
  // In production, set VITE_API_URL to the deployed backend URL (e.g. https://api.example.com/api/v1).
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  withCredentials: true,
});

export default api;
