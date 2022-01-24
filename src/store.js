import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducer'
import thunkMiddleware from 'redux-thunk'

const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25,
})

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
)

export default store
