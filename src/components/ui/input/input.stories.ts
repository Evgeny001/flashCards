import { Meta, StoryObj } from '@storybook/react'

import { Input } from './input'

const meta = {
  component: Input,
  tags: ['autodocs'],
  title: 'Components/Input',
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Input',
    placeholder: 'Input',
  },
}
export const Password: Story = {
  args: {
    label: 'Input',
    placeholder: 'Input',
    type: 'password',
  },
}
export const Search: Story = {
  args: {
    placeholder: 'Input search',
    type: 'search',
  },
}
export const DefaultWithErr: Story = {
  args: {
    errorMessage: 'Error!',
    label: 'Input',
    placeholder: 'Error',
  },
}
export const WithPasswordErr: Story = {
  args: {
    errorMessage: 'Error!',
    label: 'Input',
    placeholder: 'Error',
    type: 'password',
  },
}
export const WithSearchErr: Story = {
  args: {
    errorMessage: 'Error!',
    label: 'Input',
    placeholder: 'Input search',
    type: 'search',
  },
}
