import { LoginArgs, LoginResponse, UserResponce } from '@/services/auth/auth.types'
import { baseApi } from '@/services/base-api'

export const authService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMe: builder.query<UserResponce | undefined, void>({
      providesTags: ['Me'],
      query: () => ({
        url: `/v1/auth/me`,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginArgs>({
      invalidatesTags: ['Me'],
      // async onQueryStarted(_, { queryFulfilled }) {
      //   const { data } = await queryFulfilled
      //
      //   if (!data) {
      //     return
      //   }
      //
      //   localStorage.setItem('accessToken', data.accessToken)
      //   localStorage.setItem('refreshToken', data.refreshToken)
      // },
      query: body => ({
        body,
        method: 'POST',
        url: '/v1/auth/login',
      }),
    }),
    logout: builder.mutation<void, void>({
      invalidatesTags: ['Me'],
      query: () => ({
        method: 'POST',
        url: '/v1/auth/logout',
      }),
    }),
    // logout: builder.mutation<LogoutResponse, void>({
    //   async onQueryStarted(_, { dispatch, queryFulfilled }) {
    //     const { data } = await queryFulfilled
    //
    //     console.log(data)
    //
    //     if (!data) {
    //       return
    //     }
    //
    //     localStorage.removeItem('accessToken')
    //     localStorage.removeItem('refreshToken')
    //
    //     dispatch(authService.util.resetApiState())
    //     dispatch(authService.util.invalidateTags(['Me']))
    //   },
    //   query: () => ({ method: 'POST', url: 'v2/auth/logout' }),
    // }),
  }),
})

export const { useGetMeQuery, useLoginMutation, useLogoutMutation } = authService
