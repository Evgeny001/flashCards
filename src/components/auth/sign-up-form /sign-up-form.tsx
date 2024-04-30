import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

export type FormValues = {
  email: string
  pass: string
  passConfirm: string
}
export const SignUpForm = () => {
  const { register, handleSubmit } = useForm<FormValues>()
  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register('email')} type={'text'} />
        <Input {...register('pass')} type={'password'} />
        <Input {...register('passConfirm')} type={'password'} />
        <Button type={'submit'}>Submit</Button>
      </form>
    </>
  )
}
