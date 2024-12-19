import styles from './upButton.module.scss';
import { useEffect, useState } from 'react';
import Image from 'next/image';

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
			<Image
				className={styles.arrow}
				src="img/arrow-up.svg"
				alt="Arrow pointing top"
				width={0}
				height={0}
			/>
		</button>
	);
};

export default UpButton;
