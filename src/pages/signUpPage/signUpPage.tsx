import { FormValues, SignUpForm } from '@/components/auth/sign-up-form'
import { PageContainer } from '@/pages/pageContainer/pageContainer'

export const SignUpPage = () => {
  const handleSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <PageContainer mt={'36px'}>
      <SignUpForm onSubmit={handleSubmit} />
    </PageContainer>
  )
}
