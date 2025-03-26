import React, { useState } from 'react'
import ITodoItem from './ITodoItem'

interface TodoItemProps {
  items: ITodoItem[]
  item: ITodoItem,
  setTasksList: any
}

const ToDoItemComponent = (props: TodoItemProps) => {

  const handleDeleteTask = () => {
    let indexToBeDeleted = props.item.id;
    let setTasksList = props.setTasksList;
    setTasksList(() => {
      let copyItems = [...props.items];
      return copyItems.filter(x => x.id != indexToBeDeleted);
    });

  }

  return (
    <div className='flex'>
      <div className='bg-white border-2 rounded-md m-5 px-2 py-1'>
        {props.item.task}
      </div>
      
      <div className='bg-white border-2 rounded-md m-5 px-2 py-1'>
        {props.item.description}
      </div>
      
      {/* <button className='bg-green-500 text-white rounded-md m-5 px-4 py-2'>
        Done
      </button> */}
      
      <button 
        className='bg-red-400 text-white rounded-md m-5 px-4 py-2'
        onClick={handleDeleteTask}
      >Delete
      </button>
    </div>
  )
}

export default ToDoItemComponent