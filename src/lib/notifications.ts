import { toast } from 'react-toastify'

export const errorNotification = (message: string) => {
  return toast.error(message)
}

export const successNotification = (message: string) => {
  return toast.success(message)
}
