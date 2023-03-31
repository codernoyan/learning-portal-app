import { apiSlice } from 'features/api/apiSlice';

export const quizMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizMark: builder.query({
      query: (studentId) => ({
        url: `/quizMark?student_id_like=${studentId}`,
      }),
    }),
  }),
});

export const { useGetQuizMarkQuery } = quizMarkApi;
