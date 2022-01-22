import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TodoListItem from './TodoListItem'

// We can't create a new reference (e.g. with a map)
// because then the component will always re-render for action dispatches.
const selectTodos = (state) => state.todos

function TodoList() {
  const todos = useSelector(selectTodos)
  const dispatch = useDispatch()

  // loop array
  const renderedListItems = todos.map((todo) => (
    <TodoListItem key={todo.id} todoId={todo.id} dispatch={dispatch} />
  ))
  return <ul>{renderedListItems}</ul>
}

export default TodoList
