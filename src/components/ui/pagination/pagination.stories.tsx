import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Pagination } from '.'

const meta = {
  component: Pagination,
  tags: ['autodocs'],
  title: 'Components/Pagination',
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const PaginationDefault: Story = {
  args: {
    currentPage: 1,
    itemsPerPage: 10,
    onChangePage: (page: number) => {
      page++
    },
    onPerPageChange: () => {},
    perPageOptions: ['10', '20', '50'],
    siblingCount: 1,
    totalCount: 100,
  },
  render: args => {
    const [currentPage, setCurrentPage] = useState(3)
    const [perPage, setPerPage] = useState('10')

    return (
      <Pagination
        currentPage={currentPage}
        itemsPerPage={+perPage}
        onChangePage={page => setCurrentPage(page)}
        onPerPageChange={perPage => setPerPage(perPage)}
        perPageOptions={args.perPageOptions}
        siblingCount={args.siblingCount}
        totalCount={args.totalCount}
      />
    )
  },
}
