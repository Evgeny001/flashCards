import { Link } from 'react-router-dom'

import { EditTwoOutline } from '@/assets/icons/EditTwoOutline'
import { PlayCircleOutline } from '@/assets/icons/PlayCircleOutline'
import { TrashOutline } from '@/assets/icons/TrashOutline'
import defaultImage from '@/assets/images/default-image.jpg'
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
import { Deck } from '@/services/decks/decks.types'

import s from './decks-table.module.scss'

type Props = {
  currentUserId: string
  decks: Deck[] | undefined
  onDeleteClick?: (id: string) => void
  onEditClick?: (id: string) => void
  //onSort: (key: Sort) => void
  //sort: Sort
}

export const DecksTable = ({ currentUserId, decks, onDeleteClick, onEditClick }: Props) => {
  const handleEditClick = (id: string) => () => onEditClick?.(id)
  const handleDeleteClick = (id: string) => () => onDeleteClick?.(id)

  if (!decks?.length) {
    return <>No results found with these parameters</>
  }

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
            <TableCell className={s.name}>
              {deck.cover ? (
                <img alt={"deck's image"} className={s.img} src={deck.cover} />
              ) : (
                <img alt={'no image'} className={s.img} src={defaultImage} />
              )}
              <Typography as={Link} to={`/decks/${deck.id}`} variant={'body2'}>
                {deck.name}
              </Typography>
            </TableCell>
            <TableCell>{deck.cardsCount}</TableCell>
            <TableCell>{new Date(deck.updated).toLocaleString('ru-ru')}</TableCell>
            <TableCell>{deck.author.name}</TableCell>
            <TableCell>
              <div className={s.iconsContainer}>
                {deck.author.id === currentUserId && (
                  <Button className={s.icon} onClick={handleEditClick(deck.id)} variant={'icon'}>
                    <EditTwoOutline />
                  </Button>
                )}
                <Button
                  as={Link}
                  className={s.icon}
                  to={`/decks/${deck.id}/learn`}
                  variant={'icon'}
                >
                  <PlayCircleOutline />
                </Button>
                {deck.author.id === currentUserId && (
                  <Button className={s.icon} onClick={handleDeleteClick(deck.id)} variant={'icon'}>
                    <TrashOutline />
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
