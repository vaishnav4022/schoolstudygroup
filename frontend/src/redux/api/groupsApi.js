import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './baseQuery';

const baseQuery = createBaseQuery();

export const groupsApi = createApi({
  reducerPath: 'groupsApi',
  baseQuery,
  tagTypes: ['Groups', 'Group'],
  endpoints: (builder) => ({
    listGroups: builder.query({
      query: (filters) => {
        const params = new URLSearchParams(filters).toString();
        return `/groups?${params}`;
      },
      providesTags: ['Groups'],
    }),
    getGroup: builder.query({
      query: (groupId) => `/groups/${groupId}`,
      providesTags: ['Group'],
    }),
    createGroup: builder.mutation({
      query: (groupData) => ({
        url: '/groups',
        method: 'POST',
        body: groupData,
      }),
      invalidatesTags: ['Groups'],
    }),
    updateGroup: builder.mutation({
      query: ({ groupId, ...groupData }) => ({
        url: `/groups/${groupId}`,
        method: 'PUT',
        body: groupData,
      }),
      invalidatesTags: ['Groups', 'Group'],
    }),
    deleteGroup: builder.mutation({
      query: (groupId) => ({
        url: `/groups/${groupId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Groups'],
    }),
    joinGroup: builder.mutation({
      query: (groupId) => ({
        url: `/join-requests/${groupId}`,
        method: 'POST',
      }),
      invalidatesTags: ['Groups'],
    }),
    leaveGroup: builder.mutation({
      query: (groupId) => ({
        url: `/groups/${groupId}/leave`,
        method: 'POST',
      }),
      invalidatesTags: ['Groups', 'Group'],
    }),
  }),
});

export const {
  useListGroupsQuery,
  useGetGroupQuery,
  useCreateGroupMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
  useJoinGroupMutation,
  useLeaveGroupMutation,
} = groupsApi;
