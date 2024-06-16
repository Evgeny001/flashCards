export type Author = {
  id: string
  name: string
}

export type Deck = {
  author: Author
  cardsCount: number
  cover?: any
  created: string
  id: string
  isPrivate: boolean
  name: string
  updated: string
  userId: string
}

export type Pagination = {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export type DecksResponce = {
  items: Deck[]
  pagination: Pagination
}

export interface GetDecksArgs {
  authorId?: string
  currentPage?: number
  itemsPerPage?: number
  maxCardsCount?: number
  minCardsCount?: number
  name?: string
  orderBy?: string
}

export type CreateDeckArgs = {
  cover?: File | null
  isPrivate?: boolean
  name: string
}

export type DeleteDeckArgs = {
  id: string
}

export type updateDecksArgs = {
  cover?: File | null
  id: string
  isPrivate?: boolean
  name?: string
}

export type MinMaxDeckResponse = {
  max: number
  min: number
}
