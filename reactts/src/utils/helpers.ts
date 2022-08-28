import { Todo, AddTodo } from "../model"


export const addHelper = (todos: Todo[], payload: AddTodo ) =>  {
    return [...todos, {id: payload.id, todo: payload.todo, isDone: payload.isDone}]
}
export const editHelper = (todos: Todo[], id: number, todo: string) => {
 
    return todos.map(value => (value.id === id ? {...value, todo: todo} : value))
}

export const removeHelper = (todos: Todo[], id: number) => {
 
    return todos.filter(todo => todo.id !== id)
}

export const doneHelper = (todos: Todo[], id: number) => {
 
    return todos.map((todo) => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)
}