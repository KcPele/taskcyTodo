import React, { useRef, useState } from 'react'
import { useDispatch } from "react-redux"
import { addTodo } from '../reducers/todoSlice';
import "./styles.css"
interface Props {
    todo: string, 
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
    

}
const InputField: React.FC = () => {
    const dispatch = useDispatch()
    const inputRef = useRef<HTMLInputElement>(null)
    const [todo, setTodo] = useState<string>("")
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(addTodo({id: Date.now(), todo: todo, isDone: false}))
        setTodo("")
    }
  return (
    <form className='input' onSubmit={(e) => {
    handleSubmit(e)
    inputRef.current?.blur()
    
    }}>
       <input type="input" value={todo} ref={inputRef} onChange={(e) => setTodo(e.target.value)} placeholder="Ender a task"  className="input__box"/>
       <button className="input_submit" type="submit">Go</button>
    </form>
  )
}

export default InputField