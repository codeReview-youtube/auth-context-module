import { createContext, useEffect, useReducer } from 'react'
import authReducer, { Actions } from './reducer'

interface IContextActions {
  addUser: (user: any) => void
  updateUser: (user: any) => void
}

export interface IAuthContext {
  isAuthenticated: boolean
  user: any
}

const defaultState: IAuthContext = {
  isAuthenticated: false,
  user: null,
}
export const AuthContext = createContext<IAuthContext>(defaultState)

export function useAuthContext(): IAuthContext & IContextActions {
  const [state, dispatch] = useReducer(authReducer, defaultState)

  useEffect(() => {
    const cachedUser = localStorage.getItem('user')
    if (cachedUser) {
      dispatch({
        type: Actions.GET_USER_CACHE,
        user: JSON.parse(cachedUser),
      })
    }
  }, [])
  const addUser = (user: any) =>
    dispatch({
      type: Actions.ADD_USER,
      user,
    })
  const updateUser = (user: any) =>
    dispatch({
      type: Actions.UPDATE_USER,
      user,
    })

  return {
    ...state,
    addUser,
    updateUser,
  }
}
