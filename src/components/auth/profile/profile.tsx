import { ChangeEvent, useRef, useState } from 'react'

import { EditTwoOutline } from '@/assets/icons/EditTwoOutline'
import { ProfileEditMode } from '@/components/auth/profile/profileEditMode/profileEditMode'
import { ProfileInfo } from '@/components/auth/profile/profileInfo/profileInfo'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card/card'
import { Typography } from '@/components/ui/typography'
import { UpdateProfileArgs } from '@/services/auth/auth.types'
import { clsx } from 'clsx'

import s from './profile.module.scss'

export type ProfileDefaultData = {
  avatar?: string
  email?: string
  name?: string
}

type Props = {
  className?: string
  data?: ProfileDefaultData
  onSubmit: (data: UpdateProfileArgs) => void
  onSubmitAvatar: (avatar: File | null) => void
}

export const Profile = ({ className, data, onSubmit, onSubmitAvatar }: Props) => {
  const [isEditMode, setIsEditMode] = useState(false)

  const originalInput = useRef<HTMLInputElement | null>(null)
  const onClickChoiceImage = () => originalInput?.current?.click()

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      onSubmitAvatar(file)
    }
  }

  return (
    <Card className={clsx(s.card, className)}>
      <Typography variant={'h1'}>Personal information</Typography>
      <div className={s.wrapperAvatar}>
        <Avatar src={data?.avatar} />
        <input
          accept={'image/*'}
          onChange={uploadHandler}
          ref={originalInput}
          style={{ display: 'none' }}
          type={'file'}
        />
        <Button className={s.edit} onClick={onClickChoiceImage} variant={'secondary'}>
          <EditTwoOutline />
        </Button>
      </div>
      {isEditMode ? (
        <ProfileEditMode
          deactivateEditMode={() => setIsEditMode(false)}
          initialValue={data?.name}
          updateNickname={onSubmit}
        />
      ) : (
        <ProfileInfo
          activeEditMode={() => setIsEditMode(true)}
          email={data?.email}
          name={data?.name}
        />
      )}
    </Card>
  )
}
