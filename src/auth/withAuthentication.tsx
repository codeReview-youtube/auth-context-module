import React, { ComponentType } from 'react'
import { AuthContext, IAuthContext } from './AuthContext'

export function withAuthentication<T>(
  Component: ComponentType<T & { auth: IAuthContext }>
) {
  return (props: T) => {
    return (
      <AuthContext.Consumer>
        {(auth) => <Component {...props} auth={auth} />}
      </AuthContext.Consumer>
    )
  }
}
