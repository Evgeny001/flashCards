import { ComponentPropsWithoutRef } from 'react'

import * as TabsRadix from '@radix-ui/react-tabs'

import s from './tabs.module.scss'

import { Typography } from '../typography'

type Tab = {
  disabled: boolean
  value: string
}

export type Props = {
  tabs: Tab[]
  title?: string
} & ComponentPropsWithoutRef<typeof TabsRadix.Root>

export const Tabs = (props: Props) => {
  const { tabs, title, ...rest } = props

  return (
    <div className={s.wrapperTabs}>
      {title && (
        <Typography as={'span'} className={s.title} variant={'body2'}>
          {title}
        </Typography>
      )}
      <TabsRadix.Root className={s.tabsRoot} {...rest}>
        <TabsRadix.List className={s.tabsList}>
          {tabs.map(tab => (
            <>
              <TabsRadix.Trigger
                className={s.tabsTrigger}
                disabled={tab.disabled}
                key={tab.value}
                value={tab.value}
              >
                {tab.value}
              </TabsRadix.Trigger>
            </>
          ))}
        </TabsRadix.List>
      </TabsRadix.Root>
    </div>
  )
}
