import React from 'react';

const AddTask: React.FC = () => {
	return (
		<div>
			<h1>Add a New Task</h1>
			<form>
				<label>
					Task Name:
					<input type="text" name="taskName" />
				</label>
				<button type="submit">Add Task</button>
			</form>
		</div>
	);
};

export default AddTask;
