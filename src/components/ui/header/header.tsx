import { Link } from 'react-router-dom'

import { Logo } from '@/assets/icons/Logo'
import { Button } from '@/components/ui/button'
import { HeaderDropDown } from '@/components/ui/header/HeaderDropDown/headerDropDown'

import s from './header.module.scss'

export type ProfileData = {
  avatar: string
  email: string
  name: string
}

type Props = {
  isAuth: boolean
  profile: ProfileData
}

export const Header = ({ isAuth, profile }: Props) => {
  return (
    <header className={s.header}>
      <div className={s.wrapper}>
        <Link className={s.logo} to={'/'}>
          <Logo />
        </Link>

        {isAuth ? (
          <HeaderDropDown profileData={profile} />
        ) : (
          <Button as={Link} to={'login'} variant={'secondary'}>
            Sign In
          </Button>
        )}
      </div>
    </header>
  )
}
