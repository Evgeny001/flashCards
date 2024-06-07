import { Link } from 'react-router-dom'

import img404 from '@/assets/images/404.png'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { PageContainer } from '@/pages/pageContainer/pageContainer'

import s from './pageNotFound.module.scss'

export const PageNotFound = () => {
  return (
    <PageContainer mt={'100px'}>
      <img alt={''} src={img404} />
      <Typography className={s.text} variant={'h2'}>
        Page not found
      </Typography>
      <Button as={Link} to={'/'}>
        Back to main page
      </Button>
    </PageContainer>
  )
}
