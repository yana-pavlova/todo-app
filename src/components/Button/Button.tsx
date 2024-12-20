import styles from './button.module.scss';

interface ButtonProps {
	children: string;
	type: 'button' | 'submit' | 'reset' | undefined;
	onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, type, onClick }) => {
	return (
		<button type={type} onClick={onClick} className={styles.button}>
			{children}
		</button>
	);
};

export default Button;
