import { useState, useEffect } from 'react'
import { ViewTask } from './components/ViewTask'
import EditForm from './components/EditForm'

const statusbar = {
  all: 'all',
  active: 'active',
  completed: 'completed'
}

const storageTodo = '_todo_'
function App () {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem(storageTodo)) ?? [])
  const [status, setStatus] = useState(statusbar.all)
  const [filteredTodos, setFilteredTodos] = useState([])

  const filterTodos = (status) => {
    if (status === statusbar.completed) {
      return todos.filter(todo => todo.completed)
    } else if (status === statusbar.active) {
      return todos.filter(todo => !todo.completed)
    } else {
      return todos
    }
  }

  useEffect(() => {
    localStorage.setItem(storageTodo, JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    setFilteredTodos(() => filterTodos(status))
  }, [status, todos])

  const onSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const task = formData.get('task-input')
    if (task.trim() === '') return
    const newTask = {
      id: crypto.randomUUID(),
      task,
      isEditing: false,
      completed: false
    }
    setTodos(value => [...value, newTask])
    form.reset()
  }

  const toggleComplete = (id) => {
    setTodos(prevTodos => prevTodos.map(task => task.id === id ? { ...task, completed: !task.completed } : task))
  }

  const isEditing = (id) => {
    setTodos(prevTodos => prevTodos.map(task => task.id === id ? { ...task, isEditing: !task.isEditing } : task))
  }

  const updateTask = (todo, id) => {
    setTodos(prevTodos => prevTodos.map(task => task.id === id ? { ...task, task: todo, isEditing: !task.isEditing } : task))
  }

  const deleteTask = (id) => {
    setTodos(prevTodos => prevTodos.filter(task => task.id !== id))
  }

  const deleteCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(task => !task.completed))
  }

  return (
    <>
      <main className='container mx-auto p-4 md:w-1/2 text-center'>
        <h1 className='text-4xl font-raleway font-bold mt-8 mb-14'>#todo</h1>
        <div className='grid grid-cols-3 gap-4 border-b border-gray-2'>
          <div className='mx-auto'>
            <button
              className={`text-sm font-semibold border-b-4 pb-4 px-1 md:px-6 ${status === statusbar.all ? 'border-blue-1' : 'border-transparent'}`}
              type='button'
              onClick={() => setStatus(statusbar.all)}
            >All
            </button>
          </div>
          <div className='mx-auto'>
            <button
              className={`text-sm font-semibold border-b-4 pb-4 px-1 md:px-6 ${status === statusbar.active ? 'border-blue-1' : 'border-transparent'}`}
              type='button'
              onClick={() => setStatus(statusbar.active)}
            >Active
            </button>
          </div>

          <div className='mx-auto'>
            <button
              className={`text-sm font-semibold border-b-4 pb-4 px-1 md:px-6 ${status === statusbar.completed ? 'border-blue-1' : 'border-transparent'}`}
              type='button'
              onClick={() => setStatus(statusbar.completed)}
            >Completed
            </button>
          </div>

        </div>
        <form className='flex gap-6 w-full my-4' onSubmit={onSubmit}>
          <input
            className='bg-gray-50 border border-gray-2 text-gray-1 text-sm rounded-xl focus:ring-blue-1 focus:border-blue-1 placeholder:text-gray-3 outline-none block w-full px-3 py-4'
            type='text'
            id='task-input'
            name='task-input'
            placeholder='add details'
          />
          <button
            className='bg-blue-1 px-10 py-4 rounded-xl text-white font-semibold'
            type='submit'
          >Add
          </button>
        </form>
        <div className='my-8'>
          {
            filteredTodos.map(todo => (
              todo.isEditing
                ? (
                  <div key={todo.id}>
                    <EditForm
                      todo={todo}
                      edit={isEditing}
                      update={updateTask}
                    />
                  </div>
                  )
                : (
                  <div key={todo.id}>
                    <ViewTask
                      todo={todo}
                      toggle={toggleComplete}
                      edit={isEditing}
                      deteleTask={deleteTask}
                    />
                  </div>
                  )
            ))
          }
          {status === statusbar.completed && filteredTodos.length > 0 && (
            <button
              className='bg-red-500 px-6 py-3 rounded-xl text-white font-semibold'
              type='button'
              onClick={deleteCompleted}
            >Delete all
            </button>
          )}
        </div>
      </main>
    </>
  )
}

export default App
