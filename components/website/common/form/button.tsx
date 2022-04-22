interface ButtonProps {
	variant?: 'buyer' | 'product' | 'special' | 'eco-2nd-product';
	className?: string;
	onClick?: () => any;
}

const Button: React.FC<ButtonProps> = (props) => {
	const { variant, children, className, onClick } = props;

	const buttonBaseClassName = `min-h-[40px] px-8 rounded-md text-sm font-semibold text-white tracking-wider`;

	let buttonClassName = buttonBaseClassName;

	switch (variant) {
		case 'buyer':
			buttonClassName = `${buttonBaseClassName} bg-accent-primary-main`;
			break;
		case 'product':
			buttonClassName = `${buttonBaseClassName} bg-accent-secondary-main`;
			break;
		case 'special':
			buttonClassName = `${buttonBaseClassName} bg-secondary`;
			break;
		case 'eco-2nd-product':
			buttonClassName = `${buttonBaseClassName} bg-accent-secondary-eco`;
			break;
		default:
			buttonClassName = buttonBaseClassName;
	}

	return (
		<button
			onClick={onClick}
			className={`${buttonClassName} ${className}`}
		>
			{children}
		</button>
	);
};

export default Button;
