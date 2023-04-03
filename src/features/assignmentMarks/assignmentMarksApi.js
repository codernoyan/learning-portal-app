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
    addAssignmentMark: builder.mutation({
      query: (data) => ({
        url: '/assignmentMark',
        method: 'POST',
        body: data,
      }),
      // pessimistic update for add assignment mark
      async onQueryStarted({ data }, { dispatch, queryFulfilled }) {
        try {
          const assignmentMark = await queryFulfilled;
          if (Object.keys(assignmentMark.data).length > 1) {
            dispatch(apiSlice.util.updateQueryData('getAssigmentMarks', undefined, (draft) => {
              draft.push(assignmentMark.data);
            }));
          }
        } catch (err) {
          // console.log(err);
        }
      },
    }),
    editAssignmentMark: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignmentMark/${id}`,
        method: 'PATCH',
        body: data,
      }),
      // pessimistic update
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedAssignmentData } = await queryFulfilled;
          const patchResult = dispatch(
            apiSlice.util.updateQueryData('getAssigmentMarks', undefined, (draft) => {
              const indexToUpdate = draft?.findIndex((assignment) => assignment.id === id);
              draft[indexToUpdate] = { ...updatedAssignmentData, status: updatedAssignmentData.status, mark: updatedAssignmentData.mark };
            }),
          );
        } catch (err) {
          // console.error(err);
        }
      },
    }),
  }),
});

export const {
  useGetAssigmentMarksQuery, useGetAssigmentMarkQuery, useEditAssignmentMarkMutation, useGetAssigmentMarksByStudentIdQuery, useAddAssignmentMarkMutation,
} = assignmentMarkApi;
