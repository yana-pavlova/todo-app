import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TTask } from '../types';

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
		editTask: (state, action: PayloadAction<TTask>) => {
			const { id, title, completed } = action.payload;
			const task = state.tasks.find((task) => task.id === id);
			if (task) {
				task.title = title;
				task.completed = completed;
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
export const { addTask, removeTask, editTask } = tasksSlice.actions;

export const selectTasks = (state: { tasks: TTasksState }) => state.tasks.tasks;
export const selectTaskById = (id: number) => (state: { tasks: TTasksState }) =>
	state.tasks.tasks.find((task) => task.id === id);
