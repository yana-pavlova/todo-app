import React, { useEffect } from 'react';
import Link from 'next/link';
import styles from '../components/app/app.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchTasks } from '../store/tasksSlice';
import TaskList from '../components/taskList/TaskList';
import { TaskType } from '../types';
import UpButton from '../components/upButton/UpButton';

const Home: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const loading = useSelector((state: RootState) => state.tasks.loading);
	const error = useSelector((state: RootState) => state.tasks.error);

	const tasks = useSelector((state: RootState) => state.tasks.tasks);

	useEffect(() => {
		if (tasks.length) return;
		dispatch(fetchTasks('https://jsonplaceholder.typicode.com/todos'));
	}, [dispatch]);

	return (
		<>
			{loading && <p>Loading...</p>}
			{error && (
				<p className={styles.error}>
					Something went wrong and we couldn't fetch tasks. But you can add
					yours anyway!
				</p>
			)}
			{!loading && (
				<>
					<section className={styles.intro}>
						<Link className={styles.link} href="#completed">
							Go to completed tasks
						</Link>
					</section>
					<section>
						<h2 className={styles.title}>Want to add a task?</h2>
						<button className={styles.addButton}>Add a task!</button>
					</section>
					<section id="uncompleted">
						<h2 className={styles.title}>To do</h2>
						<TaskList type={TaskType.Uncompleted} />
					</section>
					<section id="completed">
						<h2 className={styles.title}>Completed</h2>
						<TaskList type={TaskType.Completed} />
					</section>
					<UpButton />
				</>
			)}
		</>
	);
};

export default Home;