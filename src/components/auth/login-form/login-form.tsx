import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { ControlledCheckbox } from '@/components/ui/controlled/controlled-checkbox'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean(),
})

export type FormValues = z.infer<typeof loginSchema>
// export type FormValues = {
//   email: string
//   password: string
//   rememberMe: boolean
// } //заменили на инфер

export const LoginForm = () => {
  const {
    control,
    formState: { errors },
    getFieldState,
    handleSubmit,
    register,
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  //const { errors } = formState

  console.log(getFieldState('email'))
  //console.log(formState)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input errorMessage={errors.email?.message} {...register('email')} label={'email'} />
      <Input {...register('password')} errorMessage={errors.password?.message} label={'password'} />
      <ControlledCheckbox control={control} label={'remember me'} name={'rememberMe'} />
      <Button type={'submit'}>Submit</Button>
    </form>
  )
}
