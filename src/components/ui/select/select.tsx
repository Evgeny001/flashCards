import { ComponentPropsWithoutRef } from 'react'

import { ArrowDown } from '@/assets/icons/ArrowDown'
import { Typography } from '@/components/ui/typography'
import * as SelectRadix from '@radix-ui/react-select'

import s from './select.module.scss'

export type OptionsValue = {
  title: string
  value: string
}

export type SelectProps = {
  label?: string
  options: OptionsValue[]
  placeholder?: string
} & ComponentPropsWithoutRef<typeof SelectRadix.Root>

export const Select = ({
  defaultValue,
  disabled,
  label,
  options,
  placeholder,
  ...rest
}: SelectProps) => {
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
        <SelectRadix.Trigger
          className={`${s.trigger} ${disabled && s.disabled} `}
          disabled={disabled}
        >
          <div className={s.value}>
            <SelectRadix.Value placeholder={placeholder} />
          </div>
          <SelectRadix.Icon className={s.icon}>
            <ArrowDown />
          </SelectRadix.Icon>
        </SelectRadix.Trigger>
        <SelectRadix.Portal>
          <SelectRadix.Content className={`${s.content}`} collisionPadding={0} position={'popper'}>
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
