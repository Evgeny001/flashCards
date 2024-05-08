import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card/card'
import { ControlledCheckbox } from '@/components/ui/controlled/controlled-checkbox/controlled-checkbox'
import { Input } from '@/components/ui/input'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './signIn.module.scss'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(30),
  rememberMe: z.boolean().default(false),
})

export type FormValues = z.infer<typeof loginSchema>

export type SignInProps = {
  onSubmit: (data: FormValues) => void
}

export const SignIn = ({ onSubmit }: SignInProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })

  return (
    <Card className={s.card}>
      <Typography className={s.signInHeader} variant={'h1'}>
        Sign In
      </Typography>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.inputs}>
          <Input errorMessage={errors.email?.message} {...register('email')} label={'Email'} />
          <Input
            {...register('password')}
            errorMessage={errors.password?.message}
            label={'Password'}
          />
        </div>
        <ControlledCheckbox
          className={s.checkbox}
          control={control}
          label={'Remember me'}
          name={'rememberMe'}
        />
        <div>
          <Typography as={'a'} className={s.forgotPassword} variant={'body2'}>
            Forgot Password?
          </Typography>
        </div>
        <Button className={s.signInButton} fullWidth type={'submit'}>
          Submit
        </Button>
        <div className={s.footer}>
          <Typography className={s.text} variant={'body2'}>
            {"Don't have an account?"}
          </Typography>
          <Typography as={Link} className={s.signUp} to={'/SignUp'} variant={'link1'}>
            Sign Up
          </Typography>
        </div>
      </form>
    </Card>
  )
}
