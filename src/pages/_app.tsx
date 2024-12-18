import React from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import '../styles/globals.scss';
import '../styles/common.scss';
import Layout from '../components/layout/Layout';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<React.StrictMode>
			<Provider store={store}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Provider>
		</React.StrictMode>
	);
};

export default MyApp;
