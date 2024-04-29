import { useId } from 'react'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Input, InputProps } from '@/components/ui/input'

export type ControlledInputProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> & Omit<InputProps, 'id' | 'onChange' | 'value'>

export const ControlledInput = <TFieldValues extends FieldValues>({
  control,
  defaultValue,
  name,
  rules,
  shouldUnregister,
  ...InputProps
}: ControlledInputProps<TFieldValues>) => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    defaultValue,
    name,
    rules,
    shouldUnregister,
  })

  return (
    <Input
      {...{
        id: useId(),
        onChange,
        value,
        ...InputProps,
      }}
    />
  )
}
