import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { CreateNewPassword } from '@/components/auth/createNewPassword'
import { PageContainer } from '@/pages/pageContainer/pageContainer'
import { useCreateNewPasswordMutation } from '@/services/auth/auth.services'
import { CreateNewPasswordArgs } from '@/services/auth/auth.types'

export const CreateNewPasswordPage = () => {
  const navigate = useNavigate()

  const [createNewPassword] = useCreateNewPasswordMutation()

  const handleSubmit = async (data: CreateNewPasswordArgs) => {
    await createNewPassword(data)
    toast.success('The password has been changed')
    navigate('/login')
  }

  return (
    <PageContainer>
      <CreateNewPassword onSubmit={handleSubmit} />
    </PageContainer>
  )
}
