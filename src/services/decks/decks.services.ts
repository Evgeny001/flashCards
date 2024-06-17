import { baseApi } from '@/services/base-api'
import {
  CreateDeckArgs,
  Deck,
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
        async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
          const invalidateBy = decksService.util.selectInvalidatedBy(getState(), [
            { type: 'Decks' },
          ])
          //const patchResults: any[] = []

          try {
            const { data } = await queryFulfilled

            invalidateBy.forEach(({ originalArgs }) => {
              //patchResults.push(
              dispatch(
                decksService.util.updateQueryData('getDecks', originalArgs, draft => {
                  //console.log(current(draft))
                  // const itemToUpdateIndex = draft.items.findIndex(deck => deck.id === id)
                  //
                  // if (itemToUpdateIndex === -1) {
                  //   return
                  // }
                  // Object.assign(draft.items[itemToUpdateIndex], args)
                  if (originalArgs.currentPage !== 1) {
                    return
                  }
                  draft.items.unshift(data)
                  //draft.items.pop()
                })
              )
              //)
            })
            console.log(invalidateBy)
          } catch (e) {
            // patchResults.forEach(patchResult => {
            //   patchResult.undo()
            // })
            console.log(e)
          }
        },
        query: body => {
          const { cover, isPrivate, name } = body

          const formData = new FormData()

          formData.append('name', name)

          if (isPrivate) {
            formData.append('isPrivate', isPrivate.toString())
          }

          if (cover) {
            formData.append('cover', cover)
          }

          return {
            body: formData,
            method: 'POST',
            url: `v1/decks`,
          }
        },
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
      getMinMaxCards: builder.query<MinMaxDeckResponse, void>({
        providesTags: ['Decks'],
        query: () => ({
          url: '/v2/decks/min-max-cards',
        }),
      }),
      updateDeck: builder.mutation<Deck, updateDecksArgs>({
        invalidatesTags: ['Decks'],
        async onQueryStarted({ cover, id, ...args }, { dispatch, getState, queryFulfilled }) {
          const invalidateBy = decksService.util.selectInvalidatedBy(getState(), [
            { type: 'Decks' },
          ])
          const patchResults: any[] = []

          invalidateBy.forEach(({ originalArgs }) => {
            patchResults.push(
              dispatch(
                decksService.util.updateQueryData('getDecks', originalArgs, draft => {
                  //console.log(current(draft))
                  const itemToUpdateIndex = draft.items.findIndex(deck => deck.id === id)

                  if (itemToUpdateIndex === -1) {
                    return
                  }
                  Object.assign(draft.items[itemToUpdateIndex], args)
                })
              )
            )
          })
          console.log(invalidateBy)

          try {
            await queryFulfilled
          } catch (e) {
            patchResults.forEach(patchResult => {
              patchResult.undo()
            })
          }
        },
        query: ({ cover, id, isPrivate, name }) => {
          const formData = new FormData()

          if (name) {
            formData.append('name', name)
          }
          if (isPrivate) {
            formData.append('isPrivate', isPrivate.toString())
          }
          if (cover) {
            formData.append('cover', cover)
          } else if (cover === null) {
            formData.append('cover', '')
          }

          return {
            body: formData,
            method: 'PATCH',
            url: `v1/decks/${id}`,
          }
        },
      }),
    }
  },
})

export const {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useGetMinMaxCardsQuery,
  useUpdateDeckMutation,
} = decksService
