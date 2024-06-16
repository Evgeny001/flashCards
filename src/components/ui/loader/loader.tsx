import loader from '@/assets/images/loader.gif'

export const Loader = (props: { className?: string }) => {
  return (
    <div style={{ left: 'calc(50% - 50px)', position: 'fixed', top: '40%' }}>
      <img alt={'loader'} src={loader} {...props} width={100} />
    </div>
  )
}
