import { Profile } from '@/components/auth/profile'
import { PageContainer } from '@/pages/pageContainer/pageContainer'
import { useGetMeQuery, useUpdateProfileMutation } from '@/services/auth/auth.services'
import { UpdateProfileArgs } from '@/services/auth/auth.types'

export const ProfilePage = () => {
  const { data } = useGetMeQuery()
  const [updateProfile] = useUpdateProfileMutation()

  const onSubmit = (data: UpdateProfileArgs) => {
    updateProfile(data).unwrap()
  }

  const onSubmitAvatar = (avatar: File | null) => {
    updateProfile({ avatar: avatar }).unwrap()
  }

  return (
    <PageContainer mt={'36px'}>
      <Profile
        data={{ avatar: data?.avatar ?? '', email: data?.email ?? '', name: data?.name ?? '' }}
        onSubmit={onSubmit}
        onSubmitAvatar={onSubmitAvatar}
      />
    </PageContainer>
  )
}
