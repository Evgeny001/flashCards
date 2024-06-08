import { CSSProperties, ComponentPropsWithoutRef } from 'react'

import { clsx } from 'clsx'

import s from './pageContainer.module.scss'

type Props = ComponentPropsWithoutRef<'div'> & {
  mt?: CSSProperties['marginTop']
}

export const PageContainer = ({ children, className, mt = '33px', style, ...rest }: Props) => {
  const classes = clsx(className, s.pageContainer)
  const styles: CSSProperties = { marginTop: mt, ...style }

  return (
    <div className={classes} style={styles} {...rest}>
      {children}
    </div>
  )
}
