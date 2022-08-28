export interface Todo {
    id: number;
    todo: string,
    isDone: boolean;
}


export interface EditTodo {
    id: number,
    todo: string
}

export interface allStateTypeTodos  {
    todos: Todo[],
    progressTodos: Todo[],
    completedTodos: Todo[]
}

export interface AddTodo extends Todo {
    comingFrom: string
}

export interface EditTodoI extends EditTodo {
    comingFrom: string
    
}
