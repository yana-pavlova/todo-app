import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { selectTaskById } from '../../store/tasksSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Task from '../../components/task/Task';
import HomeButton from '../../components/homeButton/HomeButton';
import Heading from '../../components/heading/Heading';
import styles from './styles.module.scss';

const TaskPage: React.FC = () => {
	const { id } = useParams();
	const taskId = Number(id);
	const [isRemoved, setIsRemoved] = useState(false);

	const task = useSelector((state: RootState) =>
		!isNaN(taskId) ? selectTaskById(state, taskId) : null
	);

	if (isRemoved) {
		return (
			<>
				<p className={styles.paragraph}>Task successfully removed</p>
				<HomeButton />
			</>
		);
	}

	if (!task) {
		return (
			<>
				<div>Task not found</div>
				<HomeButton />
			</>
		);
	}

	return (
		<>
			<Heading>Edit the task</Heading>
			<Task task={task} isFullView={true} onRemove={() => setIsRemoved(true)} />
			<HomeButton />
		</>
	);
};

export default TaskPage;
