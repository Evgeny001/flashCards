import s from './loader.module.scss'

export const Loader = () => {
  return (
    <div
      className={s.loader}
      style={{ left: 'calc(50% - 50px)', position: 'fixed', top: '30%' }}
    ></div>
  )
}
