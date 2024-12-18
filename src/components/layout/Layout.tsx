import React from 'react';
import styles from './layout.module.scss';
import Link from 'next/link';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<>
			<header className={styles.header}>
				<Link href="../">
					<h1 className={styles.logo}>Your personal ToDo list</h1>
				</Link>
			</header>
			<main className={styles.main}>{children}</main>
			<footer className={styles.footer}>
				<p>© 2024 ToDo List</p>
			</footer>
		</>
	);
};

export default Layout;
