import React from 'react'
import TimesSolid from './times-solid.svg'
import { useSelector, useDispatch } from 'react-redux'
import { availableColors, capitalize } from '../filters/colors'
import { selectTodoById } from './todosSlice'

function TodoListItem({ todoId }) {
  console.log('id:', todoId)
  const todo = useSelector((state) => selectTodoById(state, todoId))
  const { text, completed, color } = todo

  const dispatch = useDispatch()

  // get available colors, and populate a select box
  const colorOptions = availableColors.map((color) => (
    <option key={color} value={color}>
      {capitalize(color)}
    </option>
  ))

  function handleColorChanged(e) {
    dispatch({
      type: 'todos/colorSelected',
      payload: { todoId, color: e.target.value },
    })
  }

  return (
    <li>
      <div className="view">
        <div className="segment label">
          <input
            type="checkbox"
            checked={completed}
            onChange={() =>
              dispatch({ type: 'todos/todoToggled', payload: todoId })
            }
          />
          <div className="todo-text">{text}</div>
        </div>
        <div className="segment buttons">
          <select
            className="colorPicker"
            value={color}
            style={{ color }}
            onChange={handleColorChanged}
          >
            <option value=""></option>
            {colorOptions}
          </select>
          {/* <button className="destroy" onClick={onDelete}>
          <TimesSolid />
        </button> */}
        </div>
      </div>
    </li>
  )
}

export default TodoListItem
