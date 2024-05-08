import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Typography } from '@/components/ui/typography'
import * as Radio from '@radix-ui/react-radio-group'

import s from './radioItem.module.scss'
export type RadioItemProps = {
  label: string
  value: string
} & ComponentPropsWithoutRef<typeof Radio.Item>

export const RadioItem = forwardRef<ElementRef<typeof Radio.Item>, RadioItemProps>((props, ref) => {
  const { disabled, label, value } = props
  const classNames = {
    frame: s.frame,
    indicator: s.indicator,
    item: s.item,
    radio: s.radio,
    state: s.state,
  }

  return (
    <div className={classNames.item}>
      <div className={s.state}>
        <Radio.Item
          className={classNames.radio}
          disabled={disabled}
          id={value}
          ref={ref}
          value={value}
        >
          <div className={s.frame}></div>
          <Radio.Indicator className={classNames.indicator} />
        </Radio.Item>
      </div>
      <Typography as={'label'} htmlFor={value} variant={'body2'}>
        {label}
      </Typography>
    </div>
  )
})
