import { client } from '../../api/client'
import { createSelector } from 'reselect'

const initialState = []

// Selector to be used in useSelector
export const selectTodoById = (state, id) =>
  state.todos.find((todo) => todo.id === id)

export const selectTodoIds = createSelector(
  (state) => state.todos,
  (todos) => todos.map((todo) => todo.id)
)

// Filter by completed status
export const selectFilteredTodos = createSelector(
  (state) => state.todos,
  (state) => state.filters.status,
  (todos, status) => {
    if (status === 'All') {
      return todos
    }
    return todos.filter((todo) =>
      status === 'Completed' ? todo.completed : !todo.completed
    )
  }
)

export const selectFilteredTodoIds = createSelector(
  selectFilteredTodos,
  (filteredTodos) => filteredTodos.map((todo) => todo.id)
)

// Write a function that has `dispatch` and `getState` as arguments
// This is following the thunk pattern.
// Note that there is no 'action' passed in, rather dispatch is a function.
// So you don't have access to the action data.
// If you need to pass actions, we need an action creator, which wraps the thunk middleware.
export function fetchTodos() {
  return function fetchTodosThunk(dispatch, getState) {
    client.get('/fakeApi/todos').then((response) => {
      dispatch(todosLoaded(response.todos))
    })
  }
}

// Closure gives access to the parameter
export function saveNewTodo(text) {
  return async function saveNewTodoThunk(dispatch, getState) {
    const initialTodo = { text } // a key text with value text
    const response = await client.post('/fakeApi/todos', { todo: initialTodo })
    dispatch(todoAdded(response.todo))
  }
}

export const todoAdded = (text) => {
  return {
    type: 'todos/todoAdded',
    payload: text,
  }
}

export const todosLoaded = (todos) => {
  return {
    type: 'todos/todosLoaded',
    payload: todos,
  }
}

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case 'todos/todoAdded':
      return [...state, action.payload]
    case 'todos/todoToggled':
      return state.map((todo) => {
        if (todo.id !== action.payload) {
          return todo
        }

        return {
          ...todo,
          completed: !todo.completed,
        }
      })
    case 'todos/colorSelected':
      return state.map((todo) => {
        if (todo.id !== action.payload.todoId) {
          return todo
        }

        return {
          ...todo,
          color: action.payload.color,
        }
      })
    case 'todos/todosLoaded':
      return action.payload
    case 'todos/todoDeleted':
      break
    case 'todos/todoCompleted':
      break
    case 'todos/completedCleared':
      break
    default:
      return state
  }
}
