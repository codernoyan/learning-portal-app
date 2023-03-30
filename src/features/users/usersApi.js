import { apiSlice } from 'features/api/apiSlice';

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: '/users',
      }),
    }),
    getUser: builder.query({
      query: (email) => ({
        url: `/users/${email}`,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery } = usersApi;
