import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { Typography } from '@/components/ui/typography'
import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'

import s from '@/components/ui/dropdown/dropdown.module.scss'

type Props = {
  icon: ReactNode
  value: string
} & ComponentPropsWithoutRef<typeof DropdownMenuRadix.Item>

export const DropdownItemWithIcon = (props: Props) => {
  const { className, icon, value, ...rest } = props

  return (
    <DropdownMenuRadix.Item className={clsx(s.dropdownItem, className)} {...rest}>
      {icon}
      <Typography variant={'caption'}>{value}</Typography>
    </DropdownMenuRadix.Item>
  )
}
