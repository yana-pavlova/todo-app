//? separate fullView/smallView modes into different components

import Link from 'next/link';
import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeTask, editTask, completeTask } from '../../store/tasksSlice';
import { TTask } from '../../types';
import styles from './task.module.scss';
import Button from '../button/Button';

interface TaskProps {
	task: TTask;
	isFullView: boolean;
	onRemove?: () => void;
}

const TaskComponent: React.FC<TaskProps> = ({ task, isFullView, onRemove }) => {
	const dispatch = useDispatch();
	const [isEditing, setIsEditing] = useState(false);
	const [editValue, setEditValue] = useState(task.title);
	const [isRemoving, setIsRemoving] = useState(false);

	const handleRemove = () => {
		setIsRemoving(true);
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
			handleCancel();
		}
	};

	const handleCancel = () => {
		setEditValue(task.title);
		setIsEditing(false);
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEditValue(event.target.value);
	};

	const handleComplete = () => {
		if (isFullView) {
			dispatch(completeTask({ ...task, completed: !task.completed }));
			return;
		} else {
			setIsRemoving(true);
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
			className={`${styles.task} ${isRemoving ? styles.removing : ''} ${
				isFullView ? styles.fullView : ''
			}`}
			key={task.id}
		>
			{isEditing ? (
				<input
					value={editValue}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					className={styles.input}
					autoFocus
				/>
			) : isFullView ? (
				<TaskLabel />
			) : (
				<Link className={styles.labelSmallView} href={`/tasks/${task.id}`}>
					<TaskLabel />
				</Link>
			)}
			{isFullView && !isEditing && (
				<>
					<Button type="button" onClick={handleEditStart}>
						Edit
					</Button>
					<Button type="button" onClick={handleComplete} semantic="success">
						{task.completed ? 'Uncomplete' : 'Complete'}
					</Button>
					<Button type="button" onClick={handleRemove} semantic="danger">
						Delete
					</Button>
				</>
			)}
			{isFullView && isEditing && (
				<>
					<Button type="button" onClick={handleEditEnd} semantic="success">
						Save
					</Button>
					<Button type="button" onClick={handleCancel} semantic="danger">
						Cancel
					</Button>
				</>
			)}
			{!isFullView && (
				<>
					<Button type="button" onClick={handleComplete} semantic="success">
						{task.completed ? 'Uncomplete' : 'Complete'}
					</Button>
					<Button type="button" onClick={handleRemove} semantic="danger">
						Delete
					</Button>
				</>
			)}
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
