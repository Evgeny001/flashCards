import { useParams } from 'react-router-dom'

import { BackToPage } from '@/components/backToPage/backToPage'
import { LearnCard } from '@/components/learnCard/learnCard'
import { Loader } from '@/components/ui/loader'
import { PageContainer } from '@/pages/pageContainer/pageContainer'
import { useGetDeckByIdQuery, useGetRandomCardQuery } from '@/services/deck/deck.services'

// import s from './learnCardPage.module.scss'

export const LearnCardPage = () => {
  const { deckId } = useParams()
  const { data: deckData, isLoading: isLoadingDeck } = useGetDeckByIdQuery({ id: deckId || '' })
  const { data: cardData, isLoading: isLoadingCard } = useGetRandomCardQuery({ id: deckId ?? '' })

  if (isLoadingCard || isLoadingDeck) {
    return <Loader />
  }

  return (
    <PageContainer mt={'24px'}>
      <BackToPage text={'Back to Decks List'} />
      <LearnCard card={cardData} deckName={deckData?.name} key={deckData?.id} />
    </PageContainer>
  )
}
