import React from 'react'
import './Todo.css'
import { useState, useRef, useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { IoCheckmarkDone } from "react-icons/io5";
import Swal from 'sweetalert2';




function ToDo() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [editId, setEditId] = useState(0)


  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const addToDo = () => {
    if(todo !== ''){
      if (todos.some((t) => t.list.toLowerCase() === todo.toLowerCase())) {
        Swal.fire('This todo already exists!');
        return;
      }  
    }
    if(editId){
      const editTodo = todos.find((todo) => todo.id === editId)
      const updateTodo = todos.map((to) => to.id === editTodo.id
      ? (to = {...to, list : todo}) 
      : to)

      setTodos(updateTodo);
      setEditId(0);
      setTodo('');
    }
    else{
      setTodos([{list : todo , id : Date.now() , status : false}, ...todos])
      setTodo('');
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const inputRef = useRef('null')

  useEffect(() => {
    inputRef.current.focus();
  })

  const onDelete = (id) => {
    setTodos(todos.filter((to) => to.id !== id))
  };

  const onComplete = (id) => {
    let complete = todos.map((list) => {
      if(list.id === id){
        return ({...list , status : !list.status})
      }
      return list
    })
    complete.sort((a, b) => a.status - b.status); 
    setTodos(complete)
  };

  const onEdit = (id) => {
    const editTodo = todos.find((to) => to.id === id)
    setTodo(editTodo.list)
    setEditId(editTodo.id)
  }

  return (
    
    <div className='container'>
      <h2>ToDo App</h2>
      <form className="form-class" onSubmit={handleSubmit}>
        <input className="form-input" value={todo} ref={inputRef} type="src" placeholder="Enter your ToDo task:" onChange={(event) => setTodo(event.target.value)} />
        <button type='button' onClick={addToDo}>{editId ? 'EDIT' : 'ADD' }</button>
      </form>
      <div className='list'>
        <ul>
          {
            todos.map((todo) =>
              <li id = {todo.status ? 'list-item' : ''}>
                {todo.list}
                <span className='icon-group'>
                  <IoCheckmarkDone className='list-item-icons' id='complete' title='Complete' onClick ={() => onComplete(todo.id)}/>
                  <FaRegEdit className='list-item-icons' id='edit' title='Edit' onClick = {() => onEdit(todo.id)}/>
                  <MdDelete className='list-item-icons' id='delete' title='Delete' onClick={() => onDelete(todo.id)}/>

                </span>
              </li>
            )
          }
        </ul>
      </div>

    </div>

    


  )
}

export default ToDo

