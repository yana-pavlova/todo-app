import React from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { TasksProvider } from '../components/providers/TasksProvider';
import '../styles/fonts.css';
import '../styles/globals.scss';
import '../styles/common.scss';
import Layout from '../components/layout/Layout';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<React.StrictMode>
			<Provider store={store}>
				<TasksProvider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</TasksProvider>
			</Provider>
		</React.StrictMode>
	);
};

export default MyApp;
