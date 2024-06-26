import { ComponentPropsWithoutRef, ReactNode } from 'react'

import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'

import s from './dropdown.module.scss'
type Props = {
  /** List of DropdownItems */
  children?: ReactNode
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof DropdownMenuRadix.Root>
export const DropdownMenu = (props: Props) => {
  const { children, trigger, ...rest } = props

  return (
    <div className={s.box}>
      <DropdownMenuRadix.Root {...rest}>
        <DropdownMenuRadix.Trigger className={s.trigger}>{trigger}</DropdownMenuRadix.Trigger>
        <DropdownMenuRadix.Portal>
          <DropdownMenuRadix.Content align={'end'} className={s.dropdownContent}>
            {children}
          </DropdownMenuRadix.Content>
        </DropdownMenuRadix.Portal>
      </DropdownMenuRadix.Root>
    </div>
  )
}
