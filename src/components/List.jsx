import React from 'react'
import { FaEdit } from "react-icons/fa"
import { MdTaskAlt } from "react-icons/md"
import { MdDelete } from "react-icons/md"
import { MdOutlineCancel } from "react-icons/md"


export default function List ({ tasks, setTasks, setEditTask, inputFocus, isInCompletedSection }) {

  const handleDelete = ({ id }) => {
    setTasks(tasks.filter((todo) => todo.id !== id))
  }

  const handleCompleted = (todo) => {
    setTasks(
      tasks.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            completed: !item.completed
          }
        }
        return item
      }))
  }

  const handleEdit = ({ id }) => {
    const findTask = tasks.find((todo) => todo.id === id)
    setEditTask(findTask)
    inputFocus.current.focus()
  }

  const newTask = isInCompletedSection ? tasks.filter((todo) => todo.completed) : tasks.filter((todo) => !todo.completed)

  return (
    <>
      {newTask.map((todo) => (
        <li className="max-w-full flex justify-between items-center bg-white rounded-md h-[40px] mb-5" key={todo.id}>
          <input
            className='appearance-none border-none rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type="text"
            value={todo.title}
            onChange={(e) => e.preventDefault()}
          />
          <div className='flex items-center space-x-2 text-black mx-2 '>
            <button onClick={() => handleCompleted(todo)}>
              {todo.completed ? <MdOutlineCancel color='red' /> : <MdTaskAlt color='blue' />}
            </button>
            <button onClick={() => handleEdit(todo)}>
              <FaEdit color="green" />
            </button>
            <button onClick={() => handleDelete(todo)}>
              <MdDelete color='red' />
            </button>
          </div>
        </li>
      ))}
    </>
  )
}
