import { useForm } from 'react-hook-form'

import { ControlledCheckbox } from '@/components/ui/controlled/controlled-checkbox'
import { ControlledInput } from '@/components/ui/controlled/controlled-input'
import { Dialog, DialogProps } from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './DeckDialog.module.scss'

const newDeckSchema = z.object({
  isPrivate: z.boolean(),
  name: z.string().min(3).max(5000),
})

export type FormValues = z.infer<typeof newDeckSchema>

type Props = {
  defaultValues?: FormValues
  onConfirm: (data: FormValues) => void
} & Pick<DialogProps, 'confirmText' | 'onCancel' | 'onOpenChange' | 'open' | 'title'>
export const DeckDialog = ({
  defaultValues = { isPrivate: false, name: '' },
  onCancel,
  onConfirm,
  ...dialogProps
}: Props) => {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(newDeckSchema),
  })
  const onSubmit = handleSubmit(data => {
    onConfirm(data)
    dialogProps.onOpenChange?.(false)
    reset()
  })

  const handleCancel = () => {
    reset()
    onCancel?.()
  }

  return (
    <Dialog {...dialogProps} onCancel={handleCancel} onConfirm={onSubmit}>
      <form className={s.content} onSubmit={onSubmit}>
        <ControlledInput control={control} label={'Deck name'} name={'name'} />
        <ControlledCheckbox control={control} label={'Private'} name={'isPrivate'} />
      </form>
    </Dialog>
  )
}
