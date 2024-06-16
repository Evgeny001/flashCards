import { useEffect, useState } from 'react'

import { TrashOutline } from '@/assets/icons/TrashOutline'
import { DeckDialog, FormValues } from '@/components/decks/DeckDialog/deckDialog'
import { DecksTable } from '@/components/decks/decks-table'
import { DeleteDeckDialog } from '@/components/decks/deleteDeckDialog/deleteDeckDialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader } from '@/components/ui/loader'
import { Pagination } from '@/components/ui/pagination'
import { Slider } from '@/components/ui/slider'
import { Tabs } from '@/components/ui/tabs'
import { Typography } from '@/components/ui/typography'
import { PageContainer } from '@/pages/pageContainer/pageContainer'
import { useGetMeQuery } from '@/services/auth/auth.services'
import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useGetMinMaxCardsQuery,
  useUpdateDeckMutation,
} from '@/services/decks/decks.services'

import s from './decksPage.module.scss'

export function DecksPage() {
  const { data: me } = useGetMeQuery()

  const [showCreateNewDeckDialog, setShowCreateNewDeckDialog] = useState(false)
  const [deckToDeleteId, setDeckToDeleteId] = useState<null | string>(null)
  const [deckToEditId, setDeckToEditId] = useState<null | string>(null)

  const showEditDeckDialog = !!deckToEditId

  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [minSlider, setMinSlider] = useState(0)
  const [maxSlider, setMaxSlider] = useState(50)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [tabValue, setTabValue] = useState('All Cards')

  const currentUserId = me?.id
  const authorId = tabValue === 'My Cards' ? currentUserId : undefined

  const {
    currentData: decksCurrentData,
    data: decksData,
    error,
    isError,
    isLoading,
  } = useGetDecksQuery({
    authorId,
    currentPage: currentPage,
    itemsPerPage: itemsPerPage,
    maxCardsCount: maxSlider,
    minCardsCount: minSlider,
    name: search,
  })

  const clearFilter = () => {
    setSearch('')
    setTabValue('All Cards')
    setMinSlider(minMaxData?.min ?? 0)
    setMaxSlider(minMaxData?.max ?? 50)
  }

  const decks = decksCurrentData ?? decksData

  const deckToDeleteName = decks?.items?.find(deck => deck.id === deckToDeleteId)?.name

  const deckToEdit = decks?.items?.find(deck => deck.id === deckToEditId)

  const [createDeck] = useCreateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()

  //////

  const { data: minMaxData } = useGetMinMaxCardsQuery()

  useEffect(() => {
    if (minMaxData) {
      setMaxSlider(minMaxData.max)
    }
  }, [minMaxData])

  const handleDeleteClick = (id: string) => {
    setDeckToDeleteId(id)
  }

  const handleEditClick = (id: string) => {
    setDeckToEditId(id)
  }

  const onCreateNewDeck = () => {
    setShowCreateNewDeckDialog(true)
  }

  const onConfirmEditDeck = (data: FormValues) => {
    if (deckToEditId) {
      updateDeck({ id: deckToEditId, ...data })
    }
  }

  const onConfirmCreateDeck = (data: FormValues) => {
    createDeck(data)
  }

  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <div>{JSON.stringify(error)}</div>
  }

  return (
    <PageContainer>
      <DeckDialog
        confirmText={'Add new deck'}
        onCancel={() => setShowCreateNewDeckDialog(false)}
        onConfirm={onConfirmCreateDeck}
        onOpenChange={setShowCreateNewDeckDialog}
        open={showCreateNewDeckDialog}
        title={'Create new deck'}
      />
      <DeckDialog
        confirmText={'Confirm changes'}
        defaultValues={deckToEdit}
        key={deckToEditId}
        onCancel={() => setDeckToEditId(null)}
        onConfirm={onConfirmEditDeck}
        onOpenChange={() => setDeckToEditId(null)}
        open={showEditDeckDialog}
        title={'Edit deck ' + deckToEdit?.name}
      />
      <DeleteDeckDialog
        deckName={deckToDeleteName ?? 'Selected deck'}
        onCancel={() => setDeckToDeleteId(null)}
        onConfirm={() => {
          deleteDeck({ id: deckToDeleteId ?? '' })
          setDeckToDeleteId(null)
        }}
        onOpenChange={() => setDeckToDeleteId(null)}
        open={!!deckToDeleteId}
      />
      <div className={s.header}>
        <Typography variant={'h1'}>Decks List</Typography>
        <Button onClick={onCreateNewDeck} variant={'primary'}>
          Add New Deck
        </Button>
      </div>
      <div className={s.controlPanel}>
        <Input onChangeValue={setSearch} type={'search'} value={search} />
        <Tabs
          className={s.tabs}
          onValueChange={value => setTabValue(value)}
          tabs={[
            { disabled: false, value: 'My Cards' },
            { disabled: false, value: 'All Cards' },
          ]}
          title={'Show decks cards'}
          value={tabValue}
        />
        <Slider
          max={minMaxData?.max ?? 50}
          min={minMaxData?.min ?? 0}
          onValueChange={value => {
            setMinSlider(value[0])
            setMaxSlider(value[1])
          }}
          value={[minSlider, maxSlider]}
        />
        <Button onClick={clearFilter} variant={'secondary'}>
          <TrashOutline />
          Clear Filter
        </Button>
      </div>
      <div>
        <DecksTable
          currentUserId={currentUserId ?? ''}
          decks={decks?.items}
          onDeleteClick={handleDeleteClick}
          onEditClick={handleEditClick}
        />
      </div>

      <div className={s.paginationWrapper}>
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onChangePage={setCurrentPage}
          onPerPageChange={value => setItemsPerPage(+value)}
          perPageOptions={['5', '10', '20', '50']}
          totalCount={decks?.pagination.totalPages ?? 0}
        />
      </div>
    </PageContainer>
  )
}
