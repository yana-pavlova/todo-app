import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../store/tasksSlice';
import HomePage from '../pages/HomePage';
import { TasksProvider } from '../components/providers/TasksProvider';

const createTestStore = () => {
	return configureStore({
		reducer: {
			tasks: tasksReducer,
		},
	});
};

const renderWithProviders = (component: React.ReactNode) => {
	const store = createTestStore();
	const utils = render(
		<Provider store={store}>
			<TasksProvider>
				<BrowserRouter>{component}</BrowserRouter>
			</TasksProvider>
		</Provider>
	);
	return { store, ...utils };
};

describe('Task Management', () => {
	beforeEach(() => {
		renderWithProviders(<HomePage />);
	});

	it('should show initial tasks', async () => {
		await waitFor(() => {
			expect(screen.getByText('Build ToDo App')).toBeInTheDocument();
		});

		const tasks = screen.getAllByRole('listitem');
		expect(tasks).toHaveLength(2);
	});

	it('should delete a task', async () => {
		await waitFor(() => {
			expect(screen.getByText('Build ToDo App')).toBeInTheDocument();
		});

		const deleteButtons = screen.getAllByText('Delete');
		fireEvent.click(deleteButtons[0]);

		await waitFor(() => {
			expect(screen.queryByText('Build ToDo App')).not.toBeInTheDocument();
		});
	});

	it('should show active tasks in active filter', async () => {
		await waitFor(() => {
			expect(screen.getByText('Build ToDo App')).toBeInTheDocument();
		});

		const activeFilterButton = screen.getByRole('button', {
			name: /Active \(\d+\)/i,
		});
		fireEvent.click(activeFilterButton);

		await waitFor(() => {
			const tasks = screen.getAllByRole('listitem');
			expect(tasks.length).toBeGreaterThan(0);
		});
	});

	it('should show completed tasks in completed filter', async () => {
		await waitFor(() => {
			expect(screen.getByText('Build ToDo App')).toBeInTheDocument();
		});

		const completedFilterButton = screen.getByRole('button', {
			name: /Completed \(\d+\)/i,
		});
		fireEvent.click(completedFilterButton);

		await waitFor(() => {
			const tasks = screen.getAllByRole('listitem');
			expect(tasks.length).toBeGreaterThan(0);
		});
	});

	it('should show all tasks in all filter', async () => {
		await waitFor(() => {
			expect(screen.getByText('Build ToDo App')).toBeInTheDocument();
		});

		const allFilterButton = screen.getByRole('button', {
			name: /All \(\d+\)/i,
		});
		fireEvent.click(allFilterButton);

		await waitFor(() => {
			const tasks = screen.getAllByRole('listitem');
			expect(tasks.length).toBeGreaterThan(0);
		});
	});
});
