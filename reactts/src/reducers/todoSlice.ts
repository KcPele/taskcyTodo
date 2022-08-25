import { createSlice } from "@reduxjs/toolkit"; 
import type { PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../model";

const initialState: Todo[] = [
    {
        id: 243434355,
        todo: "God is good",
        isDone: false

    }
]
interface EditTodo {
    id: number,
    todo: string
}
export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<Todo>) => {
            const {payload} = action
            return [...state, {id: payload.id, todo: payload.todo, isDone: payload.isDone}]
        },
        editTodo: (state, action: PayloadAction<EditTodo>) => {
            const {id, todo} = action.payload
            return state.map(value => (value.id === id ? {...value, todo: todo} : value))
        },
        removeTodo: (state, action: PayloadAction<{id: number}>) => {
            return state.filter(todo => todo.id !== action.payload.id)
        }
    }
})

export const {addTodo, editTodo, removeTodo} = todoSlice.actions
export default todoSlice.reducer
