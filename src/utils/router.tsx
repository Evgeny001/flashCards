import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { Layout } from '@/components/layout/layout'
import { DecksPage } from '@/pages/decks/decksPage'
import { LearnPage } from '@/pages/learnPage/learnPage'
import { PageNotFound } from '@/pages/pageNotFound/pageNotFound'
import { SignInPage } from '@/pages/signInPage/signInPage'

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
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}
