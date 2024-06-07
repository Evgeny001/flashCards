import { useEffect, useState } from 'react'

import { TrashOutline } from '@/assets/icons/TrashOutline'
import { DecksTable } from '@/components/decks/decks-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Pagination } from '@/components/ui/pagination'
import { Slider } from '@/components/ui/slider'
import { Tabs } from '@/components/ui/tabs'
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
  const { data: minMaxData } = useGetMinMaxCardsQuery()

  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [minSlider, setMinSlider] = useState(0)
  const [maxSlider, setMaxSlider] = useState(50)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [tabValue, setTabValue] = useState('All Cards')

  const { data: me } = useGetMeQuery()

  const currentUserId = me?.id

  const authorId = tabValue === 'My Cards' ? currentUserId : undefined

  const { data, error, isError, isLoading } = useGetDecksQuery({
    authorId,
    currentPage: currentPage,
    itemsPerPage: itemsPerPage,
    maxCardsCount: maxSlider,
    minCardsCount: minSlider,
    name: search,
  })

  const [createDeck, { isLoading: isDeckBeingCreated }] = useCreateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()

  useEffect(() => {
    if (minMaxData) {
      setMaxSlider(minMaxData.max)
    }
  }, [minMaxData])

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>{JSON.stringify(error)}</div>
  }

  const handleDeleteClick = (id: string) => {
    deleteDeck({ id })
  }

  const handleEditClick = (id: string) => {
    console.log(id)
    // TODO: edit card
  }

  const clearFilter = () => {
    setSearch('')
    setTabValue('All Cards')
    setMinSlider(minMaxData?.min ?? 0)
    setMaxSlider(minMaxData?.max ?? 50)
  }

  return (
    <PageContainer>
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
          decks={data?.items}
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
          totalCount={data?.pagination.totalPages ?? 0}
        />
      </div>
      <div className={s.controlPanel}>
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
      </div>
    </PageContainer>
  )
}
