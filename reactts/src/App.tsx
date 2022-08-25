import React, {useState, useEffect} from "react"
import './App.css';
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./model";
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux'
import { RootState } from "./store/store";
const  App: React.FC = () => {
  const todos1 = useSelector((state: RootState) => state.todoReducer)
   const [todo, setTodo] = useState<string>("")
   const [todos, setTodos] = useState<Todo[]>([])
   const [completedTodos, setCompletedTodos] = useState<Todo[]>([])
   const [progressTodos, setProgressTodos] = useState<Todo[]>([])

   useEffect(() => {
     setTodos(todos1)
   }, [todos1])
   
   const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
     if(todo){
      setTodos([...todos, {id: Date.now(), todo, isDone: false}])
      setTodo("")
     }
    

   }
   const onDragEnd = (result: DropResult) => {
        const {source, destination } = result
        if(!destination) return
        if(destination.droppableId === source.droppableId && destination.index === source.index) return

        let add, active = todos, complete = completedTodos, progress = progressTodos

        if(source.droppableId === 'TodosList') {
          add = active[source.index]
          active.splice(source.index, 1)
        } else if (source.droppableId === 'ProgressList'){
          add = progress[source.index]
          progress.splice(source.index, 1)

        } else {
          add = complete[source.index]
          complete.splice(source.index, 1)
        }

        if(destination.droppableId === 'TodosList') {
          active.splice(destination.index, 0, add)
        } else if (destination.droppableId === 'ProgressList'){
          progress.splice(destination.index, 0, add)

        } else {
          complete.splice(destination.index, 0, add)
        }

        setCompletedTodos(complete)
        setProgressTodos(progress)
        setTodos(active)
   }
  return (
    <DragDropContext onDragEnd={onDragEnd} >
    <div className="App">
      <span className="heading">TaskcyTodo</span>

      <InputField />
    {/*  TODO: Pending work */}
      <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} progressTodos={progressTodos}  setCompletedTodos={setCompletedTodos} setProgressTodos={setProgressTodos} />
    </div>
    </DragDropContext >
  );
}

export default App;
