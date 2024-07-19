import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card/card'
import { Input } from '@/components/ui/input'
import { Typography } from '@/components/ui/typography'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './sign-up-form.module.scss'
import { Link } from 'react-router-dom'

export type SignUpFormValues = {
  email: string
  password: string
  passwordConfirm: string
}
const user: SignUpFormValues = {
  email: '',
  password: '',
  passwordConfirm: '',
}
const validationSchema = z
  .object({
    email: z.string().email().min(1, { message: 'email is required' }),
    password: z.string().min(1, { message: 'password is required' }),
    passwordConfirm: z.string().min(1, { message: 'password is required' }),
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ['passwordConfirm'],
  })
// export type FormValues = z.infer<typeof validationSchema>
export type SignUpProps = {
  onSubmit: (data: SignUpFormValues) => void
}
export const SignUpForm = ({ onSubmit }: SignUpProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SignUpFormValues>({
    defaultValues: user,
    resolver: zodResolver(validationSchema),
  })
  // const onSubmit = (data: FormValues) => {
  //   console.log(data)
  // }

  return (
    <>
      <Card className={s.cardBox}>
        <Typography className={s.formHeader} variant={'h1'}>
          Sign Up
        </Typography>
        <DevTool control={control} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.form}>
            <Input
              {...register('email')}
              className={s.inputs}
              errorMessage={errors.email?.message}
              label={'Email'}
              placeholder={'name@example.com'}
              type={'text'}
            />
            <Input
              {...register('password')}
              className={s.inputs}
              errorMessage={errors.password?.message}
              label={'Password'}
              placeholder={'your password'}
              type={'password'}
            />
            <Input
              {...register('passwordConfirm')}
              className={s.inputs}
              errorMessage={errors?.passwordConfirm?.message}
              label={'Confirm Password'}
              placeholder={'confirm your password'}
              type={'password'}
            />
            <Button className={s.button} type={'submit'}>
              Sign Up
            </Button>
            <Typography className={s.caption}>Already have an account?</Typography>
            <Typography as={Link} className={s.signInLink} to={'/login'} variant={'link1'}>
              Sign In
            </Typography>
          </div>
        </form>
      </Card>
    </>
  )
}
