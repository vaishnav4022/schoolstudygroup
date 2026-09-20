import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './baseQuery';

const baseQuery = createBaseQuery();

export const resourcesApi = createApi({
  reducerPath: 'resourcesApi',
  baseQuery,
  tagTypes: ['Resources'],
  endpoints: (builder) => ({
    listResources: builder.query({
      query: (groupId) => `/resources/${groupId}`,
      providesTags: ['Resources'],
    }),
    uploadResource: builder.mutation({
      query: ({ groupId, formData }) => ({
        url: '/resources',
        method: 'POST',
        body: formData,
        params: { groupId },
      }),
      invalidatesTags: ['Resources'],
    }),
    deleteResource: builder.mutation({
      query: (resourceId) => ({
        url: `/resources/${resourceId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Resources'],
    }),
  }),
});

export const {
  useListResourcesQuery,
  useUploadResourceMutation,
  useDeleteResourceMutation,
} = resourcesApi;
