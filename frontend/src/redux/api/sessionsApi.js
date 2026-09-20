import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './baseQuery';

const baseQuery = createBaseQuery();

export const sessionsApi = createApi({
  reducerPath: 'sessionsApi',
  baseQuery,
  tagTypes: ['Sessions'],
  endpoints: (builder) => ({
    listSessions: builder.query({
      query: (groupId) => `/sessions/${groupId}`,
      providesTags: ['Sessions'],
    }),
    createSession: builder.mutation({
      query: (sessionData) => ({
        url: '/sessions',
        method: 'POST',
        body: sessionData,
      }),
      invalidatesTags: ['Sessions'],
    }),
    updateSession: builder.mutation({
      query: ({ sessionId, ...sessionData }) => ({
        url: `/sessions/${sessionId}`,
        method: 'PUT',
        body: sessionData,
      }),
      invalidatesTags: ['Sessions'],
    }),
    deleteSession: builder.mutation({
      query: (sessionId) => ({
        url: `/sessions/${sessionId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Sessions'],
    }),
  }),
});

export const {
  useListSessionsQuery,
  useCreateSessionMutation,
  useUpdateSessionMutation,
  useDeleteSessionMutation,
} = sessionsApi;
