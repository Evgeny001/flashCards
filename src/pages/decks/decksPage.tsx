import { useState } from 'react'
import { Link } from 'react-router-dom'

import { TrashOutline } from '@/assets/icons/TrashOutline'
import { DecksTable } from '@/components/decks/decks-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Pagination } from '@/components/ui/pagination'
import { Slider } from '@/components/ui/slider'
import { Tabs } from '@/components/ui/tabs'
import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useUpdateDeckMutation,
} from '@/services/decks/decks.services'

import s from './decksPage.module.scss'

export function DecksPage() {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [minSlider, setMinSlider] = useState(0)
  const [maxSlider, setMaxSlider] = useState(50)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [tabValue, setTabValue] = useState('All Cards')

  const authorId = tabValue === 'My Cards' ? 'f2be95b9-4d07-4751-a775-bd612fc9553a' : undefined

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
    <div className={s.wrapper}>
      <div>
        <Link to={'/login'}>login</Link>
      </div>

      <div className={s.controlPanel}>
        <Input onChangeValue={setSearch} value={search} />
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
          onValueChange={value => {
            setMinSlider(value[0])
            setMaxSlider(value[1])
          }}
          value={[minSlider, maxSlider]}
        />
        <Button variant={'secondary'}>
          <TrashOutline />
          Clear Filter
        </Button>
      </div>
      <div>
        <DecksTable decks={data?.items} onDeleteClick={handleDeleteClick} />
      </div>

      <div className={s.paginationWrapper}>
        <Pagination
          currentPage={currentPage}
          onChangePage={setCurrentPage}
          onPerPageChange={value => setItemsPerPage(+value)}
          perPageOptions={['5', '10', '20', '50']}
          totalCount={50}
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
    </div>
  )
}
