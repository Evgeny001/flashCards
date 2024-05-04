import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { ControlledInput } from '@/components/ui/controlled/controlled-input'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { z } from 'zod'

import s from './profileEditMode.module.scss'

const schema = z.object({
  name: z.string().min(3).trim(),
})

type FormValues = z.infer<typeof schema>

type Props = {
  className?: string
  deactivateEditMode: () => void
  initialValue?: string
  updateNickname: (data: FormValues) => void
}

export const ProfileEditMode = ({
  className,
  deactivateEditMode,
  initialValue = '',
  updateNickname,
}: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      name: initialValue,
    },
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormValues) => {
    updateNickname(data)
    deactivateEditMode()
  }

  return (
    <form className={clsx(s.form, className)} onSubmit={handleSubmit(onSubmit)}>
      <ControlledInput
        control={control}
        errorMessage={errors.name?.message}
        label={'Nickname'}
        name={'name'}
      />
      <Button fullWidth type={'submit'} variant={'primary'}>
        Save Changes
      </Button>
    </form>
  )
}
