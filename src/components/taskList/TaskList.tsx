import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, selectTasks } from '../../state/tasksSlice';
import { AppDispatch } from '../../state/store';

const TaskList: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const tasks = useSelector(selectTasks);
	const loading = useSelector((state: any) => state.tasks.loading);
	const error = useSelector((state: any) => state.tasks.error);

	useEffect(() => {
		dispatch(fetchTasks('https://jsonplaceholder.typicode.com/todos'));
	}, [dispatch]);

	if (loading) return <p>Загрузка...</p>;
	if (error) return <p>Ошибка: {error}</p>;

	return (
		<ul>
			{tasks.map((task) => (
				<li key={task.id}>
					{task.title} - {task.completed ? '✔️' : '❌'}
				</li>
			))}
		</ul>
	);
};

export default TaskList;
