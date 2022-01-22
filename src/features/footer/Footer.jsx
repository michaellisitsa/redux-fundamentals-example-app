import React from 'react'
import { useSelector } from 'react-redux'
import { StatusFilters } from '../filters/StatusFilters'

function Footer() {
  const todosRemaining = useSelector((state) => {
    const uncompletedTodos = state.todos.filter((todo) => !todo.completed)
    return uncompletedTodos.length
  })

  console.log(`todos Remaining: ${todosRemaining}`)
  return <div></div>
}

export default Footer
