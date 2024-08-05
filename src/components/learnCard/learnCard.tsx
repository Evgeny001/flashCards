import { useState } from 'react'

import { Rate } from '@/components/learnCard/rate/rate'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { CardType } from '@/services/deck/deck.types'

import s from './learnCard.module.scss'

type Props = {
  card?: CardType
  deckName?: string
}

export const LearnCard = ({ card, deckName }: Props) => {
  const [show, setShow] = useState(false)

  return (
    <Card className={s.card}>
      <Typography as={'p'} className={s.header} variant={'h1'}>
        Learn {deckName}
      </Typography>

      <div className={s.questionWrapper}>
        <Typography className={s.question} variant={'body1'}>
          <Typography as={'span'} className={s.questionTitle} variant={'subtitle1'}>
            Question
          </Typography>
          : {card?.question}
        </Typography>
        {card?.questionImg && (
          <img alt={'questionImg'} className={s.questionImg} src={card?.questionImg} />
        )}
        <Typography className={s.shots} variant={'body2'}>
          Количество попыток ответов на вопрос: {card?.shots}
        </Typography>
      </div>
      {show ? (
        <div className={s.answerWrapper}>
          <Typography variant={'body1'}>
            <Typography as={'span'} variant={'subtitle1'}>
              Answer
            </Typography>
            : {card?.answer}
          </Typography>

          {card?.answerImg && (
            <img alt={'answerImg'} className={s.answerImg} src={card.answerImg} />
          )}
        </div>
      ) : (
        <Button fullWidth onClick={() => setShow(true)} variant={'primary'}>
          Show answer
        </Button>
      )}
      {show && <Rate onSubmit={() => {}} />}
    </Card>
  )
}
