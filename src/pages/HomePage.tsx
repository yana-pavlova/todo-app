import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, selectTasks } from '../store/tasksSlice';
import { TaskType, TTask } from '../types';
import TaskList from '../components/taskList/TaskList';
import Button from '../components/button/Button';
import Heading from '../components/heading/Heading';
import styles from './styles.module.scss';

const HomePage: React.FC = () => {
	const allTasks = useSelector(selectTasks);
	const [currentType, setCurrentType] = useState<TaskType>(
		TaskType.Uncompleted
	);

	const dispatch = useDispatch();
	const tasks = useSelector(selectTasks);
	const ref = React.useRef<HTMLTextAreaElement>(null);

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
	};

	return (
		<>
			<Heading>Your tasks</Heading>
			<div className={styles.controls}>
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
				<div className={styles.filters}>
					<Button
						type="button"
						semantic={currentType === TaskType.All ? 'success' : 'default'}
						onClick={() => setCurrentType(TaskType.All)}
					>
						All ({allTasks.length})
					</Button>
					<Button
						type="button"
						semantic={
							currentType === TaskType.Uncompleted ? 'success' : 'default'
						}
						onClick={() => setCurrentType(TaskType.Uncompleted)}
					>
						Active ({allTasks.filter((t) => !t.completed).length})
					</Button>
					<Button
						type="button"
						semantic={
							currentType === TaskType.Completed ? 'success' : 'default'
						}
						onClick={() => setCurrentType(TaskType.Completed)}
					>
						Completed ({allTasks.filter((t) => t.completed).length})
					</Button>
				</div>
			</div>
			<TaskList type={currentType} />
		</>
	);
};

export default HomePage;
