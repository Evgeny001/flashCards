import * as SliderRadix from '@radix-ui/react-slider'

import s from './slider.module.scss'

import { Typography } from '../typography'

export type Props = {
  max?: number | undefined
  min?: number | undefined
  onValueChange?: (value: number[]) => void
  value: number[]
}

export const Slider = (props: Props) => {
  const { max = 100, min = 0, onValueChange, value } = props

  return (
    <div className={s.wrapper}>
      <Typography as={'span'} className={s.sliderValue}>
        {value[0]}
      </Typography>
      <SliderRadix.Root
        className={s.SliderRoot}
        max={max}
        min={min}
        minStepsBetweenThumbs={1}
        onValueChange={onValueChange}
        step={1}
        value={value}
      >
        <SliderRadix.Track className={s.SliderTrack}>
          <SliderRadix.Range className={s.SliderRange} />
        </SliderRadix.Track>
        <SliderRadix.Thumb aria-label={'Volume'} className={s.SliderThumb} />
        <SliderRadix.Thumb aria-label={'Volume'} className={s.SliderThumb} />
      </SliderRadix.Root>
      <Typography as={'span'} className={s.sliderValue}>
        {value[1]}
      </Typography>
    </div>
  )
}
