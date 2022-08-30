
import "./App.css";
import React, {useEffect} from  'react'
import {InputField, Navbar, FormComponent} from "./components";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useAppSelector, useAppDispatch } from "./hooks";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { addTodo, removeTodo } from "./reducers/todoSlice";
import { loginAuth } from "./reducers/authSlice";
import { toast,  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import useGet from "./hooks/useGet";
import useAxios from "./hooks/useAxios";
const App: React.FC = () => {
  const allTodos = useAppSelector((state) => state.todoReducer);
  const token = useAppSelector((state) => state.authReducer.refresh_token);
  const {todos, progressTodos, completedTodos} = allTodos

  
  const dispatch = useAppDispatch();
  const { getTodos } = useGet()
  const {handleRequest} = useAxios()
  

  useEffect(() => {
    let getToken = localStorage.getItem('token')
    if(getToken === null || getToken === undefined){
      console.log("not loged in")
    } else {
      console.log("there is token")
      dispatch(loginAuth({refresh_token: getToken}))
    }
    
  }, [dispatch])

  useEffect(() => {
    let gettingTodos = async () => {
      if(token){
        await getTodos()
     } else {

     }
    }
      gettingTodos()
  
  }, [token, todos, completedTodos])
  
  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

   

    if (source.droppableId === "TodosList") {
      let { id, todo, isDone } = todos[destination.index];

      if (destination.droppableId === "CompleteList") {
        if(!token) {
          dispatch(addTodo({ id, todo, isDone: true, comingFrom: "completedTodos" }));
          dispatch(removeTodo({ id: todos[source.index].id, comingFrom: "todos" }));
        } else {
          await handleRequest({postData: {id, isDone: true}, path: `todos/${id}`, method: 'PATCH'})
          // dispatch(addTodo({ id, todo, isDone: true, comingFrom: "completedTodos" }));
          dispatch(removeTodo({ id: todos[source.index].id, comingFrom: "todos" }));
          toast.success("Todo is now completed. Congratulation")
          // await getTodos()
        }
      }
    
    } else {
      let { id, todo } = completedTodos[destination.index];

      if (destination.droppableId === "TodosList") {
        if(!token) {
          dispatch(addTodo({ id, todo, isDone: false, comingFrom: "todos" }));
          dispatch(
            removeTodo({ id: completedTodos[source.index].id, comingFrom: "completedTodos" })
          );
        } else {
          await handleRequest({postData: {id, isDone: false}, path: `todos/${id}`, method: 'PATCH'})
          // dispatch(addTodo({ id, todo, isDone: false, comingFrom: "todos" }));
          dispatch(
            removeTodo({ id: completedTodos[source.index].id, comingFrom: "completedTodos" })
            );
            toast.info("Todo is not completed")
          // await getTodos()

        }
     
      }
      
        
      
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
     
      <BrowserRouter >
      <Navbar />
      <ToastContainer limit={4}/>
      <Routes >
      <Route path="/" element={
      <div className="app">
        <span className="heading">TaskcyTodo</span>

        <InputField />
        {/*  TODO: Pending work */}
        <TodoList />
      </div> } />
      <Route path="/login" element={ <FormComponent /> } />
      <Route path="/signup" element={ <FormComponent /> } />
      </Routes>
      </BrowserRouter>
    </DragDropContext>
  );
};

export default App;
