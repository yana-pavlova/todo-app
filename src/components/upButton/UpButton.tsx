import styles from './upButton.module.scss';
import { useEffect, useState } from 'react';

const UpButton = () => {
	const [isHidden, setIsHidden] = useState(true);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
		});
	};

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 500) {
				setIsHidden(false);
			} else {
				setIsHidden(true);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<button
			onClick={scrollToTop}
			className={`${styles.scrollToTop} ${isHidden ? 'visually-hidden' : ''}`}
			type="button"
		>
			<img
				className={styles.arrow}
				src="img/arrow-up.svg"
				alt="Arrow pointing top"
			/>
		</button>
	);
};

export default UpButton;
