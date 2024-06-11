import { baseApi } from '@/services/base-api'
import { DeckResponse } from '@/services/deck/deck.types'

export const decksService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDeckById: builder.query<DeckResponse, { id: string }>({
        query: ({ id }) => `v1/decks/${id}`,
      }),
    }
  },
})

export const { useGetDeckByIdQuery } = decksService
