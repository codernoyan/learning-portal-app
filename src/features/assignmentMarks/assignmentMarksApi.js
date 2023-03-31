import { apiSlice } from 'features/api/apiSlice';

export const assignmentMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssigmentMarks: builder.query({
      query: () => ({
        url: '/assignmentMark',
      }),
    }),
    getAssigmentMark: builder.query({
      query: (id) => ({
        url: `/assignmentMark/${id}`,
      }),
    }),
    editAssignmentMark: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignmentMark/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});

export const { useGetAssigmentMarksQuery, useGetAssigmentMarkQuery, useEditAssignmentMarkMutation } = assignmentMarkApi;
