import { CSSProperties, ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from '@/components/ui/header/header'
import { useGetMeQuery } from '@/services/auth/auth.services'
import { UserResponce } from '@/services/auth/auth.types'
import { clsx } from 'clsx'

import s from './layout.module.scss'

type Props = ComponentPropsWithoutRef<'div'> & {
  contentMarginTop?: CSSProperties['marginTop']
}

export const Layout = forwardRef<ElementRef<'div'>, Props>(
  ({ className, contentMarginTop = '36px', ...rest }, ref) => {
    const classes = clsx(className, s.main)

    const { data, isError, isLoading } = useGetMeQuery()
    const isAuth = !isError && !isLoading

    const profileData = (data: UserResponce | undefined) => ({
      avatar: data?.avatar ?? '',
      email: data?.email ?? '',
      name: data?.name ?? '',
    })
    const profile = profileData(data)

    return (
      <div ref={ref} {...rest}>
        <Header isAuth={isAuth} profile={profile} />
        <main className={classes}>
          <Outlet context={isAuth} />
        </main>
      </div>
    )
  }
)
