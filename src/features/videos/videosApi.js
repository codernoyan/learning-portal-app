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
      // pessimistic update for add video
      async onQueryStarted({ data }, { dispatch, queryFulfilled }) {
        try {
          const videoData = await queryFulfilled;
          if (Object.keys(videoData.data).length > 1) {
            dispatch(apiSlice.util.updateQueryData('getVideos', undefined, (draft) => {
              draft.push(videoData.data);
            }));
          }
        } catch (err) {
          // console.log(err);
        }
      },
    }),
    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: 'PATCH',
        body: data,
      }),
      // pessimistic update
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedVideoData } = await queryFulfilled;
          dispatch(apiSlice.util.updateQueryData('getVideos', undefined, (draft) => {
            const indexToUpdate = draft?.findIndex((video) => video.id === id);
            draft[indexToUpdate] = { ...updatedVideoData };
          }));
          // silently update a single video data
          dispatch(apiSlice.util.updateQueryData('getVideo', id, (draft) => updatedVideoData));
        } catch (err) {
          // console.error(err);
        }
      },
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
