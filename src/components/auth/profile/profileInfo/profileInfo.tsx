import { EditTwoOutline } from '@/assets/icons/EditTwoOutline'
import { LogOut } from '@/assets/icons/LogOut'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { useLogoutMutation } from '@/services/auth/auth.services'

import s from './profileInfo.module.scss'

type Props = {
  activeEditMode: () => void
  email?: string
  name?: string
}

export const ProfileInfo = ({ activeEditMode, email, name }: Props) => {
  const [logout] = useLogoutMutation()

  return (
    <div className={s.wrapper}>
      <div className={s.wrapperName}>
        <Typography variant={'h2'}>{name}</Typography>

        <EditTwoOutline className={s.edit} height={'16'} onClick={activeEditMode} width={'16'} />
      </div>
      <Typography className={s.email} variant={'body2'}>
        {email}
      </Typography>
      <Button onClick={() => logout()} variant={'secondary'}>
        <LogOut height={'16'} width={'16'} />
        Logout
      </Button>
    </div>
  )
}
