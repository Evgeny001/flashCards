import { useParams } from 'react-router-dom'

import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { PageContainer } from '@/pages/pageContainer/pageContainer'
import { useGetDeckByIdQuery } from '@/services/decks/decks.services'

import s from './learnPage.module.scss'
export const LearnPage = () => {
  const { deckId } = useParams()
  const { data: deckData } = useGetDeckByIdQuery({ id: deckId || '' })

  return (
    <PageContainer mt={'84px'}>
      <Card className={s.card}>
        <Typography className={s.header} variant={'h1'}>
          <span>Learn {deckData?.name} 123</span>
        </Typography>
        <div className={s.header}>
          <span className={s.header}>123</span>
          <span className={s.header}>123</span>
        </div>
      </Card>
    </PageContainer>
  )
}
