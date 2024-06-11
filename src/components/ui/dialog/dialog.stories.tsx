import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Meta, StoryObj } from '@storybook/react'

import { Dialog } from './'

const meta = {
  component: Dialog,
  tags: ['autodocs'],
  title: 'Components/Dialog',
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Modal',
    onOpenChange: () => {},
    open: true,
    title: 'Modal',
  },
  render: args => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Dialog {...args} onOpenChange={setOpen} open={open}>
          <div style={{ padding: '20px 60px' }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
              <Input />
              <Button>Primary</Button>
            </div>
          </div>
        </Dialog>
      </>
    )
  },
}
