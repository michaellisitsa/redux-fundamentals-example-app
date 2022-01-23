import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store, { fetchTodos } from './store'

import './index.css'
import App from './App'

import './api/server'

store.dispatch(fetchTodos)

ReactDOM.render(
  <React.StrictMode>
    <Provider className="App" store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
