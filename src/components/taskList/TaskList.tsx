import { useSelector } from 'react-redux';
import Task from '../task/Task';
import styles from './taskList.module.scss';
import {
	selectCompletedTasks,
	selectOpenedTasks,
} from '../../store/tasksSlice';
import { TaskType } from './../../types';

interface TaskListProps {
	type: TaskType;
}

const TaskList: React.FC<TaskListProps> = ({ type }) => {
	const tasks =
		type === TaskType.Completed
			? useSelector(selectCompletedTasks) ?? []
			: useSelector(selectOpenedTasks) ?? [];

	return (
		<ul className={styles.list}>
			{tasks.map((task) => (
				<Task key={task.id} task={task} isFullView={false} />
			))}
		</ul>
	);
};

export default TaskList;
