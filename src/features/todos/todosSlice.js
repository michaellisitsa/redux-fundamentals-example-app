import { client } from '../../api/client'

const initialState = []

function nextTodoId(todos) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
  return maxId + 1
}

// Selector to be used in useSelector
export const selectTodoById = (state, id) =>
  state.todos.find((todo) => todo.id === id)

// Write a function that has `dispatch` and `getState` as arguments
// This is following the thunk pattern.
// Note that there is no 'action' passed in, rather dispatch is a function.
// So you don't have access to the action data.
// If you need to pass actions, we need an action creator, which wraps the thunk middleware.
export const fetchTodos = (dispatch, getState) => {
  // Make an async HTTP request
  client.get('/fakeApi/todos').then((response) => {
    const stateBefore = getState()
    console.log('todos before dispatch:', stateBefore.todos.length)
    // Dispatch an action with the todos we received
    dispatch({ type: 'todos/todosLoaded', payload: response.todos })
    // Check the updated store state after dispatching
    const stateAfter = getState()
    console.log('todos after dispatch:', stateAfter.todos.length)
  })
}

// Closure gives access to the parameter
export function saveNewTodo(text) {
  return async function saveNewTodoThunk(dispatch, getState) {
    const initialTodo = { text } // a key text with value text
    const response = await client.post('/fakeApi/todos', { todo: initialTodo })
    dispatch({ type: 'todos/todoAdded', payload: response.todo })
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
