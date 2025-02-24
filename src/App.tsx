import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import TaskPage from './pages/tasks/TaskPage';
import HomePage from './pages/HomePage';

const App = () => {
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/tasks/:id" element={<TaskPage />} />
			</Routes>
		</Layout>
	);
};

export default App;
