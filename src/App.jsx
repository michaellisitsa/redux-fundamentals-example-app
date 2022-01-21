import * as React from 'react'
import appReducer from './reducer'
import './App.css'

function App() {
  const [todoItems, setTodoItems] = React.useState([
    { id: 1, description: 'item 1', completed: false, color: 'red' },
    { id: 2, description: 'item 2', completed: true, color: 'green' },
    { id: 3, description: 'item 3', completed: true, color: 'green' },
  ])

  function handleSelectCompleted(toggleTodoId) {
    setTodoItems((prevState) =>
      prevState.map((todo) => {
        if (todo.id === toggleTodoId) {
          return {
            ...todo,
            completed: !todo.completed,
          }
        } else {
          return { ...todo }
        }
      })
    )
  }

  return (
    <div className="App">
      <nav>
        <section>
          <h1>Redux Fundamentals Example</h1>

          <div className="navContent">
            <div className="navLinks"></div>
          </div>
        </section>
      </nav>
      <section>
        <h2>Welcome to the Redux Fundamentals example app!</h2>
      </section>
      <input type="text" placeholder="Add Todo..." />
      {todoItems.map((toDo) => (
        <div key={toDo.id} className="todo-item">
          <p>{toDo.description}</p>
          <input
            type="checkbox"
            checked={toDo.completed}
            onChange={() => handleSelectCompleted(toDo.id)}
          />
        </div>
      ))}
      <footer>
        <p>Total To Dos: {todoItems.length}</p>
      </footer>
    </div>
  )
}

export default App
