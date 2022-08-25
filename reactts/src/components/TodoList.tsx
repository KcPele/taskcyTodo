import React from 'react'
import { Todo } from '../model'
import "./styles.css"
import SingleTodo from "./SingleTodo"
import { Droppable } from 'react-beautiful-dnd';
interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos: Todo[];
    progressTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    setProgressTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const TodoList: React.FC<Props> = ({todos, setTodos, completedTodos, progressTodos, setCompletedTodos, setProgressTodos}) => {
  return (
    <div className="container">
      <Droppable droppableId='TodosList' >
        {
          (provided, snapshot) => (
            <div className={`todos ${snapshot.isDraggingOver ? "dragprogress" : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
            <span className="todos__heading">Active Task</span>
          
          {
            todos.map((todo, index) => (
                <SingleTodo index={index} key={todo.id} todo={todo} todos={todos} setTodos={setTodos}/>
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
            <SingleTodo index={index} key={todo.id} todo={todo} todos={progressTodos} setTodos={setProgressTodos} />
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
            <SingleTodo index={index} key={todo.id} todo={todo} todos={completedTodos} setTodos={setCompletedTodos}/>
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