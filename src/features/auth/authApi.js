import { apiSlice } from 'features/api/apiSlice';
import { userLogin } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: '/register',
        method: 'POST',
        body: data,
      }),
      // update localStorage and redux store with rtk asynchronous function
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: result } = await queryFulfilled;
          // auth information
          const authInfo = {
            accesstoken: result.accesstoken,
            user: result.user,
          };
          // update to localStorage
          localStorage.setItem('auth', JSON.stringify(authInfo));
          // using dispatch to update redux store with auth information
          dispatch(userLogin(authInfo));
        } catch (err) {
          // nothing to do here
          // console.log(err?.message);
        }
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data,
      }),
      // update localStorage and redux store with rtk asynchronous function
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: result } = await queryFulfilled;
          // auth information
          const authInfo = {
            accesstoken: result.accesstoken,
            user: result.user,
          };
          // update to localStorage
          localStorage.setItem('auth', JSON.stringify(authInfo));
          // using dispatch to update redux store with auth information
          dispatch(userLogin(authInfo));
        } catch (err) {
          // nothing to do here
          // console.log(err?.message);
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
