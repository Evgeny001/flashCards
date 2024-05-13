import { DecksTable } from '@/components/decks/decks-table'
import { useGetDecksQuery } from '@/services/flashcards-api'

export function DecksPage() {
  const { data, error, isError, isLoading } = useGetDecksQuery({
    currentPage: 1,
    itemsPerPage: 20,
    maxCardsCount: 10,
    minCardsCount: 1,
    name: 'js',
  })

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>{JSON.stringify(error)}</div>
  }

  return (
    <div>
      <DecksTable
        decks={data?.items.map(deck => ({
          cardsCount: deck.cardsCount,
          createdBy: deck.author.name,
          id: deck.id,
          lastUpdated: deck.updated,
          name: deck.name,
        }))}
      />
    </div>
  )
}
