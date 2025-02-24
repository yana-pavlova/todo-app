import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store';
import { TasksProvider } from './components/providers/TasksProvider';
import App from './App';
import './styles/fonts.css';
import './styles/globals.scss';
import './styles/common.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<TasksProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</TasksProvider>
		</Provider>
	</React.StrictMode>
);
