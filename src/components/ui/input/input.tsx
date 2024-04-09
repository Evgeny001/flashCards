import React, { ComponentPropsWithoutRef, KeyboardEvent, useState } from 'react'

import Close from '@/assets/icons/close'
import Eye from '@/assets/icons/eye'
import Eyeoff from '@/assets/icons/eyeoff'
import Search from '@/assets/icons/search'

export type InputProps = {
  errorMessage?: string
  label?: string
  onChange?: () => void
  onClearClick?: () => void
  onEnter?: (e: KeyboardEvent<HTMLInputElement>) => void
  type?: 'password' | 'search' | 'text'
} & ComponentPropsWithoutRef<'input'>

// НЕ УДАЛЯТЬ КОММЕНТ ПЕРЕД forwardRef - без него ломается tree shaking
export const Input = ({ type = 'text', value }, ref) => {
  const isShowPasswordButton = type === 'password' //если true, то показываеем глазик (обычный или перечеркнутрый)
  const [showPassword, setShowPassword] = React.useState<boolean>(false) // если true, то Eye если false Eyeoff
  const isSearch = type === 'search' //если true то показать Search
  const isShoClearButton = isSearch && value.length > 0 //если если true то показать Close
  const currentInputType = inputType(type, showPassword) //если type === 'password' true + showPassword true только тогда currentInputType будет password
  //и вместо паролья будут звездочки, в противном случае будет передаваться с currentInputType type из пропсов

  const onChangeHandler = () => {}
  const onClearClickHandler = () => {}
  const onKeyDownHandler = () => {}

  // ClearButton булет появляться при условии isSearch === true + в input есть текс
  return (
    <div className={''}>
      {isSearch ? <Search /> : ''}
      <input onChange={onChangeHandler} onKeyDown={onKeyDownHandler} type={currentInputType} />
      {
        !(
          !isShowPasswordButton ||
          !(
            <button onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <Eye /> : <Eyeoff />}
            </button>
          )
        )
      }
      {isShoClearButton ? (
        <button onClick={onClearClickHandler}>
          <Close />
        </button>
      ) : (
        ''
      )}
    </div>
  )
  //error
}
function inputType(type: string, showPassword: boolean) {
  return type === 'password' && showPassword ? 'text' : type
}
