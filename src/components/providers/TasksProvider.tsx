import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, selectTasks } from '../../store/tasksSlice';
import { AppDispatch } from '../../store/store';

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
	const dispatch = useDispatch<AppDispatch>();
	const tasks = useSelector(selectTasks);

	useEffect(() => {
		if (!tasks.length) {
			dispatch(fetchTasks('https://jsonplaceholder.typicode.com/todos'));
		}
	}, [dispatch, tasks.length]);

	return <>{children}</>;
};
