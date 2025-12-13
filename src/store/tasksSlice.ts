import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, TaskStatus } from "../services/dummyData";

export interface TasksState {
    tasks: Task[]
}


const initialState: TasksState = {
    tasks: [],
}

const TasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers:{
        addTasks: (state, action: PayloadAction<TasksState>) => {
            state.tasks = action.payload.tasks
        },
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload)
        },
        updateTasks: (state, action: PayloadAction<TasksState>) => {

        }
    }
})

export const {addTasks, addTask, updateTasks} = TasksSlice.actions;
export default TasksSlice.reducer