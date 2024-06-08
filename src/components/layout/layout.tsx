import { CSSProperties, ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from '@/components/ui/header/header'
import { clsx } from 'clsx'

import s from './layout.module.scss'

type Props = ComponentPropsWithoutRef<'div'> & {
  contentMarginTop?: CSSProperties['marginTop']
}

export const Layout = forwardRef<ElementRef<'div'>, Props>(
  ({ className, contentMarginTop = '36px', ...rest }, ref) => {
    const classes = clsx(className, s.main)

    const profile = { avatar: '', email: 'email@gmail.com', name: 'vasya' }
    const isAuth = true

    return (
      <div ref={ref} {...rest}>
        <Header isAuth={isAuth} profile={profile} />
        <main className={classes}>
          <Outlet />
        </main>
      </div>
    )
  }
)
