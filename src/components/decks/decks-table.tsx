import { Link } from 'react-router-dom'

import { EditTwoOutline } from '@/assets/icons/EditTwoOutline'
import { PlayCircleOutline } from '@/assets/icons/PlayCircleOutline'
import { TrashOutline } from '@/assets/icons/TrashOutline'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'

import s from './decks-table.module.scss'

export type Deck = {
  cardsCount: number
  createdBy: string
  id: string
  lastUpdated: string
  name: string
}

type Props = {
  decks: Deck[] | undefined
  onDeleteClick?: (id: string) => void
  onEditClick?: (id: string) => void
  //onSort: (key: Sort) => void
  //sort: Sort
}

export const DecksTable = ({ decks, onDeleteClick, onEditClick }: Props) => {
  const handleEditClick = (id: string) => () => onEditClick?.(id)
  const handleDeleteClick = (id: string) => () => onDeleteClick?.(id)

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Cards</TableHeadCell>
          <TableHeadCell>Last Updated</TableHeadCell>
          <TableHeadCell>Author</TableHeadCell>
          <TableHeadCell>Actions</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {decks?.map(deck => (
          <TableRow key={deck.id}>
            <TableCell>
              <Typography as={Link} to={`/decks/${deck.id}`} variant={'body2'}>
                {deck.name}
              </Typography>
            </TableCell>
            <TableCell>{deck.cardsCount}</TableCell>
            <TableCell>{new Date(deck.lastUpdated).toLocaleString('ru-ru')}</TableCell>
            <TableCell>{deck.createdBy}</TableCell>
            <TableCell>
              <div className={s.iconsContainer}>
                <Button as={Link} to={`/decks/${deck.id}/learn`} variant={'icon'}>
                  <PlayCircleOutline />
                </Button>
                <Button onClick={handleEditClick(deck.id)} variant={'icon'}>
                  <EditTwoOutline />
                </Button>
                <Button onClick={handleDeleteClick(deck.id)} variant={'icon'}>
                  <TrashOutline />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
