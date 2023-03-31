import { apiSlice } from 'features/api/apiSlice';

export const quizMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizMarks: builder.query({
      query: () => ({
        url: '/quizMark',
      }),
    }),
    getQuizMark: builder.query({
      query: (studentId) => ({
        url: `/quizMark?student_id_like=${studentId}`,
      }),
    }),
  }),
});

export const { useGetQuizMarksQuery, useGetQuizMarkQuery } = quizMarkApi;
