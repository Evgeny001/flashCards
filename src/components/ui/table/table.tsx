import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './table.module.scss'

type TableProps = ComponentPropsWithoutRef<'table'>
export const Table = forwardRef<ElementRef<'table'>, TableProps>((props, ref) => {
  const { className, ...rest } = props
  const computedClass = clsx(s.table, className)

  return (
    <>
      <table className={computedClass} ref={ref} {...rest}></table>
    </>
  )
})

type TableRowProps = ComponentPropsWithoutRef<'tr'>
export const TableRow = forwardRef<ElementRef<'tr'>, TableRowProps>((props, ref) => {
  const { className, ...rest } = props
  const computedClass = clsx(s.tr, className)

  return <tr className={computedClass} ref={ref} {...rest} />
})

type TableHeadProps = ComponentPropsWithoutRef<'thead'>
export const TableHead = forwardRef<ElementRef<'thead'>, TableHeadProps>((props, ref) => {
  const { className, ...rest } = props
  const computedClass = clsx(s.tHead, className)

  return <thead className={computedClass} ref={ref} {...rest} />
})

type TableHeadCellProps = ComponentPropsWithoutRef<'th'>
export const TableHeadCell = forwardRef<ElementRef<'th'>, TableHeadCellProps>((props, ref) => {
  const { className, ...rest } = props
  const computedClass = clsx(s.th, className)

  return <th className={computedClass} ref={ref} {...rest} />
})

type TableBodyProps = ComponentPropsWithoutRef<'tbody'>
export const TableBody = forwardRef<ElementRef<'tbody'>, TableBodyProps>((props, ref) => {
  const { className, ...rest } = props
  const computedClass = clsx(s.tBody, className)

  return <tbody className={computedClass} ref={ref} {...rest} />
})

type TableCellProps = ComponentPropsWithoutRef<'td'>
export const TableCell = forwardRef<ElementRef<'td'>, TableCellProps>((props, ref) => {
  const { className, ...rest } = props
  const computedClass = clsx(s.td, className)

  return <td className={computedClass} ref={ref} {...rest} />
})
