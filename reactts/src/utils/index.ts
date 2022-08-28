import type { PayloadAction } from "@reduxjs/toolkit";
import { allStateTypeTodos, AddTodo, EditTodoI } from "../model";
import { addHelper, editHelper, removeHelper, doneHelper } from "./helpers";


export const apiRoute = 'http://127.0.0.1:8000'

export const add = (state: allStateTypeTodos, action: PayloadAction<AddTodo>) => {
    const {payload} = action
    
    if(payload.comingFrom === 'todos') {
        state.todos = addHelper(state.todos, payload)
    } else if (payload.comingFrom === 'progressTodos') {
    
        state.progressTodos = addHelper(state.progressTodos, payload)
    } else {
        state.completedTodos = addHelper(state.completedTodos, payload)
    }
 
    return state
}

export const edit = (state: allStateTypeTodos, action: PayloadAction<EditTodoI>) => {
    const { id, todo, comingFrom } = action.payload
    if(comingFrom === 'todos') {
        state.todos = editHelper(state.todos, id, todo)
    } else if (comingFrom === 'progressTodos') {
        
       state.progressTodos = editHelper(state.progressTodos, id, todo)
    } else {
       state.completedTodos = editHelper(state.completedTodos, id, todo)
    }
    return state
}

export const remove = (state: allStateTypeTodos, action: PayloadAction<{id: number, comingFrom: string}>) => {
    const {id, comingFrom } = action.payload
    if(comingFrom === 'todos') {
        state.todos = removeHelper(state.todos, id)
    } else if (comingFrom === 'progressTodos') {
        state.progressTodos = removeHelper(state.progressTodos, id)
    } else {
        state.completedTodos = removeHelper(state.completedTodos, id)
    }
    return state
}

export const done = (state: allStateTypeTodos, action: PayloadAction<{id: number, comingFrom: string}>) => {
    const {id, comingFrom } = action.payload
    if(comingFrom === 'todos') {
        state.todos = doneHelper(state.todos, id)
    } else if (comingFrom === 'progressTodos') {
        state.progressTodos = doneHelper(state.progressTodos, id)
    } else {
        state.completedTodos = doneHelper(state.completedTodos, id)
    }
    return state
}