import { Modal } from '@/components/ui/modal/modal'
import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>

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
        <button onClick={() => setOpen(true)}>Open Modal</button>
        <Modal {...args} onOpenChange={setOpen} open={open}>
          Modal content here
        </Modal>
      </>
    )
  },
}
