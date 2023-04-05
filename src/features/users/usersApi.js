import { apiSlice } from 'features/api/apiSlice';

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: '/users?role_ne=admin',
      }),
    }),
    getAdminInfo: builder.query({
      query: () => ({
        url: '/users?role_like=admin',
      }),
    }),
    getUser: builder.query({
      query: (email) => ({
        url: `/users/${email}`,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery, useGetAdminInfoQuery } = usersApi;
