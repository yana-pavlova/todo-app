import { useSelector } from 'react-redux';
import Task from '../task/Task';
import styles from './taskList.module.scss';
import { selectTasksByType } from '../../store/tasksSlice';
import { TaskType } from './../../types';
import { RootState } from '../../store/store';

interface TaskListProps {
	type: TaskType;
}

const TaskList: React.FC<TaskListProps> = ({ type }) => {
	const tasks = useSelector((state: RootState) =>
		selectTasksByType(state, type)
	);

	return (
		<>
			<ul className={styles.list}>
				{tasks.map((task) => (
					<Task key={task.id} task={task} isFullView={false} />
				))}
			</ul>
		</>
	);
};

export default TaskList;
