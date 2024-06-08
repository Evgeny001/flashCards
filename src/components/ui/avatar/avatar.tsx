import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as AvatarRadix from '@radix-ui/react-avatar'
import { clsx } from 'clsx'

import s from './avatar.module.scss'

import { Typography } from '../typography'

export type AvatarProps = {
  name?: string
  src?: string
  variant?: 'large' | 'small'
} & ComponentPropsWithoutRef<typeof AvatarRadix.Root>

export const Avatar = forwardRef<ElementRef<typeof AvatarRadix.Root>, AvatarProps>(
  ({ className, name, src, variant = 'large', ...rest }, ref) => {
    return (
      <AvatarRadix.Root
        className={clsx(s.wrapperAvatar, className, s[variant])}
        ref={ref}
        {...rest}
      >
        <AvatarRadix.Image alt={'avatar'} className={s.image} loading={'lazy'} src={src} />
        <AvatarRadix.Fallback>
          <Typography as={'p'} variant={'subtitle2'}>
            {name ? name[0] : ''}
          </Typography>
        </AvatarRadix.Fallback>
      </AvatarRadix.Root>
    )
  }
)
