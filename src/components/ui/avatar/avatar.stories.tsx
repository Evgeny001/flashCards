import type { Meta, StoryObj } from '@storybook/react'

import { Avatar } from '.'

const meta = {
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Avatar',
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Large: Story = {
  args: {
    src: 'https://sneg.top/uploads/posts/2023-06/1687818701_sneg-top-p-krutie-avatarki-kotikov-krasivo-11.jpg',
  },
}

export const LargeWithNoImage: Story = {
  args: {},
}

export const Small: Story = {
  args: {
    src: 'https://sneg.top/uploads/posts/2023-06/1687818701_sneg-top-p-krutie-avatarki-kotikov-krasivo-11.jpg',
    variant: 'small',
  },
}
