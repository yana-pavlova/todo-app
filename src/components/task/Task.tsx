// TODO separate fullView/smallView modes into different components

import Link from 'next/link';
import Image from 'next/image';
import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeTask, editTask, completeTask } from '../../store/tasksSlice';
import { TTask } from '../../types';
import styles from './task.module.scss';

interface TaskProps {
	task: TTask;
	isFullView: boolean;
	onRemove?: () => void;
}

const TaskComponent: React.FC<TaskProps> = ({ task, isFullView, onRemove }) => {
	const dispatch = useDispatch();
	const [isEditing, setIsEditing] = useState(false);
	const [editValue, setEditValue] = useState(task.title);
	const [isChanging, setIsChanging] = useState(false);

	const handleRemove = () => {
		setIsChanging(true);
		setTimeout(() => {
			dispatch(removeTask(task.id));
			if (onRemove) {
				onRemove();
			}
		}, 300);
	};

	const handleEditStart = () => {
		setIsEditing(true);
	};

	const handleEditEnd = () => {
		if (editValue.trim() && editValue !== task.title) {
			dispatch(editTask({ ...task, title: editValue }));
		}
		setIsEditing(false);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleEditEnd();
		} else if (event.key === 'Escape') {
			setEditValue(task.title);
			setIsEditing(false);
		}
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEditValue(event.target.value);
	};

	const handleComplete = () => {
		if (isFullView) {
			dispatch(completeTask({ ...task, completed: !task.completed }));
			return;
		} else {
			setIsChanging(true);
			setTimeout(() => {
				dispatch(completeTask({ ...task, completed: !task.completed }));
			}, 300);
		}
	};

	const handleDoubleClick = () => {
		if (isFullView) {
			handleEditStart();
		}
	};

	const TaskLabel = () => (
		<label
			onDoubleClick={handleDoubleClick}
			className={styles.label + ' ' + (task.completed ? styles.completed : '')}
		>
			{task.id}. {task.title}
		</label>
	);

	return (
		<li
			className={`${styles.task} ${isChanging ? styles.removing : ''} ${
				isFullView ? styles.fullView : ''
			}`}
			key={task.id}
		>
			<input
				onChange={handleComplete}
				className={styles.checkbox}
				type="checkbox"
				checked={task.completed}
			/>
			{isEditing ? (
				<input
					value={editValue}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					className={`${styles.input}`}
					autoFocus
				/>
			) : isFullView ? (
				<TaskLabel />
			) : (
				<Link className={styles.labelSmallView} href={`/tasks/${task.id}`}>
					<TaskLabel />
				</Link>
			)}
			{isFullView && (
				<button className={styles.button} onClick={handleEditStart}>
					Edit
				</button>
			)}
			<button className={styles.button}>
				<Image
					onClick={handleRemove}
					className={styles.removeIcon}
					src="/img/rubbish-bin.svg"
					alt="Cross icon"
					width={0}
					height={0}
				/>
			</button>
		</li>
	);
};

const Task = memo(TaskComponent, (prevProps, nextProps) => {
	return (
		prevProps.task.id === nextProps.task.id &&
		prevProps.task.title === nextProps.task.title &&
		prevProps.task.completed === nextProps.task.completed &&
		prevProps.isFullView === nextProps.isFullView
	);
});

Task.displayName = 'Task';

export default Task;
