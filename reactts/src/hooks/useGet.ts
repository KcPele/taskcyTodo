
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAppDispatch } from '.';
import { Todo } from '../model';
import { addTodo } from '../reducers/todoSlice';
import { apiRoute } from '../utils';


const useGet = () => {
  const dispatch = useAppDispatch();
  const getTodos = async () => {
    let token = localStorage.getItem('token')
    
    const options = {
      method: "GET",
      headers: { 
        'content-type': 'application/json',
        'authorization': `Bearer ${token}` 
      },
      url: `${apiRoute}/todos`,
    };
    axios(options).then(data => {
    //  console.log(data)
    data.data.map((val: Todo) => {
      if(val.isDone === true) {

          return dispatch(addTodo({ id: val.id, todo: val.todo, isDone: val.isDone, comingFrom: "completedTodos" }));
        
      } else {
  
          return dispatch(addTodo({ id: val.id, todo: val.todo, isDone: val.isDone, comingFrom: "todos" }));
      
      }
    })
     
    }).catch(error => {
      console.log(error)
      toast.error(error.response.data.detail)

    })

  }
  return {
    getTodos
  }
}

export default useGet

