import { baseApi } from '@/services/base-api'
import {
  CreateDeckArgs,
  Deck,
  DecksResponce,
  DeleteDeckArgs,
  GetDecksArgs,
  updateDecksArgs,
} from '@/services/decks/decks.types'

export const decksService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createDeck: builder.mutation<Deck, CreateDeckArgs>({
        invalidatesTags: ['Decks'],
        query: args => ({
          body: args,
          method: 'POST',
          url: 'v1/decks',
        }),
      }),
      deleteDeck: builder.mutation<Deck, DeleteDeckArgs>({
        invalidatesTags: ['Decks'],
        query: args => ({
          method: 'DELETE',
          url: `v1/decks/${args.id}`,
        }),
      }),
      getDecks: builder.query<DecksResponce, GetDecksArgs | void>({
        providesTags: ['Decks'],
        query: params => ({
          params: params ?? undefined,
          url: `v2/decks`,
        }),
      }),
      updateDeck: builder.mutation<Deck, updateDecksArgs>({
        invalidatesTags: ['Decks'],
        query: ({ id, ...args }) => ({
          body: args,
          method: 'PATCH',
          url: `v1/decks/${id}`,
        }),
      }),
    }
  },
})

export const {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useUpdateDeckMutation,
} = decksService
