import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { ControlledRadioGroup } from '@/components/ui/controlled/controlled-radioGroup'
import { Option } from '@/components/ui/radioGroup'
import { Typography } from '@/components/ui/typography'
import { clsx } from 'clsx'

import s from './rate.module.scss'

export type Grade = {
  grade: '1' | '2' | '3' | '4' | '5' | string
}

type Props = {
  className?: string
  onSubmit: (data: Grade) => void
}

export const Rate = ({ className, onSubmit }: Props) => {
  const options: Option[] = [
    { label: 'Did not know', value: '1' },
    { label: 'Forgot', value: '2' },
    { label: 'A lot of thought', value: '3' },
    { label: 'Сonfused', value: '4' },
    { label: 'Knew the answer', value: '5' },
  ]

  const { control, handleSubmit } = useForm({
    defaultValues: {
      grade: '1',
    },
  })

  return (
    <form className={clsx(s.form, className)} onSubmit={handleSubmit(onSubmit)}>
      <Typography variant={'subtitle1'}>Rate yourself:</Typography>

      <ControlledRadioGroup
        className={s.radioGroup}
        control={control}
        name={'grade'}
        options={options}
      />
      <Button fullWidth type={'submit'}>
        Next Question
      </Button>
    </form>
  )
}
