import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { Layout } from '@/components/layout/layout'
import { Loader } from '@/components/ui/loader'
import { CheckEmailPage } from '@/pages/checkEmailPage/checkEmailPage'
import { CreateNewPasswordPage } from '@/pages/createNewPasswordPage/createNewPasswordPage'
import { DecksPage } from '@/pages/decks/decksPage'
import { LearnCardPage } from '@/pages/learnCardPage/learnCardPage'
import { PageNotFound } from '@/pages/pageNotFound/pageNotFound'
import { ProfilePage } from '@/pages/profilePage/profilePage'
import { RecoverPasswordPage } from '@/pages/recoverPasswordPage/recoverPasswordPage'
import { SignInPage } from '@/pages/signInPage/signInPage'
import { SignUpPage } from '@/pages/signUpPage/signUpPage'
import { useGetMeQuery } from '@/services/auth/auth.services'

const publicRoutes: RouteObject[] = [
  {
    element: <SignInPage />,
    path: '/login',
  },
  {
    element: <RecoverPasswordPage />,
    path: '/recover-password',
  },
  {
    element: <CheckEmailPage />,
    path: '/check-email',
  },
  {
    element: <CreateNewPasswordPage />,
    path: '/create-new-password/:token',
  },
  {
    element: <SignUpPage />,
    path: '/sign-up',
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
    element: <LearnCardPage />,
    path: '/decks/:deckId/learn',
  },
  {
    element: <ProfilePage />,
    path: '/profile',
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

  if (isMeLoading) {
    return <Loader />
  }

  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const { isError } = useGetMeQuery()

  const isAuthenticated = !isError

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}
