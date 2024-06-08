import { useNavigate } from 'react-router-dom'

import { FormValues, SignIn } from '@/components/auth/signIn'
import { useLoginMutation } from '@/services/auth/auth.services'

export const SignInPage = () => {
  const [login] = useLoginMutation()
  const navigate = useNavigate()
  const handleSubmit = (data: FormValues) => {
    try {
      login(data).unwrap()
      navigate('/')
    } catch (e: any) {
      console.log(e.data.message)
    }
  }

  return <SignIn onSubmit={handleSubmit} />
}
