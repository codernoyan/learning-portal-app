import { apiSlice } from 'features/api/apiSlice';

export const assignmentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignments: builder.query({
      query: () => ({
        url: '/assignments',
      }),
    }),
    getAssignment: builder.query({
      query: (id) => ({
        url: `/assignments/${id}`,
      }),
    }),
    getAssignmentByVideoId: builder.query({
      query: (videoId) => ({
        url: `/assignments/${videoId}`,
      }),
    }),
    addAssignment: builder.mutation({
      query: (data) => ({
        url: '/assignments',
        method: 'POST',
        body: data,
      }),
    }),
    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAssignmentsQuery, useGetAssignmentQuery, useAddAssignmentMutation, useDeleteAssignmentMutation, useGetAssignmentByVideoIdQuery,
} = assignmentsApi;
