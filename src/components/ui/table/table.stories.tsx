import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/table/table'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: Table,
  tags: ['autodocs'],
  title: 'Components/Table',
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Cards</TableHeadCell>
              <TableHeadCell>Last Updated</TableHeadCell>
              <TableHeadCell>Created by</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Pack Name</TableCell>
              <TableCell>4</TableCell>
              <TableCell>18.03.2021</TableCell>
              <TableCell>Ivan Ivanov</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Pack Name</TableCell>
              <TableCell>4</TableCell>
              <TableCell>18.03.2021</TableCell>
              <TableCell>Ivan Ivanov</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </>
    ),
  },
}
export type Date = {
  cards: number
  created: string
  key: string
  lastUpdated: number
  name: string
}
const date: Date[] = [
  { cards: 5, created: 'Ivan Ivanov', key: '12', lastUpdated: +new Date(), name: 'JS' },
  { cards: 15, created: 'Ivan Ivanov', key: '12', lastUpdated: +new Date(), name: 'JS' },
  { cards: 35, created: 'Ivan Ivanov', key: '12', lastUpdated: +new Date(), name: 'JS' },
  { cards: 50, created: 'Ivan Ivanov', key: '12', lastUpdated: +new Date(), name: 'JS' },
]

export const TableWithMap: Story = {
  args: {
    children: (
      <>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Cards</TableHeadCell>
              <TableHeadCell>Last Updated</TableHeadCell>
              <TableHeadCell>Created by</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {date.map(el => (
              <TableRow key={el.key}>
                <TableCell>{el.name}</TableCell>
                <TableCell>{el.cards}</TableCell>
                <TableCell>{el.lastUpdated}</TableCell>
                <TableCell>{el.created}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    ),
  },
}
