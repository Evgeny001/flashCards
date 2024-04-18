import type { Meta, StoryObj } from '@storybook/react'

import { Card } from './card'

const meta: Meta<typeof Card> = {
  component: Card,
  tags: ['autodocs'],
  title: 'Components/Card',
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const CardDefault: Story = {
  args: {
    style: {
      height: '300px',
      padding: '24px',
      width: '300px',
    },
  },
}
