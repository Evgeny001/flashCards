import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { ImageOutline } from '@/assets/icons/ImageOutline'
import { TrashOutline } from '@/assets/icons/TrashOutline'
import defaultImage from '@/assets/images/default-image.jpg'
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

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      setCover(file)
    }
  }

  const originalInput = useRef<HTMLInputElement | null>(null)
  const onClickChoiceImage = () => originalInput?.current?.click()

  return (
    <Dialog {...dialogProps} onCancel={handleCancel} onConfirm={onSubmit}>
      <form className={s.content} onSubmit={onSubmit}>
        <img alt={''} className={s.preview} src={preview ? preview : defaultImage} />
        <input
          accept={'image/*'}
          onChange={uploadHandler}
          ref={originalInput}
          style={{ display: 'none' }}
          type={'file'}
        />
        <div className={s.buttonsWrapper}>
          <Button fullWidth onClick={onClickChoiceImage} variant={'primary'}>
            <ImageOutline /> {preview ? 'Change cover' : 'Add cover'}
          </Button>
          {preview && (
            <Button
              fullWidth
              onClick={() => {
                setCover(null)
                setPreview(null)
              }}
              variant={'primary'}
            >
              <TrashOutline /> Remove cover
            </Button>
          )}
        </div>
        <ControlledInput control={control} label={'Deck name'} name={'name'} />
        <ControlledCheckbox control={control} label={'Private'} name={'isPrivate'} />
      </form>
    </Dialog>
  )
}
