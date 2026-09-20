import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './baseQuery';

const baseQuery = createBaseQuery();

export const notificationsApi = createApi({
  reducerPath: 'notificationsApi',
  baseQuery,
  tagTypes: ['Notifications'],
  endpoints: (builder) => ({
    listNotifications: builder.query({
      query: () => '/notifications',
      providesTags: ['Notifications'],
    }),
    markAsRead: builder.mutation({
      query: (notificationId) => ({
        url: `/notifications/${notificationId}/read`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Notifications'],
    }),
  }),
});

export const {
  useListNotificationsQuery,
  useMarkAsReadMutation,
} = notificationsApi;
