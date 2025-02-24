import React, { useEffect } from 'react';
import HomeButton from '../../components/homeButton/HomeButton';
import Heading from '../../components/heading/Heading';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, selectTasks } from '../../store/tasksSlice';
import { TTask } from '../../types';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';

const AddTask: React.FC = () => {
	const dispatch = useDispatch();
	const tasks = useSelector(selectTasks);
	const ref = React.useRef<HTMLTextAreaElement>(null);
	const navigate = useNavigate();

	useEffect(() => {
		ref.current?.focus();
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		e.target.style.height = 'auto';
		e.target.style.height = `${e.target.scrollHeight}px`;
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const taskName = ref.current?.value;
		if (!taskName?.trim()) return;

		const maxId = tasks.reduce(
			(max, task) => (task.id > max ? task.id : max),
			0
		);

		const newTask: TTask = {
			id: maxId + 1,
			title: taskName,
			completed: false,
			userId: 1,
		};

		dispatch(addTask(newTask));

		if (ref.current) {
			ref.current.value = '';
			ref.current.style.height = 'auto';
		}

		navigate('/');
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
				<Button type="submit" semantic="success">
					Add Task
				</Button>
			</form>
			<HomeButton />
		</section>
	);
};

export default AddTask;
