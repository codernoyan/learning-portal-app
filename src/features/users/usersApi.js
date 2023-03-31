import { apiSlice } from 'features/api/apiSlice';

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (email) => ({
        url: `/users?role_ne=admin&email_ne=${email}`,
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
