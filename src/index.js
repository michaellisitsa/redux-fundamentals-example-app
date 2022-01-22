import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'

import './index.css'
import App from './App'

import './api/server'

console.log('Initial State: ', store.getState())

ReactDOM.render(
  <React.StrictMode>
    <Provider className="App" store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
