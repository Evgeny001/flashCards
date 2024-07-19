export type UserResponce = {
  avatar: null | string
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
}

export type LoginResponse = {
  accessToken: string
  refreshToken: string
}

export type LoginArgs = {
  email: string
  password: string
  rememberMe?: boolean
}

export type UpdateProfileArgs = {
  avatar?: File | null
  name?: string
}

export type RecoverPasswordArgs = {
  email: string
  html: string
  subject?: string
}

export type CreateNewPasswordArgs = {
  password: string
  token: string
}
export type SingUpArgs = {
  email: string
  html?: string
  name?: string
  password: string
  sendConfirmationEmail?: boolean
  subject?: string
}

export type SingUpResponse = {
  avatar: string
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
}
