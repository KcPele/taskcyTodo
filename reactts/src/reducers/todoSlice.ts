import { createSlice } from "@reduxjs/toolkit"; 
import {  allStateTypeTodos } from "../model";

import { add, edit, remove, done } from "../utils";



const initialState = {
    todos: [],
    progressTodos: [],
    completedTodos: []
} as  allStateTypeTodos



export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: add,
        editTodo: edit,
        removeTodo: remove,
        doneTodo: done,
    }
})

export const {addTodo, editTodo, removeTodo, doneTodo} = todoSlice.actions
export default todoSlice.reducer
