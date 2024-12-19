import Link from 'next/link';
import styles from './homeButton.module.scss';

const HomeButton: React.FC = () => {
	return (
		<Link className={styles.link} href="/">
			Go home
		</Link>
	);
};

export default HomeButton;
