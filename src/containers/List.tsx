import React from 'react'
import { connect } from 'react-redux'
import { deleteTodo, ITodo } from '../store/todosReducer'
import { IAuthContext, useAuthContext, withAuthentication } from '../auth'

interface IProps {
  todos: ITodo[]
  todo: ITodo
  deleteTodo: (id: string | number) => void
  auth: IAuthContext
}

function List(props: IProps) {
  // const authState = useAuthContext()
  return (
    <div>
      <h3>
        {props.auth.user.firstName} - {props.auth.user.lastName}
      </h3>
      <ul>
        {props.todos.map((td) => (
          <li key={td.uid}>
            <p>{td.title}</p>
            <p
              style={{ color: 'red' }}
              onClick={() => props.deleteTodo(td.uid)}
            >
              X
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

const mapState = ({ todoState }: any) => ({
  todo: todoState.todo,
  todos: todoState.todos,
})
const mapDispatch = (dispatch: any) => ({
  deleteTodo: (id: string | number) => dispatch(deleteTodo(id)),
})

export default withAuthentication(connect(mapState, mapDispatch)(List))
