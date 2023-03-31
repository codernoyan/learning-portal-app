import { apiSlice } from 'features/api/apiSlice';

export const quizzesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: () => ({
        url: '/quizzes',
      }),
    }),
    getQuiz: builder.query({
      query: (id) => ({

      }),
    }),
  }),
});
