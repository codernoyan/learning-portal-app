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
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedPost } = await queryFulfilled;
          const patchResult = dispatch(
            apiSlice.util.updateQueryData('getAssigmentMarks', undefined, (draft) => {
              const indexToUpdate = draft?.findIndex((assignment) => assignment.id === id.toString());
              draft[indexToUpdate] = { ...updatedPost };
            }),
          );
        } catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});

export const {
  useGetAssigmentMarksQuery, useGetAssigmentMarkQuery, useEditAssignmentMarkMutation, useGetAssigmentMarksByStudentIdQuery,
} = assignmentMarkApi;
