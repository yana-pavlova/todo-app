import styles from './heading.module.scss';

interface HeadingProps {
	children: string;
}

const Heading: React.FC<HeadingProps> = ({ children }) => {
	return <h2 className={styles.heading}>{children}</h2>;
};

export default Heading;
