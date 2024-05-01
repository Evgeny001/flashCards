import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Typography } from '@/components/ui/typography'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export type FormValues = {
  email: string
  pass: string
  passConfirm: string
}
const user: FormValues = {
  email: '',
  pass: '',
  passConfirm: '',
}
const validationSchema = z
  .object({
    email: z.string().email().min(1, { message: 'email is required' }),
    pass: z.string().min(1, { message: 'password is required' }),
    passConfirm: z.string().min(1, { message: 'password is required' }),
  })
  .refine(data => data.pass === data.passConfirm, {
    message: "Passwords don't match",
    path: ['passConfirm'],
  })

export const SignUpForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    defaultValues: user,
    resolver: zodResolver(validationSchema),
  })
  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <>
      <DevTool control={control} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('email')}
          errorMessage={errors.email?.message}
          label={'Email'}
          placeholder={'name@example.com'}
          type={'text'}
        />
        <Input
          {...register('pass')}
          errorMessage={errors.pass?.message}
          label={'Password'}
          placeholder={'your password'}
          type={'password'}
        />
        <Input
          {...register('passConfirm')}
          errorMessage={errors?.passConfirm?.message}
          label={'Confirm Password'}
          placeholder={'confirm your password'}
          type={'password'}
        />
        <Button type={'submit'}>Sign Up</Button>
        <Typography>Already have an account?</Typography>
        <Typography as={'a'} variant={'link1'}>
          Sign In
        </Typography>
      </form>
    </>
  )
}
