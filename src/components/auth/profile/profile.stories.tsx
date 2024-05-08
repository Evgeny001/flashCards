import { Profile, ProfileData } from '@/components/auth/profile/profile'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  component: Profile,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Auth/Profile',
} satisfies Meta<typeof Profile>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: {
      avatarSrc:
        'https://sneg.top/uploads/posts/2023-06/1687818701_sneg-top-p-krutie-avatarki-kotikov-krasivo-11.jpg',
      email: 'somemail@gmail.com',
      name: 'Some Name',
    },
    logOut: () => console.log('logOut'),
    updateAvatar: () => console.log('update avatar'),
    updateNickname: (data: ProfileData) => console.log(data.name),
  },
}
