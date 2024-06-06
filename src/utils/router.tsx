import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { SignIn } from '@/components/auth/signIn'
import { Layout } from '@/components/layout/layout'
import { DecksPage } from '@/pages/decks/decksPage'
import { PageNotFound } from '@/pages/pageNotFound/pageNotFound'

const publicRoutes: RouteObject[] = [
  {
    element: <SignIn onSubmit={() => {}} />,
    path: '/login',
  },
  {
    element: <PageNotFound />,
    path: '/*',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <DecksPage />,
    path: '/',
  },
]

// const router = createBrowserRouter([
//   {
//     children: privateRoutes,
//     element: <PrivateRoutes />,
//   },
//   ...publicRoutes,
// ])

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
