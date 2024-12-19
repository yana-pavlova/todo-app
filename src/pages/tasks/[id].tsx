import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchTasks, selectTaskById } from '../../store/tasksSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Task from '../../components/task/Task';
import HomeButton from '../../components/homeButton/HomeButton';
import Heading from '../../components/heading/Heading';

const TaskPage: React.FC = () => {
	const router = useRouter();
	const taskId = Number(router.query.id);
	const [isRemoved, setIsRemoved] = useState(false);

	const loading = useSelector((state: RootState) => state.tasks.loading);
	const error = useSelector((state: RootState) => state.tasks.error);
	const task = useSelector((state: RootState) =>
		!isNaN(taskId) ? selectTaskById(state, taskId) : null
	);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <div>Something went wrong: {error}</div>;
	}

	if (isRemoved) {
		return (
			<>
				<div>Task successfully removed</div>
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
