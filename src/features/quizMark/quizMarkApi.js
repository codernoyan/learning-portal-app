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
      // pessimistic update for add video
      async onQueryStarted({ data }, { dispatch, queryFulfilled }) {
        try {
          const quizMark = await queryFulfilled;
          if (Object.keys(quizMark.data).length > 1) {
            dispatch(apiSlice.util.updateQueryData('getQuizMarks', undefined, (draft) => {
              draft.push(quizMark.data);
            }));
          }
        } catch (err) {
          // console.log(err);
        }
      },
    }),
  }),
});

export const { useGetQuizMarksQuery, useGetQuizMarkQuery, useAddQuizMarkMutation } = quizMarkApi;
