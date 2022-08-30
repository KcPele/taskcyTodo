import React, { useState, useRef, useEffect } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";
import { useAppDispatch, useAppSelector } from '../hooks';
import { editTodo as editTodoReducer, removeTodo, doneTodo } from '../reducers/todoSlice';
import  useAxios  from "../hooks/useAxios";
import { toast } from "react-toastify";
interface Props {
  todo: Todo;
  comingFrom: string;
  index: number;

}
const SingleTodo: React.FC<Props> = ({ todo, index, comingFrom }) => {
  const dispatch = useAppDispatch()
  const token = useAppSelector((state) => state.authReducer.refresh_token);
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const { res, handleRequest, error } = useAxios()

  const handleDelete = async () => {
    if(!token) {
      dispatch(removeTodo({id: todo.id, comingFrom}))
      toast.success("Successfully deleted")
    } else {
      await handleRequest({postData: null, path: `todos/${todo.id}`, method: 'DELETE'})

      if(!error){
        dispatch(removeTodo({id: todo.id, comingFrom}))
        toast.success("Successfully deleted")
      }
    }
 
  }
  const handleCompleted = async () => {
    if(!token) {
      dispatch(doneTodo({id: todo.id,  comingFrom}))
        toast.success("Todo is now completed. Congratulation")
    } else {
      
      await handleRequest({postData: {id: todo.id, isDone: !todo.isDone}, path: `todos/${todo.id}`, method: 'PATCH'})
      if(!error){
        dispatch(doneTodo({id: todo.id,  comingFrom}))
        toast.success("Todo is now completed. Congratulation")
      }
    }
    
  }
  const handleSubmit = async (e: React.FormEvent, id: number) => {
    e.preventDefault();

    if(!token) {
      dispatch(editTodoReducer({id, todo: editTodo, comingFrom}))
      toast.success("Successfully edited todo")
    } else {
    await handleRequest({postData: {id: todo.id, todo: editTodo}, path: `todos/${todo.id}`, method: 'PATCH'})
    if(!error){
      dispatch(editTodoReducer({id, todo: editTodo, comingFrom}))
      toast.success("Successfully edited todo")
    }
  }
    setEdit(false);
  };
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(e) => handleSubmit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text"
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <span className="todos__single--text">{todo.todo}</span>
          )}

          <div>
            <span
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
              className="icon"
            >
              {" "}
              <AiFillEdit />
            </span>
            <span onClick={ handleDelete} className="icon">
              {" "}
              <AiFillDelete />
            </span>
            <span onClick={handleCompleted} className="icon">
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
