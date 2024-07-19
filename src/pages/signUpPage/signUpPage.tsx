import { SignUpForm, SignUpFormValues } from '@/components/auth/sign-up-form'
import { PageContainer } from '@/pages/pageContainer/pageContainer'
import { useLoginMutation, useSignUpMutation } from '@/services/auth/auth.services'
import { FormValues } from '@/components/auth/signIn'
import { useNavigate } from 'react-router-dom'

export const SignUpPage = () => {
  const [signUp] = useSignUpMutation()
  const [login] = useLoginMutation()
  const navigate = useNavigate()
  // const handleSubmit = async (data: Omit<FormValues, 'sendConfirmationEmail'>) => {
  //   const { passwordConfirm, ...dataWithoutPasswordConfirm } = data
  //   await signUp(dataWithoutPasswordConfirm).unwrap() //изучить что такое .unwrap() взял у Лени
  //   console.log(dataWithoutPasswordConfirm)
  // }
  const handleSubmit = async (data: Omit<SignUpFormValues, 'sendConfirmationEmail'>) => {
    try {
      const { passwordConfirm, ...dataWithoutPasswordConfirm } = data
      // Деструктурирую объект, оставляю только нужные свойства
      await signUp(dataWithoutPasswordConfirm).unwrap()

      const dataForLogin: FormValues = { rememberMe: false, ...data }

      login(dataForLogin)
      navigate('/')
    } catch {}
  }

  return (
    <PageContainer mt={'36px'}>
      <SignUpForm onSubmit={handleSubmit} />
    </PageContainer>
  )
}
