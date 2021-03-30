import React from 'react'
import { AuthContext, useAuthContext } from './AuthContext'

export function AuthProvider({ children }: any) {
  const authState = useAuthContext()
  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  )
}
