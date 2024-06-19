import {
  RecoverPassword,
  RecoverPasswordFormValues,
} from '@/components/auth/recoverPassword/recoverPassword'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: RecoverPassword,
  tags: ['autodocs'],
  title: 'Auth/RecoverPassword',
} satisfies Meta<typeof RecoverPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Primaty: Story = {
  args: {
    onSubmit: (data: RecoverPasswordFormValues) => console.info(data),
  },
}
