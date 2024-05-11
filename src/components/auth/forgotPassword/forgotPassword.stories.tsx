import { ForgotPassword, FormValues } from '@/components/auth/forgotPassword/forgotPassword'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: ForgotPassword,
  tags: ['autodocs'],
  title: 'Auth/ForgotPassword',
} satisfies Meta<typeof ForgotPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Primaty: Story = {
  args: {
    onSubmit: (data: FormValues) => console.info(data),
  },
}
