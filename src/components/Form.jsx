import { useEffect } from "react"
import List from "./List";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Form({ userInput, setUserInput, tasks, setTasks, editTask, setEditTask, inputFocus }) {

    const handleChange = (e) => {
        setUserInput(e.target.value)
    }

    const updateTask = (id, title, completed) => {
        const newTask = tasks.map((todo) => todo.id === id ? { id, title, completed } : todo)
        setTasks(newTask)
        setEditTask("")
    }

    useEffect(() => {
        if (editTask) {
            setUserInput(editTask.title)
        } else {
            setUserInput("")
        }
    }, [setUserInput, editTask])


    const handleSubmit = (e) => {
        e.preventDefault();
        if (userInput === "") {
            alert("Please enter the task")
        } else {
            if (!editTask) {
                setTasks([...tasks, { id: uuidv4(), title: userInput, completed: false }])
                setUserInput("")
                // toast.success(`Task "${tasks.title}" added to the list!`, {
                //     position: toast.POSITION.TOP_RIGHT,
                // });
            } else {
                updateTask(editTask.id, userInput, editTask.completed)
                // toast.update(`Task "${tasks.title}" edited successfully!`, {
                //     position: toast.POSITION.TOP_RIGHT,
                // });
            }
        }
    }

    return (
        <>
            <ToastContainer
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                theme="dark"
            />
            <div className="w-[450px] min-h-[500px] flex flex-col bg-[#2e2e2e] p-5 mt-5 rounded-lg">
                <form className="flex gap-4" onSubmit={handleSubmit}>
                    <input className="shadow appearance-none border rounded w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Enter Your Task"
                        onChange={handleChange}
                        value={userInput}
                        ref={inputFocus}
                    />
                    <button className="bg-transparent hover:bg-blue-600 text-white hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded"
                    >{editTask ? "Save" : "Add"}</button>
                </form>
                <div className="my-4">
                    <List
                        tasks={tasks}
                        setTasks={setTasks}
                        setEditTask={setEditTask}
                        inputFocus={inputFocus}
                        isInCompletedSection={false}
                    />
                </div>
            </div>
        </>
    )
}
