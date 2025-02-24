import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { TaskType, TTask } from '../types';
import { RootState } from './store';

interface TTasksState {
	tasks: TTask[];
	loading: boolean;
	error: string | null;
}

const initialState: TTasksState = {
	tasks: [],
	loading: false,
	error: null,
};

const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		// таски добавляются в начало массива
		addTask: (state, action: PayloadAction<TTask>) => {
			state.tasks.unshift(action.payload);
		},
		removeTask: (state, action: PayloadAction<number>) => {
			state.tasks = state.tasks.filter((task) => task.id !== action.payload);
		},
		// при завершении/открытии таска перемещаем его в начало/конец
		completeTask: (state, action: PayloadAction<TTask>) => {
			const index = state.tasks.findIndex(
				(task) => task.id === action.payload.id
			);
			if (index !== -1) {
				state.tasks[index] = action.payload;

				if (action.payload.completed) {
					const [completedTask] = state.tasks.splice(index, 1);
					state.tasks.push(completedTask);
				} else {
					const [incompleteTask] = state.tasks.splice(index, 1);
					state.tasks.unshift(incompleteTask);
				}
			}
		},
		// при редактировании таска никуда его не перемещаем
		editTask: (state, action: PayloadAction<TTask>) => {
			const index = state.tasks.findIndex(
				(task) => task.id === action.payload.id
			);
			if (index !== -1) {
				state.tasks[index] = action.payload;
			}
		},
	},
});

export default tasksSlice.reducer;
export const { addTask, removeTask, completeTask, editTask } =
	tasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectTasksByType = createSelector(
	[selectTasks, (_state: RootState, type: TaskType) => type],
	(tasks, type) => {
		switch (type) {
			case TaskType.Completed:
				return tasks.filter((task) => task.completed);
			case TaskType.Uncompleted:
				return tasks.filter((task) => !task.completed);
			default:
				return tasks;
		}
	}
);
export const selectTaskById = createSelector(
	[selectTasks, (_state: RootState, taskId: number) => taskId],
	(tasks, taskId) => tasks.find((task) => task.id === taskId)
);
