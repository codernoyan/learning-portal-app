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
    getAssigmentMarksByStudentId: builder.query({
      query: (studentId) => ({
        url: `/assignmentMark?student_id_like=${studentId}`,
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

export const {
  useGetAssigmentMarksQuery, useGetAssigmentMarkQuery, useEditAssignmentMarkMutation, useGetAssigmentMarksByStudentIdQuery,
} = assignmentMarkApi;
