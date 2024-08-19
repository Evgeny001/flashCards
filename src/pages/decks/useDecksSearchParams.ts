import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Sort } from '@/components/ui/table'

export const useDecksSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const minCards = Number(searchParams.get('minCards')) || 0
  const maxCards = Number(searchParams.get('maxCards')) || 50
  const currentPage = Number(searchParams.get('currentPage')) || 1
  const search = searchParams.get('search')
  const itemsPerPage = Number(searchParams.get('itemsPerPage')) || 5
  const sortKey = searchParams.get('sortKey') || null
  const sortDirection = searchParams.get('sortDirection') || null

  const [rangeValue, setRangeValue] = useState<number[]>([minCards, maxCards])

  const changeMinMaxCard = (values: number[]) => {
    if (values[0] !== 0 || values[1] !== 50) {
      searchParams.set('minCards', values[0].toString())
      searchParams.set('maxCards', values[1].toString())
    } else {
      searchParams.delete('minCards')
      searchParams.delete('maxCards')
    }
    setRangeValue(values)
    setSearchParams(searchParams)
  }

  const changePage = (currentPage: number) => {
    searchParams.set('currentPage', currentPage.toString())
    if (currentPage === 1) {
      searchParams.delete('currentPage')
    }
    setSearchParams(searchParams)
  }

  const changeSearchValue = (search: string) => {
    if (search) {
      searchParams.set('search', search)
    } else {
      searchParams.delete('search')
    }
    searchParams.set('currentPage', '1')
    setSearchParams(searchParams)
  }

  const changeItemsPerPage = (itemsPerPage: string) => {
    searchParams.set('itemsPerPage', itemsPerPage)
    searchParams.set('currentPage', '1')
    if (itemsPerPage === '5') {
      searchParams.delete('itemsPerPage')
    }
    setSearchParams(searchParams)
  }

  const changeSort = (sort: Sort) => {
    if (sort === null) {
      searchParams.delete('sortKey')
      searchParams.delete('sortDirection')
    } else {
      searchParams.set('sortKey', sort.key)
      searchParams.set('sortDirection', sort.direction)
    }
    setSearchParams(searchParams)
  }

  const sort: Sort =
    sortDirection === null || sortKey === null
      ? null
      : {
          direction: sortDirection as 'asc' | 'desc',
          key: sortKey,
        }

  return {
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
  }
}
