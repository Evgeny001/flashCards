import { EditTwoOutline } from '@/assets/icons/EditTwoOutline'
import { LogOut } from '@/assets/icons/LogOut'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

import s from './profileInfo.module.scss'

type Props = {
  activeEditMode: () => void
  email?: string
  logoutHandler: () => void
  name?: string
}

export const ProfileInfo = ({ activeEditMode, email, logoutHandler, name }: Props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.wrapperName}>
        <Typography variant={'h2'}>{name}</Typography>

        <EditTwoOutline className={s.edit} height={'16'} onClick={activeEditMode} width={'16'} />
      </div>
      <Typography className={s.email} variant={'body2'}>
        {email}
      </Typography>
      <Button onClick={logoutHandler} variant={'secondary'}>
        <LogOut height={'16'} width={'16'} />
        Logout
      </Button>
    </div>
  )
}
