import type { Meta, StoryObj } from '@storybook/react'

import { OptionsValue, Select } from './select'

const meta = {
  component: Select,
  parameters: {
    layout: 'centered',
  },
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

const optionsPaginationDemo: OptionsValue[] = [
  { title: '10', value: '10' },
  { title: '20', value: '20' },
  { title: '50', value: '50' },
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

export const SelectForPagination: Story = {
  args: {
    options: optionsPaginationDemo,
    variant: 'pagination',
  },
}
