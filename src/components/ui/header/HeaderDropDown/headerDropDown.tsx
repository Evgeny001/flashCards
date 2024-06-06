import { useNavigate } from 'react-router-dom'

import { LogOut } from '@/assets/icons/LogOut'
import { PersonOutline } from '@/assets/icons/PersonOutline'
import { Avatar } from '@/components/ui/avatar'
import { DropDownItem, DropdownMenu, DropdownSeparator } from '@/components/ui/dropdown'
import { DropdownItemWithIcon } from '@/components/ui/dropdown/dropdownItemWithIcon'
import { ProfileData } from '@/components/ui/header/header'
import { Typography } from '@/components/ui/typography'

import s from './headerDropDown.module.scss'

type Props = {
  profileData: ProfileData
}

export const HeaderDropDown = ({ profileData }: Props) => {
  const trigger = <Avatar name={'Leonid'} variant={'small'} />

  const logout = () => {
    console.log('logout')
  }

  const navigate = useNavigate()

  const toProfile = () => {
    navigate('/profile')
  }

  return (
    <div>
      <DropdownMenu trigger={trigger}>
        <DropDownItem className={s.avatar}>
          <Avatar name={profileData.name} src={profileData.avatar} variant={'small'} />
          <div className={s.info}>
            <Typography variant={'subtitle1'}>{profileData.name}</Typography>
            <Typography variant={'caption'}>{profileData.email}</Typography>
          </div>
        </DropDownItem>
        <DropdownSeparator />
        <DropdownItemWithIcon
          icon={<PersonOutline className={s.icon} />}
          onSelect={toProfile}
          value={'My Profile'}
        />
        <DropdownSeparator />
        <DropdownItemWithIcon
          icon={<LogOut className={s.icon} />}
          onSelect={logout}
          value={'Log Out'}
        />
      </DropdownMenu>
    </div>
  )
}
