import { apiSlice } from 'features/api/apiSlice';

export const quizzesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: () => ({
        url: '/quizzes',
      }),
    }),
    getQuizzesByVideoId: builder.query({
      query: (videoId) => ({
        url: `/quizzes?video_id_like=${videoId}`,
      }),
    }),
    getQuiz: builder.query({
      query: (id) => ({
        url: `/quizzes/${id}`,
      }),
    }),
    addQuiz: builder.mutation({
      query: (data) => ({
        url: '/quizzes',
      }),
    }),
    editQuiz: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: 'DELETE',
      }),
      // optimistic update
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(apiSlice.util.updateQueryData('getQuizzes', undefined, (draft) => {
          const indexToDelete = draft.findIndex((quiz) => quiz.id === id);
          draft.splice(indexToDelete, 1);
        }));
        try {
          const quizzes = await queryFulfilled;
        } catch (err) {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetQuizzesQuery, useGetQuizzesByVideoIdQuery, useGetQuizQuery, useAddQuizMutation, useEditQuizMutation, useDeleteQuizMutation,
} = quizzesApi;
