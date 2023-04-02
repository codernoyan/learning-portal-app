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
      // pessimistic update for add video
      async onQueryStarted({ data }, { dispatch, queryFulfilled }) {
        try {
          const assignment = await queryFulfilled;
          if (Object.keys(assignment.data).length > 1) {
            dispatch(apiSlice.util.updateQueryData('getAssignments', undefined, (draft) => {
              draft.push(assignment.data);
            }));
          }
        } catch (err) {
          // console.log(err);
        }
      },
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
      // optimistic update
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(apiSlice.util.updateQueryData('getAssignments', undefined, (draft) => {
          const indexToDelete = draft.findIndex((assignment) => assignment.id === id);
          draft.splice(indexToDelete, 1);
        }));
        try {
          const assignments = await queryFulfilled;
        } catch (err) {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetAssignmentsQuery, useGetAssignmentQuery, useAddAssignmentMutation, useEditAssignmentMutation, useDeleteAssignmentMutation, useGetAssignmentByVideoIdQuery,
} = assignmentsApi;
