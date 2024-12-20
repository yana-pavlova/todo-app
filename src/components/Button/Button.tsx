import styles from './button.module.scss';

interface ButtonProps {
	children: string;
	type: 'button' | 'submit' | 'reset' | undefined;
	onClick?: () => void;
	semantic?: 'warning' | 'success' | 'danger' | 'default';
}

const Button: React.FC<ButtonProps> = ({
	children,
	type,
	onClick,
	semantic = 'default',
}) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className={`${styles.button} ${styles[semantic]}`}
		>
			{children}
		</button>
	);
};

export default Button;
