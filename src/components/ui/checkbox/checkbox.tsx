import { ComponentPropsWithoutRef } from 'react'

import { CheckIcon } from '@/assets/icons/CheckIcon'
import { Typography } from '@/components/ui/typography'
import * as CheckboxRadix from '@radix-ui/react-checkbox'

import s from './checkbox.module.scss'

type CheckboxProps = {
  // checked?: CheckedState
  // defaultChecked?: CheckedState
  disabled?: boolean
  id?: string
  label?: string
} & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

export const Checkbox = (props: CheckboxProps) => {
  const { disabled, id, label } = props

  return (
    <div style={{ alignItems: 'center', display: 'flex' }}>
      <div className={s.wrapper}>
        <div className={s.around}>
          <CheckboxRadix.Root className={s.CheckboxRoot} disabled={disabled} id={id}>
            <CheckboxRadix.Indicator className={s.CheckboxIndicator}>
              <CheckIcon />
            </CheckboxRadix.Indicator>
          </CheckboxRadix.Root>
        </div>
      </div>
      <Typography as={'label'} htmlFor={id} variant={'body2'}>
        {label}
      </Typography>
    </div>
  )
}
