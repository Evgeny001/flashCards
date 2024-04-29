import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { ControlledCheckbox } from '@/components/ui/controlled/controlled-checkbox/controlled-checkbox'
import { ControlledRadioGroup } from '@/components/ui/controlled/controlled-radioGroup/controlled-radioGroup'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  radio: z.string(),
  rememberMe: z.boolean(),
})

export type FormValues = z.infer<typeof loginSchema>
// export type FormValues = {
//   email: string
//   password: string
//   rememberMe: boolean
// } //заменили на инфер
//
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
      <ControlledRadioGroup
        control={control}
        name={'radio'}
        options={[
          { label: '10', value: '10' },
          { label: '20', value: '20' },
          { label: '30', value: '30' },
        ]}
      />
      <Button type={'submit'}>Submit</Button>
    </form>
  )
}
