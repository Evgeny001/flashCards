import { Dialog, DialogProps } from '@/components/ui/dialog'

import s from './deleteDeckDialog.module.scss'
export default {}
type Props = {
  deckName: string
} & Pick<DialogProps, 'onCancel' | 'onConfirm' | 'onOpenChange' | 'open'>
export const DeleteDeckDialog = ({ deckName, ...dialogProps }: Props) => {
  return (
    <Dialog {...dialogProps} title={'Delete deck'}>
      <div className={s.content}>
        <p>
          Do you really want to remove <strong>{deckName}</strong>?
        </p>
        <p>All cards will be deleted.</p>
      </div>
    </Dialog>
  )
}
