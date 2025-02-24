import React from 'react';
import styles from './layout.module.scss';
import { Link } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<>
			<header className={styles.header}>
				<Link to="/">
					<h1 className={styles.logo}>Your personal ToDo list</h1>
				</Link>
			</header>
			<main className={styles.main}>{children}</main>
			<footer className={styles.footer}>
				<p>© 2025 ToDo List</p>
			</footer>
		</>
	);
};

export default Layout;
