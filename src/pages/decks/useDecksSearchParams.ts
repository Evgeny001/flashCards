import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const useDecksSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const minCards = Number(searchParams.get('minCards')) || 0
  const maxCards = Number(searchParams.get('maxCards')) || 50

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

  return {
    changeMinMaxCard,
    maxCards,
    minCards,
    rangeValue,
  }
}
