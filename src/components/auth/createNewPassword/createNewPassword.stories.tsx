import { Meta, StoryObj } from '@storybook/react'

import { CreateNewPassword } from '.'

const meta = {
  component: CreateNewPassword,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'auth/CreateNewPassword',
} satisfies Meta<typeof CreateNewPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSubmit: data => {
      console.log(data)
    },
  },
}
