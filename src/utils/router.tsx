import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
  useOutletContext,
} from 'react-router-dom'

import { Layout } from '@/components/layout/layout'
import { DecksPage } from '@/pages/decks/decksPage'
import { LearnPage } from '@/pages/learnPage/learnPage'
import { PageNotFound } from '@/pages/pageNotFound/pageNotFound'
import { SignInPage } from '@/pages/signInPage/signInPage'
import { useGetMeQuery } from '@/services/auth/auth.services'

const publicRoutes: RouteObject[] = [
  {
    element: <SignInPage />,
    path: '/login',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <DecksPage />,
    path: '/',
  },
  // {
  //   element: <DeckPage />,
  //   path: '/decks/:deckId',
  // },
  {
    element: <LearnPage />,
    path: '/decks/:deckId/learn',
  },
]

export const router = createBrowserRouter([
  {
    children: [
      {
        children: privateRoutes,
        element: <PrivateRoutes />,
        errorElement: <PageNotFound />,
      },
      ...publicRoutes,
    ],
    element: <Layout />,
    errorElement: <PageNotFound />,
    path: '/',
  },
])

export function Router() {
  const { isLoading: isMeLoading } = useGetMeQuery()

  // console.log(isMeLoading + ' - загрузка')
  if (isMeLoading) {
    return <div style={{ fontSize: '50px', margin: '50px' }}>Preloader</div>
  }

  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const isAuthenticated = useOutletContext()

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}
