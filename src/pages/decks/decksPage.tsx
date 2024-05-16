import { useState } from 'react'
import { Link } from 'react-router-dom'

import { DecksTable } from '@/components/decks/decks-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useUpdateDeckMutation,
} from '@/services/decks/decks.services'

export function DecksPage() {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const { data, error, isError, isLoading } = useGetDecksQuery({
    currentPage: currentPage,
    itemsPerPage: 20,
    maxCardsCount: 10,
    minCardsCount: 0,
    name: search,
  })

  const [createDeck, { isLoading: isDeckBeingCreated }] = useCreateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>{JSON.stringify(error)}</div>
  }

  const handleDeleteClick = (id: string) => {
    deleteDeck({ id })
  }

  return (
    <div>
      <Link to={'/login'}>login</Link>
      <Input onChangeValue={setSearch} value={search} />
      <Button
        onClick={() =>
          updateDeck({
            id: 'clw89frlx02aho1015fc9zkrx',
            name: 'new name',
          })
        }
      >
        updateDeck
      </Button>
      <Button
        disabled={isDeckBeingCreated}
        onClick={() =>
          createDeck({
            name: 'ololo',
          })
        }
      >
        create deck
      </Button>
      <Button
        onClick={() => {
          setCurrentPage(v => (v < 1 ? 1 : v - 1))
        }}
      >
        -
      </Button>
      <Button
        onClick={() => {
          setCurrentPage(v => v + 1)
        }}
      >
        +
      </Button>
      <DecksTable
        decks={data?.items.map(deck => ({
          cardsCount: deck.cardsCount,
          createdBy: deck.author.name,
          id: deck.id,
          lastUpdated: deck.updated,
          name: deck.name,
        }))}
        onDeleteClick={handleDeleteClick}
      />
    </div>
  )
}
