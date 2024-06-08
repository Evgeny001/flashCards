import { baseApi } from '@/services/base-api'
import {
  CreateDeckArgs,
  Deck,
  DeckResponse,
  DecksResponce,
  DeleteDeckArgs,
  GetDecksArgs,
  MinMaxDeckResponse,
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
      getDeckById: builder.query<DeckResponse, { id: string }>({
        query: ({ id }) => `v1/decks/${id}`,
      }),
      getDecks: builder.query<DecksResponce, GetDecksArgs | void>({
        providesTags: ['Decks'],
        query: params => ({
          params: params ?? undefined,
          url: `v2/decks`,
        }),
      }),
      getMinMaxCards: builder.query<MinMaxDeckResponse, void>({
        providesTags: ['Decks'],
        query: () => ({
          url: '/v2/decks/min-max-cards',
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
  useGetDeckByIdQuery,
  useGetDecksQuery,
  useGetMinMaxCardsQuery,
  useUpdateDeckMutation,
} = decksService
