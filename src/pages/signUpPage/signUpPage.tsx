import { useNavigate } from 'react-router-dom'

import { SignUpForm, SignUpFormValues } from '@/components/auth/sign-up-form'
import { FormValues } from '@/components/auth/signIn'
import { errorNotification, successNotification } from '@/lib/notifications'
import { PageContainer } from '@/pages/pageContainer/pageContainer'
import { useLoginMutation, useSignUpMutation } from '@/services/auth/auth.services'
import { SignUpErrorResponse } from '@/services/auth/auth.types'

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
      const res = await signUp(dataWithoutPasswordConfirm).unwrap()

      successNotification(`${res.name}, you are successfully registered`)
      const dataForLogin: FormValues = { rememberMe: false, ...data }

      login(dataForLogin)
      navigate('/')
    } catch (e) {
      const signUpError = e as SignUpErrorResponse

      errorNotification(signUpError.data.errorMessages[0])
    }
  }

  return (
    <PageContainer mt={'36px'}>
      <SignUpForm onSubmit={handleSubmit} />
    </PageContainer>
  )
}
