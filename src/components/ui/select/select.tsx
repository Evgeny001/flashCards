import { ComponentPropsWithoutRef } from 'react'

import { ArrowDown } from '@/assets/icons/ArrowDown'
import { Typography } from '@/components/ui/typography'
import * as SelectRadix from '@radix-ui/react-select'
import clsx from 'clsx'

import s from './select.module.scss'

export type OptionsValue = {
  title: string
  value: string
}

export type SelectProps = {
  label?: string
  options: OptionsValue[]
  placeholder?: string
  variant?: 'pagination'
} & ComponentPropsWithoutRef<typeof SelectRadix.Root>

export const Select = ({
  defaultValue,
  disabled,
  label,
  options,
  placeholder,
  variant,
  ...rest
}: SelectProps) => {
  const classNames = {
    content: clsx(s.content, variant === 'pagination' && s.paginationContent),
    trigger: clsx(
      s.trigger,
      disabled && s.disabled,
      variant === 'pagination' && s.paginationTrigger
    ),
  }

  return (
    <div className={s.wrapper}>
      <Typography className={s.title} variant={'body2'}>
        {label}
      </Typography>
      {/*приоритет значений по дефолту: placeholder -> defaultValue -> options[0].value */}
      <SelectRadix.Root
        defaultValue={!placeholder ? defaultValue ?? options[0].value : undefined}
        {...rest}
      >
        <SelectRadix.Trigger className={classNames.trigger} disabled={disabled}>
          <SelectRadix.Value placeholder={placeholder} />
          <SelectRadix.Icon className={s.icon}>
            <ArrowDown />
          </SelectRadix.Icon>
        </SelectRadix.Trigger>
        <SelectRadix.Portal>
          <SelectRadix.Content
            className={classNames.content}
            collisionPadding={0}
            position={'popper'}
          >
            <SelectRadix.Viewport>
              <SelectRadix.Group>
                {options?.map(option => (
                  <SelectRadix.Item className={s.item} key={option.value} value={option.value}>
                    <SelectRadix.ItemText>{option.title}</SelectRadix.ItemText>
                  </SelectRadix.Item>
                ))}
              </SelectRadix.Group>
            </SelectRadix.Viewport>
          </SelectRadix.Content>
        </SelectRadix.Portal>
      </SelectRadix.Root>
    </div>
  )
}
