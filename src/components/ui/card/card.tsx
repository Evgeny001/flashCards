import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './card.module.scss'
export type CardProps = {} & ComponentPropsWithoutRef<'div'>
export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { className, ...restProps } = props
  const classNames = {
    card: clsx(s.card, className),
  }

  return <div className={classNames.card} ref={ref} {...restProps} />
})
