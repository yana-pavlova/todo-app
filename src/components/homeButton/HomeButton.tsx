import { Link } from 'react-router-dom';
import styles from './homeButton.module.scss';

const HomeButton = () => {
	return (
		<Link to="/" className={styles.button}>
			Go back
		</Link>
	);
};

export default HomeButton;
