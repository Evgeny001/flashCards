import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { RadioGroup, RadioGroupProps } from '@/components/ui/radioGroup'

type Props<T extends FieldValues> = UseControllerProps<T> &
  Omit<RadioGroupProps, 'onBlur' | 'onValueChange' | 'ref' | 'value'>

export const ControlledRadioGroup = <T extends FieldValues>({
  control,
  disabled,
  name,
  ...rest
}: Props<T>) => {
  const {
    field: { onBlur, onChange, ref, value },
  } = useController({
    control,
    disabled,
    name,
  })

  return (
    <RadioGroup
      {...rest}
      name={name}
      onBlur={onBlur}
      onValueChange={onChange}
      ref={ref}
      value={value}
    />
  )
}
