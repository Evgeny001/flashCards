import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { FormValues, SignIn } from '@/components/auth/signIn'
import { PageContainer } from '@/pages/pageContainer/pageContainer'
import { useLoginMutation } from '@/services/auth/auth.services'
import { SignInErrorResponse } from '@/services/auth/auth.types'

export const SignInPage = () => {
  const [login] = useLoginMutation()

  const navigate = useNavigate()
  const handleSubmit = async (data: FormValues) => {
    try {
      await login(data).unwrap()
      toast.success('You are successfully authorized')
      navigate('/')
    } catch (e) {
      const signInError = e as SignInErrorResponse

      toast.error(signInError.data?.message)
    }
  }

  return (
    <PageContainer mt={'36px'}>
      <SignIn onSubmit={handleSubmit} />
    </PageContainer>
  )
}
