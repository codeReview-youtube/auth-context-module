interface IAction {
  type: string
  [prop: string]: any
}

export enum Actions {
  ADD_USER = 'ADD_USER',
  UPDATE_USER = 'UPDATE_USER',
  GET_USER_CACHE = 'GET_USER_CACHE',
}
export default function reducer(state: any, action: IAction) {
  switch (action.type) {
    case Actions.ADD_USER:
      localStorage.setItem('user', JSON.stringify(action.user))
      return {
        ...state,
        user: action.user,
        isAuthenticated: true,
      }
    case Actions.UPDATE_USER:
      localStorage.setItem('user', JSON.stringify(action.user))
      return {
        ...state,
        user: { ...state.user, ...action.user },
      }

    case Actions.GET_USER_CACHE:
      return {
        ...state,
        user: action.user,
        isAuthenticated: true,
      }
  }
}
