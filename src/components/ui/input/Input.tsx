import React, { ComponentPropsWithoutRef, KeyboardEvent, ReactNode } from 'react'

import { Typography } from '@/components/ui/typography'

export type PropsType = {
  errorMessage?: string
  iconLeft?: ReactNode
  iconRight?: ReactNode
  label?: string
  onChangeValue?: (value: string) => void
  onClickIconLeft?: () => void
  onClickIconRight?: () => void
  onEnter?: (e: KeyboardEvent<HTMLInputElement>) => void
  type?: 'password' | 'search' | 'text'
} & ComponentPropsWithoutRef<'input'>

export const Input: React.FC<PropsType> = props => {
  const {
    className,
    disabled,
    errorMessage,
    iconLeft,
    iconRight,
    label,
    onChange,
    onChangeValue,
    onClickIconLeft,
    onClickIconRight,
    onEnter,
    onKeyDown,
    type,
    ...restProps
  } = props
  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const inputType = type === 'password' && showPassword ? 'text' : type
  const switchShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div>
      {label && (
        <Typography as={'label'} variant={'body2'}>
          {label}
        </Typography>
      )}
      <div className={''}>
        <input type={inputType} {...restProps} />
        {type === 'password' && <button onClick={switchShowPassword}></button>}
      </div>
      {errorMessage && (
        <Typography as={'span'} variant={'caption'}>
          {errorMessage}
        </Typography>
      )}
    </div>
  )
}
