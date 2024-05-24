import { Delete } from '@/assets/icons/Delete'
import { Edit } from '@/assets/icons/Edit'
import { MoreVerticalOutline } from '@/assets/icons/MoreVerticalOutline'
import { Play } from '@/assets/icons/Play'
import { DropDownItem } from '@/components/ui/dropdown/dropdownItem'
import { DropdownMenu } from '@/components/ui/dropdown/dropdownMenu'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: DropdownMenu,
  tags: ['autodocs'],
  title: 'Components/Dropdown',
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const DefaulDropdown: Story = {
  args: {
    children: [
      <DropDownItem>
        <Play /> {'Learn'}
      </DropDownItem>,
      <DropDownItem>
        <Edit /> {'Edit'}
      </DropDownItem>,
      <DropDownItem>
        <Delete /> {'Delete'}
      </DropDownItem>,
    ],
    trigger: <MoreVerticalOutline />,
  },
}
