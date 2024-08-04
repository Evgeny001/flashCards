import { useNavigate } from 'react-router-dom'

import { ArrowBack } from '@/assets/icons/ArrowBack'
import { Button } from '@/components/ui/button'

import s from './backToPage.module.scss'

type Props = {
  text: string
}

export const BackToPage = ({ text }: Props) => {
  const navigate = useNavigate()

  const handleBack = () => navigate(-1)

  return (
    <Button className={s.linkBack} onClick={handleBack} variant={'link'}>
      <ArrowBack />
      {text}
    </Button>
  )
}
