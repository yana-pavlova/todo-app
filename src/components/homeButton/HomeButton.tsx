import Link from 'next/link';
import styles from './homeButton.module.scss';

const HomeButton: React.FC = () => {
	return (
		<Link className={styles.link} href="/">
			Go back
		</Link>
	);
};

export default HomeButton;
