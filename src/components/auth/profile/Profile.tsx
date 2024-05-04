import { useState } from 'react'

import { EditTwoOutline } from '@/assets/icons/EditTwoOutline'
import { ProfileEditMode } from '@/components/auth/profile/profileEditMode/ProfileEditMode'
import { ProfileInfo } from '@/components/auth/profile/profileInfo/ProfileInfo'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card/card'
import { Typography } from '@/components/ui/typography'
import { clsx } from 'clsx'

import s from './profile.module.scss'

export type ProfileData = {
  avatarSrc?: string
  email?: string
  name: string
}

type Props = {
  className?: string
  data?: ProfileData
  logOut: () => void
  updateAvatar: () => void
  updateNickname: (data: ProfileData) => void
}

export const Profile = ({ className, data, logOut, updateAvatar, updateNickname }: Props) => {
  const [isEditMode, setIsEditMode] = useState(false)

  return (
    <Card className={clsx(s.card, className)}>
      <Typography variant={'h1'}>Personal information</Typography>
      <div className={s.wrapperAvatar}>
        <Avatar src={data?.avatarSrc} />
        <Button className={s.edit} onClick={updateAvatar} variant={'secondary'}>
          <EditTwoOutline />
        </Button>
      </div>
      {isEditMode ? (
        <ProfileEditMode
          deactivateEditMode={() => setIsEditMode(false)}
          initialValue={data?.name}
          updateNickname={updateNickname}
        />
      ) : (
        <ProfileInfo
          activeEditMode={() => setIsEditMode(true)}
          email={data?.email}
          logoutHandler={logOut}
          name={data?.name}
        />
      )}
    </Card>
  )
}
