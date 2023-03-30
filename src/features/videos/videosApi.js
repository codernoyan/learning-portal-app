import { apiSlice } from 'features/api/apiSlice';

export const videosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => ({
        url: '/videos',
      }),
    }),
    getVideo: builder.query({
      query: (id) => ({
        url: `/videos/${id}`,
      }),
    }),
    addVideo: builder.query({
      query: (data) => ({
        url: '/videos',
        method: 'POST',
        body: data,
      }),
    }),
    editVideo: builder.query({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteVideo: builder.query({
      query: (id) => ({
        url: `/videos/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});
