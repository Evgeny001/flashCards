import { useNavigate } from 'react-router-dom'

import { FormValues, SignIn } from '@/components/auth/signIn'
import { useLoginMutation } from '@/services/auth/auth.services'

export const SignInPage = () => {
  const [login] = useLoginMutation()
  const navigate = useNavigate()
  const handleSubmit = async (data: FormValues) => {
    await login(data).unwrap()
    navigate('/')
  }

  return <SignIn onSubmit={handleSubmit} />
}
