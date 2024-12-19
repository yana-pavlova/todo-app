import React from 'react';
import HomeButton from '../components/homeButton/HomeButton';
import Heading from '../components/heading/Heading';

const AddTask: React.FC = () => {
	return (
		<section>
			<Heading>Add a New Task</Heading>
			<form>
				<label>
					Task Name:
					<input type="text" name="taskName" />
				</label>
				<button type="submit">Add Task</button>
			</form>
			<HomeButton />
		</section>
	);
};

export default AddTask;
