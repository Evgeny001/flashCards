import { useState } from 'react'
import { toast } from 'react-toastify'

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
import { useDecksSearchParams } from '@/pages/decks/useDecksSearchParams'
import { PageContainer } from '@/pages/pageContainer/pageContainer'
import { useGetMeQuery } from '@/services/auth/auth.services'
import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useGetMinMaxCardsQuery,
  useUpdateDeckMutation,
} from '@/services/decks/decks.services'
import { ErrorResponse, UpdateDeckErrorResponse } from '@/services/decks/decks.types'

import s from './decksPage.module.scss'

export function DecksPage() {
  const { data: me } = useGetMeQuery()

  const [showCreateNewDeckDialog, setShowCreateNewDeckDialog] = useState(false)
  const [deckToDeleteId, setDeckToDeleteId] = useState<null | string>(null)
  const [deckToEditId, setDeckToEditId] = useState<null | string>(null)

  const showEditDeckDialog = !!deckToEditId

  const [tabValue, setTabValue] = useState('All Cards')

  const currentUserId = me?.id
  const authorId = tabValue === 'My Cards' ? currentUserId : undefined

  const {
    changeItemsPerPage,
    changeMinMaxCard,
    changePage,
    changeSearchValue,
    changeSort,
    currentPage,
    itemsPerPage,
    maxCards,
    minCards,
    rangeValue,
    search,
    sort,
  } = useDecksSearchParams()

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
    maxCardsCount: maxCards,
    minCardsCount: minCards,
    name: search ?? '',
    orderBy: sort ? `${sort.key}-${sort.direction}` : undefined,
  })

  const clearFilter = () => {
    changeSearchValue('')
    setTabValue('All Cards')
    changeMinMaxCard([0, minMaxData?.max ?? 50])
  }

  const decks = decksCurrentData ?? decksData

  const deckToDeleteName = decks?.items?.find(deck => deck.id === deckToDeleteId)?.name

  const deckToEdit = decks?.items?.find(deck => deck.id === deckToEditId)

  const [createDeck] = useCreateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()

  const { data: minMaxData } = useGetMinMaxCardsQuery()

  const handleDeleteClick = (id: string) => {
    setDeckToDeleteId(id)
  }

  const handleEditClick = (id: string) => {
    setDeckToEditId(id)
  }

  const onCreateNewDeck = () => {
    setShowCreateNewDeckDialog(true)
  }

  const onConfirmEditDeck = async (data: FormValues) => {
    if (deckToEditId) {
      const updateDeckPromise = updateDeck({ id: deckToEditId, ...data }).unwrap()

      await toast.promise(updateDeckPromise, {
        error: {
          render({ data }) {
            const errorData = data as UpdateDeckErrorResponse

            return `Error: ${errorData.data.errorMessages[0].message ?? 'unable to update deck'}`
          },
        },
        success: {
          render({ data }) {
            return `deck ${data.name} updated successfully.`
          },
        },
      })
    }
  }

  const onConfirmDeleteDeck = async () => {
    const deleteDeckPromise = deleteDeck({ id: deckToDeleteId ?? '' }).unwrap()

    setDeckToDeleteId(null)

    await toast.promise(deleteDeckPromise, {
      error: {
        render({ data }) {
          const errorData = data as ErrorResponse

          return `Error: ${errorData.data.message ?? 'unable to delete deck'}`
        },
      },
      success: {
        render({ data }) {
          return `deck ${data.name} deleted successfully.`
        },
      },
    })
  }

  const onConfirmCreateDeck = async (data: FormValues) => {
    const createDeckPromise = createDeck(data).unwrap()

    await toast.promise(createDeckPromise, {
      error: {
        render({ data }) {
          const errorData = data as UpdateDeckErrorResponse

          return `Error: ${errorData.data.errorMessages[0].message ?? 'unable to create deck'}`
        },
      },
      success: {
        render({ data }) {
          return `deck ${data.name} created successfully.`
        },
      },
    })
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
        onConfirm={onConfirmDeleteDeck}
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
        <Input onChangeValue={changeSearchValue} type={'search'} value={search ?? ''} />
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
          onValueChange={changeMinMaxCard}
          value={rangeValue}
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
          onSort={changeSort}
          sort={sort}
        />
      </div>

      <div className={s.paginationWrapper}>
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onChangePage={changePage}
          onPerPageChange={value => changeItemsPerPage(value)}
          perPageOptions={['5', '10', '20', '50']}
          totalCount={decks?.pagination.totalPages ?? 0}
        />
      </div>
    </PageContainer>
  )
}
