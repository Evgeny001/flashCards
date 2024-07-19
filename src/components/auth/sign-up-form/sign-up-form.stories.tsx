import type { Meta, StoryObj } from '@storybook/react'

import { SignUpFormValues, SignUpForm } from './sign-up-form'

const meta = {
  component: SignUpForm,
  tags: ['autodocs'],
  title: 'Auth/SignUpForm',
} satisfies Meta<typeof SignUpForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    onSubmit: (data: SignUpFormValues) => console.info(data),
  },
}
