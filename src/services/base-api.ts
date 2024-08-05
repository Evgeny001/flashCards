import { baseQueryWithReauth } from '@/services/flashcards-base-query'
import { createApi } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  //({
  //  baseUrl: 'https://api.flashcards.andrii.es',
  //  credentials: 'include',
  // prepareHeaders: headers => {
  //   headers.append('x-auth-skip', 'true')
  // },
  // ========= tokens ==========
  // prepareHeaders: headers => {
  //   const token = localStorage.getItem('accessToken')
  //
  //   if (headers.get('Authorization')) {
  //     return headers
  //   }
  //
  //   if (token) {
  //     headers.set('Authorization', `Bearer ${token}`)
  //   }
  // },
  // ============================
  //}),
  endpoints: () => ({}),
  reducerPath: 'baseApi',
  tagTypes: ['Decks', 'Me', 'Deck'],
})
