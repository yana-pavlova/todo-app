import React, { useEffect } from 'react';
import HomeButton from '../components/homeButton/HomeButton';
import Heading from '../components/heading/Heading';
import styles from './add-task.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, fetchTasks, selectTasks } from '../store/tasksSlice';
import { TTask } from '../types';

const AddTask: React.FC = () => {
	const dispatch = useDispatch();
	const tasks = useSelector(selectTasks);
	const ref = React.useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		ref.current?.focus();
	}, []);

	useEffect(() => {
		if (!tasks.length) {
			dispatch(fetchTasks('https://jsonplaceholder.typicode.com/todos'));
		}
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		e.target.style.height = 'auto';
		e.target.style.height = `${e.target.scrollHeight}px`;
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const taskName = ref.current?.value?.trim();
		const newTaskId = tasks.length + 1;
		if (!taskName) return;
		const newTask: TTask = {
			id: newTaskId,
			title: taskName,
			completed: false,
			userId: 1,
		};

		dispatch(addTask(newTask));
	};

	return (
		<section className={styles.section}>
			<Heading>Add a New Task</Heading>
			<form onSubmit={handleSubmit} className={styles.form}>
				<textarea
					rows={1}
					onChange={handleChange}
					ref={ref}
					placeholder="Task description"
					className={styles.textarea}
					name="taskName"
				/>
				<button type="submit">Add Task</button>
			</form>
			<HomeButton />
		</section>
	);
};

export default AddTask;
