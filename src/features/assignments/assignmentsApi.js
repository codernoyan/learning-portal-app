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
        url: `/assignments?video_id_like=${videoId}`,
      }),
    }),
    addAssignment: builder.mutation({
      query: (data) => ({
        url: '/assignments',
        method: 'POST',
        body: data,
      }),
    }),
    editAssignment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: 'PATCH',
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
  useGetAssignmentsQuery, useGetAssignmentQuery, useAddAssignmentMutation, useEditAssignmentMutation, useDeleteAssignmentMutation, useGetAssignmentByVideoIdQuery,
} = assignmentsApi;
