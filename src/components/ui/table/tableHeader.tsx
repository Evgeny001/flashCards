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

  const handleSort = (key: string, sortable?: boolean) => () => {
    if (!onSort || !sortable) {
      return
    }

    if (sort?.key !== key) {
      return onSort({ direction: 'asc', key })
    }

    if (sort.direction === 'desc') {
      return onSort(null)
    }

    return onSort({
      direction: sort?.direction === 'asc' ? 'desc' : 'asc',
      key,
    })
  }

  return (
    <TableHead ref={ref} {...rest}>
      <TableRow>
        {columns.map(({ key, sortable = true, title }) => {
          return (
            <TableHeadCell key={key} onClick={handleSort(key, sortable)}>
              <Typography>{title}</Typography>
              {sort && sort.key === key && <span>{sort.direction === 'asc' ? '▲' : '▼'}</span>}
            </TableHeadCell>
          )
        })}
      </TableRow>
    </TableHead>
  )
})
