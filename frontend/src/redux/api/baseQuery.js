/**
 * Shared RTK Query base configuration.
 *
 * Uses a relative baseUrl ('/api/v1') so all requests route through
 * Vite's dev-server proxy → no CORS issues in development.
 *
 * In production, set VITE_API_URL to the deployed backend origin
 * (e.g. https://api.example.com/api/v1) in your .env.production file.
 */
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const createBaseQuery = () =>
  fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || '/api/v1',
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });
