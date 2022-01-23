import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import TodoListItem from './TodoListItem'

// We can't create a new reference (e.g. with a map)
// because then the component will always re-render for action dispatches.
const selectTodoIds = (state) => state.todos.map((todo) => todo.id)

function TodoList() {
  const todoIds = useSelector(selectTodoIds, shallowEqual)

  // loop array
  const renderedListItems = todoIds.map((todoId) => (
    <TodoListItem key={todoId} todoId={todoId} />
  ))
  return <ul>{renderedListItems}</ul>
}

export default TodoList
