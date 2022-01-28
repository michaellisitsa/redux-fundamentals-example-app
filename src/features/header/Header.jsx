import React from 'react'
import { useDispatch } from 'react-redux'
import { saveNewTodo } from '../todos/todosSlice'

function Header() {
  const [text, setText] = React.useState('')
  const [status, setStatus] = React.useState('idle')
  const dispatch = useDispatch()

  function handleChange(e) {
    setText(e.target.value)
  }

  async function handleKeyDown(e) {
    const trimmedText = e.target.value.trim()
    if (e.key === 'Enter' && trimmedText) {
      // Set loading state
      setStatus('loading')
      await dispatch(saveNewTodo(trimmedText))
      setText('')
      setStatus('idle')
    }
  }

  let isLoading = status === 'loading'
  let placeholder = isLoading ? '' : 'What needs to be done?'
  let loader = isLoading ? <div className="loader" /> : null

  return (
    <header className="header">
      <input
        type="text"
        placeholder="What needs to be done?"
        autoFocus={true}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />
      {loader}
    </header>
  )
}

export default Header
