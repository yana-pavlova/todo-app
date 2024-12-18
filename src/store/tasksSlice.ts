import {
	createAsyncThunk,
	createSlice,
	createSelector,
	PayloadAction,
} from '@reduxjs/toolkit';
import { TTask } from '../types';
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

export const fetchTasks = createAsyncThunk<TTask[], string>(
	'tasks/fetchTasks',
	async (url, { rejectWithValue }) => {
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error('Ошибка при загрузке данных');
			}
			const data = await response.json();
			return data.map((task: any) => ({
				id: task.id,
				title: task.title,
				completed: task.completed,
			}));
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTask: (state, action: PayloadAction<TTask>) => {
			state.tasks.push(action.payload);
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
	extraReducers: (builder) => {
		builder
			.addCase(fetchTasks.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchTasks.fulfilled, (state, action) => {
				state.tasks = action.payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(fetchTasks.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Ошибка при загрузке данных';
			});
	},
});

export default tasksSlice.reducer;
export const { addTask, removeTask, completeTask, editTask } =
	tasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectOpenedTasks = createSelector(
	[selectTasks],
	(tasks: TTask[]) => tasks.filter((task) => !task.completed)
);
export const selectCompletedTasks = createSelector(
	[selectTasks],
	(tasks: TTask[]) => tasks.filter((task) => task.completed)
);
export const selectTaskById = createSelector(
	[
		selectTasks,
		(_state: RootState, taskId: number) => taskId
	],
	(tasks, taskId) => tasks.find((task) => task.id === taskId)
);
