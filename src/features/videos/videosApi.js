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
    addVideo: builder.mutation({
      query: (data) => ({
        url: '/videos',
        method: 'POST',
        body: data,
      }),
    }),
    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: 'DELETE',
      }),
      // optimistic update
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(apiSlice.util.updateQueryData('getVideos', undefined, (draft) => {
          const indexToDelete = draft.findIndex((video) => video.id === id);
          draft.splice(indexToDelete, 1);
        }));
        try {
          const videos = await queryFulfilled;
        } catch (err) {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetVideosQuery, useGetVideoQuery, useAddVideoMutation, useEditVideoMutation, useDeleteVideoMutation,
} = videosApi;
