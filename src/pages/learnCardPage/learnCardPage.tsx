import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { BackToPage } from '@/components/backToPage/backToPage'
import { LearnCard } from '@/components/learnCard/learnCard'
import { Grade } from '@/components/learnCard/rate/rate'
import { Loader } from '@/components/ui/loader'
import { PageContainer } from '@/pages/pageContainer/pageContainer'
import {
  useGetDeckByIdQuery,
  useGetRandomCardQuery,
  useSaveGradeCardMutation,
} from '@/services/deck/deck.services'

// import s from './learnCardPage.module.scss'

export const LearnCardPage = () => {
  const { deckId } = useParams()
  const { data: deckData, isLoading: isLoadingDeck } = useGetDeckByIdQuery({ id: deckId || '' })
  const { data: cardData, isLoading: isLoadingCard } = useGetRandomCardQuery({ id: deckId ?? '' })

  const [saveGrade] = useSaveGradeCardMutation()

  const [show, setShow] = useState(false)

  const handleSaveGrade = async (data: Grade) => {
    const gradeNumber = Number(data.grade)

    try {
      await saveGrade({
        args: { cardId: cardData?.id ?? '', grade: gradeNumber },
        id: deckId ?? '',
      }).unwrap()
    } catch (error) {
      console.log(error)
    } finally {
      setShow(false)
    }
  }

  if (isLoadingCard || isLoadingDeck) {
    return <Loader />
  }

  return (
    <PageContainer mt={'24px'}>
      <BackToPage text={'Back to Decks List'} />
      <LearnCard
        card={cardData}
        deckName={deckData?.name}
        key={deckData?.id}
        onSubmit={handleSaveGrade}
        setShow={setShow}
        show={show}
      />
    </PageContainer>
  )
}
