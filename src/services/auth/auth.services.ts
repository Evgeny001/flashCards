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
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled

        if (!data) {
          return
        }

        localStorage.setItem('accessToken', data.accessToken)
        localStorage.setItem('refreshToken', data.refreshToken)
      },
      query: body => ({
        body,
        method: 'POST',
        url: '/v1/auth/login',
      }),
    }),
  }),
})

export const { useGetMeQuery, useLoginMutation } = authService
