import { SignIn } from '@/components/auth/signIn'

export const login = () => {
  return (
    <SignIn
      onSubmit={data => {
        console.log(data)
      }}
    />
  )
}
