import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchTasks, selectTaskById } from '../../store/tasksSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import Task from '../../components/task/Task';
import Link from 'next/link';
import styles from '../../components/task/task.module.scss';

const TaskPage: React.FC = () => {
	const router = useRouter();
	const taskId = Number(router.query.id);
	const dispatch = useDispatch<AppDispatch>();

	const loading = useSelector((state: RootState) => state.tasks.loading);
	const error = useSelector((state: RootState) => state.tasks.error);
	const tasks = useSelector((state: RootState) => state.tasks.tasks);
	const task = useSelector((state: RootState) =>
		!isNaN(taskId) ? selectTaskById(state, taskId) : null
	);

	useEffect(() => {
		if (tasks.length === 0) {
			dispatch(fetchTasks('https://jsonplaceholder.typicode.com/todos'));
		}
	}, [dispatch, tasks.length]);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <div>Something went wrong: {error}</div>;
	}

	if (!task) {
		return (
			<>
				<div>Task not found</div>
				<Link href="/">Go back</Link>
			</>
		);
	}

	return (
		<>
			<Task task={task} isFullView={true} />
			<Link className={styles.linkBack} href="/">
				Go back
			</Link>
		</>
	);
};

export default TaskPage;
