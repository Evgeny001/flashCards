import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { RadioItem } from '@/components/ui/radioGroup/radioItem/radioItem'
import * as Radio from '@radix-ui/react-radio-group'

import s from './radioGroup.module.scss'
export type Option = {
  label: string
  value: string
}
type Props = {
  disabled?: boolean
  name: string
  onValueChange?: (value: string) => void
  options: Option[]
} & ComponentPropsWithoutRef<typeof Radio.Root>
export const RadioGroup = forwardRef<ElementRef<typeof Radio.Root>, Props>(
  ({ name, options, ...restProps }, ref) => {
    const classNames = {
      box: s.box,
    }

    return (
      <form>
        <Radio.Root name={name} ref={ref} {...restProps} className={classNames.box}>
          {options.map(el => {
            return <RadioItem key={el.value} label={el.label} value={el.value} />
          })}
        </Radio.Root>
      </form>
    )
  }
)
