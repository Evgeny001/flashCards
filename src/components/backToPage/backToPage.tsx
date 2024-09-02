import { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'

import { ArrowBack } from '@/assets/icons/ArrowBack'

import s from './backToPage.module.scss'

// type Props = {
//   text: string
// }

// export const BackToPage = ({ text }: Props) => {
//   const navigate = useNavigate()
//
//   const handleBack = () => navigate(-1)
//
//   return (
//     <Button className={s.linkBack} onClick={handleBack} variant={'link'}>
//       <ArrowBack />
//       {text}
//     </Button>
//   )
// }

export type Props = { to: string } & ComponentPropsWithoutRef<'a'>

export const BackToPage = (props: Props) => {
  const { children, to, ...restProps } = props

  return (
    <Link to={to} {...restProps} className={s.linkBack}>
      <ArrowBack /> {children}
    </Link>
  )
}
