import { useEffect, useState } from 'react'
import ToDoItemComponent from './ToDoItemComponent';
import ITodoItem from './ITodoItem';

function App() {
  const[task, setTask] = useState('');
  const[description, setDescription] = useState('');
  const[tasksList, setTasksList] = useState<ITodoItem[]>([]);
  const[todoSize, setTodoSize] = useState(0);

  useEffect(() => {
    let todoItems = window.localStorage.getItem("todos");
    if(todoItems) {
      setTasksList(JSON.parse(todoItems));
    }
  }, [])

  const clearLocalStorage = () => {
     window.localStorage.setItem("todos",'');
     setTasksList([]);
  }

  // useEffect(() => {
  //   window.localStorage.setItem("todos", JSON.stringify(tasksList));
  // }, tasksList)
  
  const addTask = (event: any) => {
    event.preventDefault();
    let copyItems = [...tasksList, {task, description, 'id':task+todoSize}];
    setTasksList(copyItems);
    window.localStorage.setItem("todos", JSON.stringify(copyItems));
    setTodoSize(todoSize + 1);
    setTask('');
    setDescription('');
    console.log(tasksList);
  }

  let rendertask: any = <h2 className='p-5'>No tasks available</h2>

  if(tasksList.length > 0) {
    rendertask = tasksList.map((item, index) => {
      return <ToDoItemComponent key={item.task+index} items={tasksList} item={item} setTasksList={setTasksList} />
    })
  }

  return (
    <>
      <h1 className='text-center bg-zinc-700 text-white p-3 text-xl font-bold' >My Todo List</h1>

      <form onSubmit={addTask}>
        <input 
          type='text'
          placeholder='Enter task here'
          className='border-2 rounded-md m-5 px-2 py-1'
          value={task}
          onChange={(event) => {
            setTask(event.target.value)
          }}
        />
        <input 
          type='text'
          placeholder='Enter Description here'
          className='border-2 rounded-md m-5 px-2 py-1'
          value={description}
          onChange={(event) => {
            setDescription(event.target.value)
          }}
        />
        <button 
          className='bg-black text-white rounded-md m-5 px-4 py-2'
        >Add</button>
      </form>

      <button 
          className='bg-blue-600 text-white rounded-md m-5 px-4 py-2'
          onClick={clearLocalStorage}
        >Clear storage</button>
      
      <hr />

      <div className='bg-amber-200' p-2>
        {rendertask}
      </div>

    </>
  )
}

export default App
