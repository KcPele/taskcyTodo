
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useAppSelector, useAppDispatch } from "./hooks";

import { addTodo, removeTodo } from "./reducers/todoSlice";
const App: React.FC = () => {
  const allTodos = useAppSelector((state) => state.todoReducer);
  const {todos, progressTodos, completedTodos} = allTodos
  const dispatch = useAppDispatch();

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

   

    if (source.droppableId === "TodosList") {
      let { id, todo, isDone } = todos[destination.index];

      if (destination.droppableId === "ProgressList") {
        dispatch(addTodo({ id, todo, isDone, comingFrom: "progressTodos" }));
      } else if (destination.droppableId === "CompleteList") {
        dispatch(addTodo({ id, todo, isDone, comingFrom: "completedTodos" }));
      }
      dispatch(removeTodo({ id: todos[source.index].id, comingFrom: "todos" }));
    } else if (source.droppableId === "ProgressList") {
      let { id, todo, isDone } = progressTodos[destination.index];
    
      if (destination.droppableId === "TodosList") {
        dispatch(addTodo({ id, todo, isDone, comingFrom: "todos" }));
      } else if (destination.droppableId === "CompleteList") {
        dispatch(addTodo({ id, todo, isDone, comingFrom: "completedTodos" }));
      }

      dispatch(
        removeTodo({ id: progressTodos[source.index].id, comingFrom: "progressTodos" })
      );
    } else {
      let { id, todo, isDone } = completedTodos[destination.index];

      if (destination.droppableId === "ProgressList") {
        dispatch(addTodo({ id, todo, isDone, comingFrom: "progressTodos" }));
      } else if (destination.droppableId === "TodosList") {
        dispatch(addTodo({ id, todo, isDone, comingFrom: "todos" }));
      }

      dispatch(
        removeTodo({ id: completedTodos[source.index].id, comingFrom: "completedTodos" })
      );
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">TaskcyTodo</span>

        <InputField />
        {/*  TODO: Pending work */}
        <TodoList />
      </div>
    </DragDropContext>
  );
};

export default App;
