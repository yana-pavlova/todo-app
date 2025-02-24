import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, selectTasks } from '../../store/tasksSlice';
import { AppDispatch } from '../../store/store';

const initialTasks = [
	{
		id: 1,
		title: 'Learn React',
		completed: false,
		userId: 1,
	},
	{
		id: 2,
		title: 'Learn Redux',
		completed: true,
		userId: 1,
	},
	{
		id: 3,
		title: 'Build ToDo App',
		completed: false,
		userId: 1,
	},
];

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const dispatch = useDispatch<AppDispatch>();
	const tasks = useSelector(selectTasks);

	useEffect(() => {
		if (!tasks.length) {
			initialTasks.forEach((task) => {
				dispatch(
					addTask({
						...task,
						id: Date.now() + Math.random(),
					})
				);
			});
		}
	}, [dispatch, tasks.length]);

	return <>{children}</>;
};
