import { ComponentPropsWithoutRef, ReactNode } from 'react'

import Close from '@/assets/icons/Close'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import * as DialogPrimitive from '@radix-ui/react-dialog'

import s from './modal.module.scss'

export type ModalProps = {
  children: ReactNode
  showCloseIcon?: boolean
  onOpenChange: (open: boolean) => void
  open?: boolean
  title?: string
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof DialogPrimitive.Root>
export const Modal = (props: ModalProps) => {
  const { children, showCloseIcon = true, open = false, title, onOpenChange, trigger } = props

  return (
    <DialogPrimitive.Root {...props} onOpenChange={onOpenChange} open={open}>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      {open && (
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className={s.overlay} />
          <DialogPrimitive.Content className={s.content}>
            <Card>
              <header className={s.header}>
                {title && (
                  <DialogPrimitive.Title>
                    <Typography variant={'h3'}>{title}</Typography>
                  </DialogPrimitive.Title>
                )}
                {showCloseIcon && (
                  <DialogPrimitive.Close className={s.closeButton}>
                    <Close />
                  </DialogPrimitive.Close>
                )}
              </header>
              <div>{children}</div>
            </Card>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      )}
    </DialogPrimitive.Root>
  )
}
