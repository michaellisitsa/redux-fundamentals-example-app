import React from 'react'
import { useSelector } from 'react-redux'
import { selectTodoIds, selectFilteredTodoIds } from './todosSlice'
import TodoListItem from './TodoListItem'

// We can't create a new reference (e.g. with a map)
// because then the component will always re-render for action dispatches.

function TodoList() {
  const todoIds = useSelector(selectFilteredTodoIds)

  // loop array
  const renderedListItems = todoIds.map((todoId) => (
    <TodoListItem key={todoId} todoId={todoId} />
  ))
  return <ul>{renderedListItems}</ul>
}

export default TodoList
