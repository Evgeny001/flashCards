import {
  CreateNewPasswordArgs,
  LoginArgs,
  LoginResponse,
  RecoverPasswordArgs,
  SingUpArgs,
  SingUpResponse,
  UserResponse,
} from '@/services/auth/auth.types'
import { baseApi } from '@/services/base-api'

export const authService = baseApi.injectEndpoints({
  endpoints: builder => ({
    createNewPassword: builder.mutation<void, CreateNewPasswordArgs>({
      query: ({ token, ...args }) => ({
        body: args,
        method: 'POST',
        url: `/v1/auth/reset-password/${token}`,
      }),
    }),
    getMe: builder.query<UserResponse | undefined, void>({
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
    recoverPassword: builder.mutation<void, RecoverPasswordArgs>({
      query: args => ({
        body: args,
        method: 'POST',
        url: '/v1/auth/recover-password',
      }),
    }),
    // }),
    signUp: builder.mutation<SingUpResponse, SingUpArgs>({
      query: body => ({
        body: body,
        method: 'POST',
        url: `/v1/auth/sign-up`,
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
    updateProfile: builder.mutation<UserResponse, any>({
      invalidatesTags: (_, error) => (error ? [] : ['Me']),
      // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //   const updateResult = dispatch(
      //     authService.util.updateQueryData('getMe', undefined, draft => {
      //       const name = arg.get('name')
      //       const avatar = arg.get('avatar')
      //
      //       if (avatar instanceof File) {
      //         draft.avatar = URL.createObjectURL(avatar)
      //       }
      //       if (typeof name === 'string') {
      //         draft.name = name
      //       }
      //     })
      //   )
      //
      //   try {
      //     await queryFulfilled
      //   } catch {
      //     updateResult.undo()
      //   }
      // },
      query: body => {
        const { avatar, name } = body

        const formData = new FormData()

        if (avatar) {
          formData.append('avatar', avatar)
        }
        if (name) {
          formData.append('name', name)
        }

        return { body: formData, method: 'PATCH', url: '/v1/auth/me' }
      },
    }),
  }),
})

export const {
  useCreateNewPasswordMutation,
  useGetMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useRecoverPasswordMutation,
  useSignUpMutation,
  useUpdateProfileMutation,
} = authService
