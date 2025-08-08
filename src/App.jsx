import Navbar from './components/Navbar'
import { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai"


function App() {

  const [todo, setTodo] = useState("")

  const [todos, setTodos] = useState(() => {
    let saved = localStorage.getItem("todos")
    return saved ? JSON.parse(saved) : [];
  })

  const [showfinished, setshowfinished] = useState(false)

  const [initialload, setInitialload] = useState(true)

  const toggleshowfinished = () => {
    setshowfinished(!showfinished)
  }



  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
  }

  const handleAdd = (e) => {
    setTodos([...todos, { id: uuidv4(), todo, iscompleted: false }])
    setTodo("")
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let newTodos = [...todos]
    newTodos[index].iscompleted = !newTodos[index].iscompleted
    setTodos(newTodos)
  }


  return (
    <>
      <Navbar />
      <div className="container md:w-[35%] md:mx-auto mx-2 my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
        <h1 className='font-bold text-2xl text-center'>iTask - Manage all your tasks at one place</h1>
        <div className='addTodo my-7 flex flex-col gap-5'>
          <h2 className='text-lg mx-2 font-bold'>Add a Todo</h2>
          <div className="flex gap-3">
            <input onChange={handleChange} value={todo} type="text" className='bg-white  rounded-md p-2 flex-1' />
            <button onClick={handleAdd} disabled={todo.length < 1} className='bg-violet-800 px-3 py-1 rounded-md text-white text-sm font-bold hover:bg-violet-950 cursor-pointer'>Add</button></div>
        </div>
        <input type="checkbox" checked={showfinished} onChange={toggleshowfinished} /> Show finished
        <div className='h-[1px] bg-black opacity-25 my-4'></div>
        <h2 className='text-lg font-bold'>Your ToDo's</h2>
        {todos.length === 0 && <div className='m-5 text-md'>No Todos to display</div>}
        {todos.map(item => {
          return (showfinished || !item.iscompleted) && <div key={item.id} className="todos">
            <div className="todo flex  my-2 justify-between bg-violet-200 rounded-2xl p-2">
              <div className='flex gap-4'>
                <input onChange={handleCheckbox} type="checkbox" name={item.id} id="" checked={item.iscompleted} />
                <div className={item.iscompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-800 px-3 py-1 rounded-md text-white mx-1 text-sm font-bold hover:bg-violet-950 cursor-pointer'><FaRegEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 px-3 py-1 rounded-md text-white mx-1 text-sm font-bold hover:bg-violet-950 cursor-pointer'><AiFillDelete /></button>
              </div>
            </div>
          </div>
        })}

      </div>
    </>
  )
}

export default App
