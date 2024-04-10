import type { Meta, StoryObj } from '@storybook/react'

import { OptionsValue, Select } from './select'

const meta = {
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const optionsDemo: OptionsValue[] = [
  { title: 'Sub-Zero', value: '1' },
  { title: 'Scorpion', value: '2' },
  { title: 'Cyrax', value: '3' },
]

export const SelectDefault: Story = {
  args: {
    label: 'Select-box',
    options: optionsDemo,
  },
}
export const SelectWithPlaceholder: Story = {
  args: {
    label: 'Select-box',
    options: optionsDemo,
    placeholder: 'choose your fighter',
  },
}

export const SelectDisabled: Story = {
  args: {
    disabled: true,
    label: 'Select-box',
    options: optionsDemo,
    placeholder: 'choose your fighter',
  },
}
