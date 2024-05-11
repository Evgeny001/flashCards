import { ComponentPropsWithoutRef } from 'react'

import { Star } from '@/assets/icons/Star'
import { StarOutline } from '@/assets/icons/StarOutline'
import clsx from 'clsx'

import s from './rating.module.scss'

type Props = {
  maxRating?: number
  rating: number
} & ComponentPropsWithoutRef<'div'>

export const Rating = ({ className, maxRating = 5, rating, ...rest }: Props) => {
  const starsNums = [...Array.from({ length: maxRating })].map((_, idx) => idx + 1)

  return (
    <div className={clsx(s.wrapperRating, className)} {...rest}>
      {starsNums.map((num, idx) => {
        return rating >= num ? <Star key={idx} /> : <StarOutline key={idx} />
      })}
    </div>
  )
}
