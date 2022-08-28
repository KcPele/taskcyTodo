import React from 'react'

import "./styles.css"
import SingleTodo from "./SingleTodo"
import { Droppable } from 'react-beautiful-dnd';
import { useAppSelector } from "../hooks";

const TodoList: React.FC = () => {
  const allTodos = useAppSelector((state) => state.todoReducer)
  const { todos, progressTodos, completedTodos} = allTodos
  return (
    <div className="container">
      <Droppable droppableId='TodosList' >
        {
          (provided, snapshot) => (
            <div className={`todos ${snapshot.isDraggingOver ? "dragprogress" : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
            <span className="todos__heading">Active Task</span>
          
          {
            todos.map((todo, index) => (
                <SingleTodo index={index} key={todo.id} todo={todo}   comingFrom="todos"/>
            ))
          }
           {provided.placeholder}
          </div>
          )
        }
      </Droppable>

      <Droppable droppableId='ProgressList' >
        {
          (provided, snapshot) => (

      <div className={`todos ${snapshot.isDraggingOver ? "dragprogress" : ""} progress`} ref={provided.innerRef} {...provided.droppableProps}>
      <span className="todos__heading">Progress Task</span>
      
      {
        progressTodos.map((todo, index) => (
            <SingleTodo index={index} key={todo.id} todo={todo} comingFrom="progressTodos"/>
        ))
      }
      {provided.placeholder}
      </div>
          )
    }
    </Droppable>
    <Droppable droppableId='CompleteList' >
        {
          (provided, snapshot) => (

      <div className={`todos ${snapshot.isDraggingOver ? "dragcomplete" : ""} remove`} ref={provided.innerRef} {...provided.droppableProps}>
      <span className="todos__heading">Completed Task</span>
      
      {
        completedTodos.map((todo, index) => (
            <SingleTodo index={index} key={todo.id} todo={todo}  comingFrom="completedTodos"/>
        ))
      }
       {provided.placeholder}
      </div>
          )
    }
    </Droppable>
    </div>
  )
}

export default TodoList