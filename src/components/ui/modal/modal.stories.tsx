import { Meta, StoryObj } from '@storybook/react'
import { Modal } from '@/components/ui/modal/modal'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Input } from '@/components/ui/input'

const meta = {
  component: Modal,
  tags: ['autodocs'],
  title: 'Components/Modal',
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    open: true,
    title: 'Modal',
  },
  render: args => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal {...args} onOpenChange={setOpen} open={open}>
          <div style={{ padding: '20px 60px' }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
              <Input />
              <Button>Primary</Button>
            </div>
          </div>
        </Modal>
      </>
    )
  },
}
