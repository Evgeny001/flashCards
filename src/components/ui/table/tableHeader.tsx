import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { TableHead, TableHeadCell, TableRow } from '@/components/ui/table/table'
import { Typography } from '@/components/ui/typography'

export type Column = {
  key: string
  sortable?: boolean
  title: string
}

export type Sort = {
  direction: 'asc' | 'desc'
  key: string
} | null
type TableHeaderProps = Omit<
  ComponentPropsWithoutRef<'thead'> & {
    columns: Column[]
    onSort?: (sort: Sort) => void
    sort?: Sort
  },
  'children'
>
export const TableHeader = forwardRef<ElementRef<'thead'>, TableHeaderProps>((props, ref) => {
  const { columns, onSort, sort, ...rest } = props

  return (
    <TableHead ref={ref} {...rest}>
      <TableRow>
        {columns.map(column => {
          return (
            <TableHeadCell key={column.key}>
              <Typography>{column.title}</Typography>
            </TableHeadCell>
          )
        })}
      </TableRow>
    </TableHead>
  )
})
