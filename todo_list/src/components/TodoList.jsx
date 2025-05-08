import React, { useEffect, useState } from 'react'

export default function TodoList() {
    const [todos ,setTodos] = useState([])
    const [todoInput ,settodoInput] = useState("")
    // to get from localStorage and set to todos component state (localStorage associated with documnet's domain)
    useEffect(()=>{
       const stored_todos=JSON.parse(localStorage.getItem("todos")|| [])
       setTodos(stored_todos)

    },[])
    // // save updated todos in localstorage
    useEffect(()=>{
       localStorage.removeItem("todos")
       localStorage.setItem("todos" ,JSON.stringify(todos))

    },[todos])

    const addTodoItem = ()=>{
         if(todos.some((item)=>item.text===todoInput.trim()) || !todoInput.trim()) return;
        
         const temp = {
          id:Date.now().toString(),
          text:todoInput.trim(),
          completed:false
        }
        setTodos(prev=>[...prev, temp])
        settodoInput("")
     }
     
    const handleCheckbox = (id)=>{
      setTodos(prev=>(
            prev.map(todo=>{
                if(todo.id===id){
                   return {...todo ,completed:!todo.completed}
                }
                else{
                  return todo;
                }
            })))
    }
    const deleteTodoItem = (id)=>{
            setTodos(prev=>(
               prev.filter((item)=>item.id!==id)
            ))
    }
    console.log(todos)
  return (
    <div className='todo-list-component' >
      <h1> TodoList</h1>
       <div className='input-container'>
          <input type="text"
           value={todoInput} 
           placeholder='Enter todo'
           onChange={e=>settodoInput(e.target.value)} 
          />
          <button type='button' className='btn' onClick={addTodoItem}> Add</button>
        </div>
       <ul className={"todos-container"}>
          { todos && todos.map((todo,index)=>(
               <li key={todo.id} className='todo'>

                  <input type="checkbox" 
                    checked={todo.completed}
                    onChange={()=>handleCheckbox(todo.id)} 
                  />&nbsp;&nbsp;
                  <span className={`todo-text ${todo.completed?"todo-completed":""}`} >{todo.text}</span>&nbsp;&nbsp;
                  <button 
                   type='button' 
                   className='btn'
                   onClick={()=>deleteTodoItem(todo.id)}
                   >Delete</button>
               </li>
             ))
          }
       </ul>
    </div>
  )
}
