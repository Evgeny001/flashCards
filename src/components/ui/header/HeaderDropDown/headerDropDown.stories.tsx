import { HeaderDropDown } from '@/components/ui/header/HeaderDropDown/headerDropDown'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: HeaderDropDown,
  tags: ['autodocs'],
  title: 'Components/HeaderDropdown',
} satisfies Meta<typeof HeaderDropDown>

export default meta
type Story = StoryObj<typeof meta>

export const HeaderDropdown: Story = {
  args: {
    profileData: {
      avatar:
        'https://sneg.top/uploads/posts/2023-06/1687818701_sneg-top-p-krutie-avatarki-kotikov-krasivo-11.jpg',
      email: 'example@gmail.com',
      name: 'Vasya',
    },
  },
}
