import { RecoverPassword, RecoverPasswordFormValues } from '@/components/auth/recoverPassword'
import { PageContainer } from '@/pages/pageContainer/pageContainer'
import { useRecoverPasswordMutation } from '@/services/auth/auth.services'

export const RecoverPasswordPage = () => {
  const [recoverPassword] = useRecoverPasswordMutation()
  const onSubmit = async (data: RecoverPasswordFormValues) => {
    recoverPassword({
      email: data.email,
      html: `<h1>Hi, ##name##</h1><p>Click <a href="https://flash-cards-wine.vercel.app//recover-password/##token##">here</a> to recover your password</p>`,
      subject: 'recover-password flashcards',
    })
  }

  return (
    <PageContainer mt={'36px'}>
      <RecoverPassword onSubmit={onSubmit} />
    </PageContainer>
  )
}
