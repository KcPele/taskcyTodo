import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../hooks';
import useAxios from '../hooks/useAxios';
import useGet from '../hooks/useGet';
import { addTodo } from '../reducers/todoSlice';

const InputField: React.FC = () => {
    const dispatch = useAppDispatch()
    const token = useAppSelector(state => state.authReducer.refresh_token)
    const inputRef = useRef<HTMLInputElement>(null)
    const [todo, setTodo] = useState<string>("")

    const { getTodos } = useGet()
    const { res, handleRequest, isLoading } = useAxios()
    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault()
      if(!token){
        dispatch(addTodo({id: Date.now(), todo: todo, isDone: false, comingFrom: 'todos'}))
        setTodo("")
        toast.info("you need to login to save your list")
        return
      }
       handleRequest({postData: {todo}, path: `todos`, method: 'POST'})
        if(res){
          toast.success("todo created")
        }
         await getTodos()
        setTodo("")
       
       
    }
  return (
    <form className='input' onSubmit={(e) => {
    handleSubmit(e)
    inputRef.current?.blur()
    
    }}>

       <input type="input" value={todo} ref={inputRef} disabled={isLoading} onChange={(e) => setTodo(e.target.value)} placeholder="Ender a task"  className="input__box"/>
       <button className="input_submit" disabled={isLoading} type="submit">{ isLoading ? '..' : 'Go' }</button>
    </form>
  )
}

export default InputField