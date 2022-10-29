import { useState, useEffect, useRef } from "react"
import Form from "./components/Form"
import List from "./components/List"

export default function App() {

  const localStr = JSON.parse(localStorage.getItem("tasks")) || []
  const [userInput, setUserInput] = useState("")
  const [tasks, setTasks] = useState(localStr)
  const [editTask, setEditTask] = useState("")
  const inputFocus = useRef(null)
 

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks]);

  function handleSwapAll() {
   
  }

  return (
    <>
      <div className="max-w-full min-h-screen text-white text-center py-5 space-y-20 font-Poppins">
        <h1 className="text-4xl font-extrabold">Task Management App</h1>
        <div className="grid grid-cols-3 place-items-center px-44">
          <div>
            <h1 className="text-3xl font-bold">To-do</h1>
            <Form
              userInput={userInput}
              setUserInput={setUserInput}
              tasks={tasks}
              setTasks={setTasks}
              editTask={editTask}
              setEditTask={setEditTask}
              inputFocus={inputFocus}
            />
          </div>
          <button onClick={() => handleSwapAll()} className="button">Swap All</button>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold text-center">Done</h1>
            <div className="w-[450px] min-h-[500px] flex flex-col items-center bg-[#2e2e2e] p-5 mt-5 rounded-lg">
              <List
                tasks={tasks}
                setTasks={setTasks}
                setEditTask={setEditTask}
                inputFocus={inputFocus}
                isInCompletedSection={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}



