import React from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import TaskList from '../components/taskList/TaskList';
import { TaskType } from '../types';
import UpButton from '../components/upButton/UpButton';
import Heading from '../components/heading/Heading';
import Button from '../components/button/Button';

const Home: React.FC = () => {
	const loading = useSelector((state: RootState) => state.tasks.loading);
	const error = useSelector((state: RootState) => state.tasks.error);

	return (
		<>
			{loading && <p>Loading...</p>}
			{error && (
				<p className={styles.error}>
					Something went wrong and we couldn&apos;t fetch tasks. But you can add
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
						<Heading>Want to add a task?</Heading>
						<Link href={'/add-task'} className={styles.addButton}>
							<Button type="submit">Add a task!</Button>
						</Link>
					</section>
					<section id="uncompleted">
						<Heading>To do</Heading>
						<TaskList type={TaskType.Uncompleted} />
					</section>
					<section id="completed">
						<Heading>Completed</Heading>
						<TaskList type={TaskType.Completed} />
					</section>
					<UpButton />
				</>
			)}
		</>
	);
};

export default Home;
