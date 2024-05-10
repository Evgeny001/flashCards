import { ComponentPropsWithoutRef, ReactNode } from 'react'

import Close from '@/assets/icons/Close'
import { Typography } from '@/components/ui/typography'
import * as DialogPrimitive from '@radix-ui/react-dialog'

import s from './modal.module.scss'

export type ModalProps = {
  children?: ReactNode
  onOpenChange?: (open: boolean) => void
  open?: boolean
  title?: string
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof DialogPrimitive.Root>
export const Modal = ({ children, title, trigger, ...props }: ModalProps) => {
  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={s.overlay} />
        <DialogPrimitive.Content className={s.content}>
          <div className={s.header}>
            <DialogPrimitive.Title asChild>
              <Typography as={'h3'} variant={'h3'}>
                {title}
              </Typography>
            </DialogPrimitive.Title>
            <DialogPrimitive.Close className={s.closeButton}>
              <Close height={24} width={24} />
            </DialogPrimitive.Close>
          </div>
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
