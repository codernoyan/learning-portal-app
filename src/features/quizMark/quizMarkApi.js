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
    addQuizMark: builder.mutation({
      query: (data) => ({
        url: '/quizMark',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useGetQuizMarksQuery, useGetQuizMarkQuery } = quizMarkApi;
