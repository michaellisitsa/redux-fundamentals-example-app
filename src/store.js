import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducer'
import { client } from './api/client'
import thunkMiddleware from 'redux-thunk'

const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25,
})

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
)

// Write a function that has `dispatch` and `getState` as arguments
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

export default store
