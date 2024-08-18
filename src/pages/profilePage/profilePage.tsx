import { toast } from 'react-toastify'

import { Profile } from '@/components/auth/profile'
import { PageContainer } from '@/pages/pageContainer/pageContainer'
import { useGetMeQuery, useUpdateProfileMutation } from '@/services/auth/auth.services'
import { UpdateProfileArgs } from '@/services/auth/auth.types'

export const ProfilePage = () => {
  const { data } = useGetMeQuery()
  const [updateProfile] = useUpdateProfileMutation()

  const onSubmit = async (data: UpdateProfileArgs) => {
    const updateProfilePromise = updateProfile(data).unwrap()

    await toast.promise(updateProfilePromise, {
      error: 'Failed to update profile',
      pending: 'Updating profile...',
      success: 'Profile updated successfully!',
    })
  }

  const onSubmitAvatar = async (avatar: File | null) => {
    const updateProfilePromise = updateProfile({ avatar: avatar }).unwrap()

    await toast.promise(updateProfilePromise, {
      error: 'Failed to update avatar',
      pending: 'Updating avatar...',
      success: 'Avatar updated successfully!',
    })
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
