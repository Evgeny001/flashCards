import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { CheckIcon } from '@/assets/icons/CheckIcon'
import { Typography } from '@/components/ui/typography'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import { clsx } from 'clsx'

import s from './checkbox.module.scss'

export type CheckboxProps = {
  // checked?: CheckedState
  // defaultChecked?: CheckedState
  disabled?: boolean
  errorMessage?: string
  id?: string
  label?: string
} & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

export const Checkbox = forwardRef<ElementRef<typeof CheckboxRadix.Root>, CheckboxProps>(
  ({ className, disabled, errorMessage, id, label, ...rest }, ref) => {
    return (
      //<div style={{ alignItems: 'center', display: 'flex' }}>
      <div className={clsx(s.wrapper, className)}>
        {/*<div className={s.wrapper}>*/}
        <div className={s.around}>
          <CheckboxRadix.Root
            className={s.CheckboxRoot}
            disabled={disabled}
            id={id}
            ref={ref}
            {...rest}
          >
            <CheckboxRadix.Indicator className={s.CheckboxIndicator}>
              <CheckIcon />
            </CheckboxRadix.Indicator>
          </CheckboxRadix.Root>
        </div>
        {/*</div>*/}
        <Typography as={'label'} htmlFor={id} variant={'body2'}>
          {label}
        </Typography>
        {errorMessage && <h3>{errorMessage}</h3>}
      </div>
    )
  }
)
