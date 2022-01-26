import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  StatusFilters,
  ColorFilters,
  colorFilterChanged,
} from '../filters/filtersSlice'
import { availableColors, capitalize } from '../filters/colors'
import './Footer.css'

function StatusFilter() {
  const selectedStatus = useSelector(StatusFilters)
  const dispatch = useDispatch()

  const handleChangedStatus = (e) => {
    dispatch({ type: 'filters/statusFilterChanged', payload: e.target.value })
  }

  const statusOptions = ['All', 'Active', 'Completed'].map((status) => (
    <div key={status} className="status-option">
      <input
        type="radio"
        id={status}
        name="options"
        value={status}
        checked={selectedStatus === status}
        onChange={handleChangedStatus}
      />
      <label htmlFor={status}>{status}</label>
    </div>
  ))

  return <fieldset value={selectedStatus}>{statusOptions}</fieldset>
}
function ColorFilter() {
  const selectedColors = useSelector(ColorFilters)
  const dispatch = useDispatch()

  const handleChangedStatus = (e) => {
    dispatch(colorFilterChanged(e.target.id, e.target.checked))
  }

  const colorOptions = availableColors.map((color) => (
    <div key={color} className="status-option">
      <input
        type="checkbox"
        id={color}
        name="options"
        checked={selectedColors.includes(color)}
        onChange={handleChangedStatus}
      />
      <label htmlFor={color}>{capitalize(color)}</label>
    </div>
  ))

  return <fieldset>{colorOptions}</fieldset>
}

function Footer() {
  const todosRemaining = useSelector((state) => {
    const uncompletedTodos = state.todos.filter((todo) => !todo.completed)
    return uncompletedTodos.length
  })

  return (
    <div>
      <p>Remaining To Dos: {todosRemaining}</p>
      <StatusFilter />
      <ColorFilter />
    </div>
  )
}

export default Footer
