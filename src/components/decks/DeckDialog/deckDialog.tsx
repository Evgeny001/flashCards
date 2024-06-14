import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { ControlledCheckbox } from '@/components/ui/controlled/controlled-checkbox'
import { ControlledInput } from '@/components/ui/controlled/controlled-input'
import { Dialog, DialogProps } from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './deckDialog.module.scss'

const newDeckSchema = z.object({
  isPrivate: z.boolean(),
  name: z.string().min(3).max(5000),
})

export type FormValues = z.infer<typeof newDeckSchema>

type Props = {
  defaultValues?: FormValues & { cover?: null | string }
  onConfirm: (data: FormValues & { cover?: File | null }) => void
} & Pick<DialogProps, 'confirmText' | 'onCancel' | 'onOpenChange' | 'open' | 'title'>
export const DeckDialog = ({
  defaultValues = { isPrivate: false, name: '' },
  onCancel,
  onConfirm,
  ...dialogProps
}: Props) => {
  console.log(defaultValues.name)
  const [cover, setCover] = useState<File | null>(null)
  const [preview, setPreview] = useState<null | string>('')

  useEffect(() => {
    if (defaultValues?.cover) {
      // const file = new File([defaultValues.cover], 'cover.png', { type: 'image/png' })

      //setCover(file)
      setPreview(defaultValues.cover)
    }
  }, [defaultValues?.cover])

  useEffect(() => {
    if (cover) {
      const newPreview = URL.createObjectURL(cover)

      if (preview) {
        URL.revokeObjectURL(preview)
      }
      setPreview(newPreview)

      return () => URL.revokeObjectURL(newPreview)
    }
  }, [cover])

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(newDeckSchema),
  })
  const onSubmit = handleSubmit(data => {
    onConfirm({ ...data, cover })
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
        {preview && <img alt={''} src={preview} />}
        <input
          accept={'image/*'}
          onChange={e => setCover(e.target.files?.[0] ?? null)}
          type={'file'}
        />
        {cover && (
          <Button
            onClick={() => {
              setCover(null)
              setPreview(null)
            }}
          >
            Remove cover
          </Button>
        )}
        <ControlledInput control={control} label={'Deck name'} name={'name'} />
        <ControlledCheckbox control={control} label={'Private'} name={'isPrivate'} />
      </form>
    </Dialog>
  )
}
