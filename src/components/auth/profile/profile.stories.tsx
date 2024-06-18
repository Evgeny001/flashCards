import { Profile } from '@/components/auth/profile/profile'
import { UpdateProfileArgs } from '@/services/auth/auth.types'
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
      avatar:
        'https://sneg.top/uploads/posts/2023-06/1687818701_sneg-top-p-krutie-avatarki-kotikov-krasivo-11.jpg',
      email: 'somemail@gmail.com',
      name: 'Some Name',
    },
    onSubmit: (data: UpdateProfileArgs) => console.log(data.name),
    // logOut: () => console.log('logOut'),
    onSubmitAvatar: () => console.log('update avatar'),
  },
}
