import React, { useState, useRef, useEffect } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";
import { useAppDispatch } from '../hooks';
import { editTodo as editTodoReducer, removeTodo, doneTodo } from '../reducers/todoSlice';
interface Props {
  todo: Todo;
  comingFrom: string;
  index: number;

}
const SingleTodo: React.FC<Props> = ({ todo, index, comingFrom }) => {
  const dispatch = useAppDispatch()
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);


  const handleSubmit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    dispatch(editTodoReducer({id, todo: editTodo, comingFrom}))
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
            <span onClick={() => dispatch(removeTodo({id: todo.id, comingFrom}))} className="icon">
              {" "}
              <AiFillDelete />
            </span>
            <span onClick={() => dispatch(doneTodo({id: todo.id,  comingFrom}))} className="icon">
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
