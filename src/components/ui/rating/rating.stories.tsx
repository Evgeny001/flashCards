import type { Meta, StoryObj } from '@storybook/react'

import { Rating } from '.'

const meta = {
  component: Rating,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Rating',
} satisfies Meta<typeof Rating>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    rating: 3,
  },
}

export const Rating10stars: Story = {
  args: {
    maxRating: 10,
    rating: 7,
  },
}
