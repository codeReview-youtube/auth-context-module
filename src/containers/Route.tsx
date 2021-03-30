import React from 'react'
import { useAuthContext } from '../auth'
import List from './List'

interface IProps {}

export default function Route(props: IProps) {
  const authState = useAuthContext()

  return (
    <React.Fragment>
      {authState.isAuthenticated ? (
        <List />
      ) : (
        <div>
          <button
            onClick={() =>
              authState.addUser({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@hem.com',
              })
            }
          >
            Log me in
          </button>
        </div>
      )}
    </React.Fragment>
  )
}
