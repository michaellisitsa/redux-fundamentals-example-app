import React from 'react'
import { useDispatch } from 'react-redux'
import { saveNewTodo } from '../todos/todosSlice'

function Header() {
  const [text, setText] = React.useState('')
  const dispatch = useDispatch()

  function handleChange(e) {
    setText(e.target.value)
  }

  function handleKeyDown(e) {
    const trimmedText = e.target.value.trim()
    if (e.key === 'Enter' && trimmedText) {
      dispatch(saveNewTodo(trimmedText))
      setText('')
    }
  }
  return (
    <input
      type="text"
      placeholder="What needs to be done?"
      autoFocus={true}
      value={text}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  )
}

export default Header
