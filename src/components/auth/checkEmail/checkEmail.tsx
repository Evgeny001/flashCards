import { Link, useLocation } from 'react-router-dom'

import { CheckEmailIcon } from '@/assets/icons/CheckEmailIcon'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card/card'
import { Typography } from '@/components/ui/typography'

import s from './checkEmail.module.scss'

export const CheckEmail = () => {
  const { state } = useLocation()

  return (
    <Card className={s.card}>
      <div className={s.content}>
        <Typography variant={'h1'}>Check Email</Typography>
        <div className={s.wrapperIcon}>
          <CheckEmailIcon />
        </div>
        <Typography className={s.description} variant={'body2'}>
          We’ve sent an Email with instructions to {state ? state.email : 'example@test.com'}
        </Typography>
        <Button as={Link} fullWidth to={'/login'} variant={'primary'}>
          Back to Sign In
        </Button>
      </div>
    </Card>
  )
}
