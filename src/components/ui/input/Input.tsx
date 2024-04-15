import React, {
  ChangeEvent,
  ComponentPropsWithoutRef,
  KeyboardEvent,
  ReactNode,
  forwardRef,
} from 'react'

import Eye from '@/assets/icons/Eye'
import EyeOff from '@/assets/icons/EyeOff'
import Search from '@/assets/icons/Search'
import { Typography } from '@/components/ui/typography'
import { clsx } from 'clsx'

import s from './input.module.scss'

export type InputProps = {
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

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref): JSX.Element => {
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
  const switchButtonForPassword = showPassword ? <Eye /> : <EyeOff />
  const onChangeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
    onChangeValue?.(e.currentTarget.value)
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (onEnter && e.key === 'Enter') {
      onEnter(e)
    }
    onKeyDown?.(e)
  }
  const classNames = {
    box: s.box,
    hidePassword: s.hidePassword,
    input: clsx(s.defaultInput, className, errorMessage && s.withErr, type === 'search' && s.ident),
    inputContainer: s.inputContainer,
    label: s.label,
    searchIcon: s.searchIcon,
  }

  return (
    <div className={classNames.box}>
      {label && (
        <Typography as={'label'} className={classNames.label} variant={'body2'}>
          {label}
        </Typography>
      )}
      <div className={classNames.inputContainer}>
        <input
          className={classNames.input}
          disabled={disabled}
          onChange={onChangeValueHandler}
          onKeyDown={onKeyDownHandler}
          ref={ref}
          type={inputType}
          {...restProps}
        />
        {type === 'password' && (
          <button className={classNames.hidePassword} onClick={switchShowPassword}>
            {switchButtonForPassword}
          </button>
        )}
        {iconRight && <button onClick={onClickIconRight}>{iconRight}</button>}
        {type === 'search' && (
          <button className={classNames.searchIcon} onClick={onClickIconLeft}>
            {<Search />}
          </button>
        )}
      </div>
      {errorMessage && (
        <Typography as={'span'} variant={'caption'}>
          {errorMessage}
        </Typography>
      )}
    </div>
  )
})
