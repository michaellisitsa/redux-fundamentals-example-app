import React from 'react'
import { useSelector } from 'react-redux'
import { selectFilteredTodoIds } from './todosSlice'
import TodoListItem from './TodoListItem'

// We can't create a new reference (e.g. with a map)
// because then the component will always re-render for action dispatches.

function TodoList() {
  const todoIds = useSelector(selectFilteredTodoIds)
  const loadingStatus = useSelector((state) => state.todos.status)

  if (loadingStatus === 'loading') {
    return (
      <div className="todo-list">
        <div className="loader" />
      </div>
    )
  }

  // loop array
  const renderedListItems = todoIds.map((todoId) => (
    <TodoListItem key={todoId} todoId={todoId} />
  ))
  return <ul>{renderedListItems}</ul>
}

export default TodoList
