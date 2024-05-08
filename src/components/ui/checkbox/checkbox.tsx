import { ComponentPropsWithoutRef, ElementRef, forwardRef, useId } from 'react'

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
    const generatedId = useId()
    const finalId = id ?? generatedId

    return (
      <div className={clsx(s.wrapper, className)}>
        <CheckboxRadix.Root
          className={s.checkboxRoot}
          disabled={disabled}
          id={finalId}
          ref={ref}
          {...rest}
        >
          <CheckboxRadix.Indicator className={s.checkboxIndicator}>
            <CheckIcon />
          </CheckboxRadix.Indicator>
        </CheckboxRadix.Root>
        <Typography as={'label'} htmlFor={finalId} variant={'body2'}>
          {label}
        </Typography>
        {errorMessage && <h3>{errorMessage}</h3>}
      </div>
    )
  }
)
