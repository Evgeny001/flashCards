import { DecksResponce, GetDecksArgs } from '@/services/decks.types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const flashcardsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.flashcards.andrii.es',
    credentials: 'include',
    prepareHeaders: headers => {
      headers.append('x-auth-skip', 'true')
    },
  }),
  endpoints: builder => {
    return {
      getDecks: builder.query<DecksResponce, GetDecksArgs | void>({
        query: params => ({
          params: params ?? undefined,
          url: `v2/decks`,
        }),
      }),
    }
  },
  reducerPath: 'flashcardsApi',
})

export const { useGetDecksQuery } = flashcardsApi
