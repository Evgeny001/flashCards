import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { store } from '@/services/store'
import { Router } from '@/utils/router'

import 'react-toastify/dist/ReactToastify.css'

export function App() {
  return (
    <Provider store={store}>
      <Router />
      <ToastContainer position={'bottom-left'} theme={'dark'} />
    </Provider>
  )
}
