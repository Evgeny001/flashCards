import { baseApi } from '@/services/base-api'
import { CardType, DeckResponse } from '@/services/deck/deck.types'

export const decksService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDeckById: builder.query<DeckResponse, { id: string }>({
        query: ({ id }) => `v1/decks/${id}`,
      }),
      getRandomCard: builder.query<CardType, { id: string }>({
        providesTags: ['Deck'],
        query: ({ id }) => ({
          url: `/v1/decks/${id}/learn`,
        }),
      }),
    }
  },
})

export const { useGetDeckByIdQuery, useGetRandomCardQuery } = decksService
