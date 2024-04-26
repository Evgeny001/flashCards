import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/table/table'

import s from './table.module.scss'
export const BaseTable = () => {
  return (
    <Table className={s.table}>
      <TableHead>
        <TableRow>
          <TableHeadCell className={s.th}>Name</TableHeadCell>
          <TableHeadCell className={s.th}>Cards</TableHeadCell>
          <TableHeadCell className={s.th}>Last Updated</TableHeadCell>
          <TableHeadCell className={s.th}>Created by</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell className={s.td}>Pack Name</TableCell>
          <TableCell className={s.td}>4</TableCell>
          <TableCell className={s.td}>18.03.2021</TableCell>
          <TableCell className={s.td}>Ivan Ivanov</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
