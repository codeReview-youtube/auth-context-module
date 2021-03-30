import { AnyAction } from 'redux'
import { todos } from './mocks'

enum Actions {
  ADD_TODO = 'ADD_TODO',
  ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS',
  ADD_TODO_FAILURE = 'ADD_TODO_FAILURE',

  DELETE_TODO = 'DELETE_TODO',
  DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS',
  DELETE_TODO_FAILURE = 'DELETE_TODO_FAILURE',

  UPDATE_TODO = 'UPDATE_TODO',
  UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS',
  UPDATE_TODO_FAILURE = 'UPDATE_TODO_FAILURE',
}

export interface ITodo {
  uid: string | number
  title: string
  isCompleted: boolean
  lastUpdateAt: number | Date
}

export interface ITodoState {
  todos: ITodo[]
  addTodoError?: any
  updateTodoError?: any
  deleteTodoError?: any
  todo?: ITodo
  isAdding: boolean
  isUpdating: boolean
  isDeleting: boolean
}

const defaultState: ITodoState = {
  todos,
  isAdding: false,
  isDeleting: false,
  isUpdating: false,
}
export default function (
  state: ITodoState = defaultState,
  action: AnyAction
): ITodoState {
  switch (action.type) {
    case Actions.ADD_TODO:
      return {
        ...state,
        isAdding: true,
      }
    case Actions.ADD_TODO_SUCCESS:
      const isExist = state.todos.find((to) => to.uid === action.todo.uid)
      return {
        ...state,
        isAdding: false,
        todo: action.todo,
        todos: isExist ? state.todos : [...state.todos, action.todo],
      }
    case Actions.ADD_TODO_FAILURE:
      return {
        ...state,
        isAdding: false,
        addTodoError: action.error,
      }
    case Actions.UPDATE_TODO:
      return {
        ...state,
        isUpdating: true,
      }
    case Actions.UPDATE_TODO_SUCCESS:
      const found = state.todos.find((to) => to.uid === action.todo.uid)
      const updatedTodo = {
        ...found,
        ...{ ...action.todo, lastUpdateAt: Date.now() },
      }
      return {
        ...state,
        isUpdating: false,
        todo: updatedTodo,
        todos: [
          ...state.todos.filter((to) => to.uid === action.todo.uid),
          updatedTodo,
        ],
      }
    case Actions.UPDATE_TODO_FAILURE:
      return {
        ...state,
        isAdding: false,
        updateTodoError: action.error,
      }
    case Actions.DELETE_TODO:
      return {
        ...state,
        isDeleting: true,
      }
    case Actions.DELETE_TODO_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        todos: state.todos.filter((u) => u.uid !== action.uid),
      }
    case Actions.DELETE_TODO_FAILURE:
      return {
        ...state,
        isAdding: false,
        deleteTodoError: action.error,
      }

    default:
      return state
  }
}

export function deleteTodo(uid: string | number) {
  return {
    type: Actions.DELETE_TODO_SUCCESS,
    uid,
  }
}

export function addTodo(todo: ITodo) {
  return {
    type: Actions.ADD_TODO_SUCCESS,
    todo,
  }
}

export function updateTodo(todo: ITodo) {
  return {
    type: Actions.UPDATE_TODO_SUCCESS,
    todo,
  }
}
