import { Header } from '@/components/ui/header/header'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: Header,
  tags: ['autodocs'],
  title: 'Components/Header',
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const HeaderAuthTrue: Story = {
  args: {
    isAuth: true,
    profile: {
      avatar:
        'https://sneg.top/uploads/posts/2023-06/1687818701_sneg-top-p-krutie-avatarki-kotikov-krasivo-11.jpg',
      email: 'example@gmail.com',
      name: 'Vasya',
    },
  },
}

export const HeaderAuthFalse: Story = {
  args: {
    isAuth: false,
    profile: {
      avatar:
        'https://sneg.top/uploads/posts/2023-06/1687818701_sneg-top-p-krutie-avatarki-kotikov-krasivo-11.jpg',
      email: 'example@gmail.com',
      name: 'Vasya',
    },
  },
}
