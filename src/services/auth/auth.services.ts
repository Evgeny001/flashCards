import { UserResponce } from '@/services/auth/auth.types'
import { baseApi } from '@/services/base-api'

export const authService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMe: builder.query<UserResponce | undefined, void>({
      providesTags: ['Me'],
      query: () => ({
        url: `/v1/auth/me`,
      }),
    }),
  }),
})

export const { useGetMeQuery } = authService
