import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ControlledInput } from '@/components/ui/controlled/controlled-input'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './forgotPassword.module.scss'

type Props = {
  onSubmit: (data: FormValues) => void
}
export type FormValues = z.infer<typeof schema>
const schema = z.object({
  email: z.string().email().min(1, { message: 'email is required' }),
})

export const ForgotPassword = ({ onSubmit }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(schema),
  })

  return (
    <Card className={s.card}>
      <div className={s.content}>
        <Typography className={s.cardTitle} variant={'h1'}>
          Forgot your password?
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ControlledInput
            control={control}
            errorMessage={errors.email?.message}
            label={'Email'}
            name={'email'}
            type={'text'}
          />
          <Typography className={s.description} variant={'body2'}>
            Enter your email address and we will send you further instructions
          </Typography>
          <Button className={s.bottom} type={'submit'} variant={'primary'}>
            Send Instructions
          </Button>
          <Typography className={s.description} variant={'body2'}>
            Did you remember your password?
          </Typography>
          <Typography as={'a'} className={s.logIn} variant={'link1'}>
            Try logging in
          </Typography>
        </form>
      </div>
    </Card>
  )
}
