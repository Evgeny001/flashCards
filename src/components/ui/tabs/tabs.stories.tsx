import { Meta, StoryObj } from '@storybook/react'

import { Tabs } from './tabs'

const meta = {
  argTypes: {},
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Tabs',
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    tabs: [
      { disabled: false, value: 'tab1' },
      { disabled: false, value: 'tab2' },
      { disabled: false, value: 'tab3' },
    ],
  },
}

export const DefaultWithTitle: Story = {
  args: {
    tabs: [
      { disabled: false, value: 'tab1' },
      { disabled: false, value: 'tab2' },
      { disabled: false, value: 'tab3' },
    ],
    title: 'title',
  },
}

export const Disabled: Story = {
  args: {
    tabs: [
      { disabled: true, value: 'tab1' },
      { disabled: true, value: 'tab2' },
      { disabled: true, value: 'tab3' },
    ],
    title: 'title',
  },
}
