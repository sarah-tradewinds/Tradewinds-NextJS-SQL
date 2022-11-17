import Link from 'next/link';

interface ButtonProps {
	type?: 'button' | 'submit' | 'reset';
	variant?: 'buyer' | 'product' | 'special' | 'eco-2nd-product';
	className?: string;
	href?: string;
	onClick?: (event: any) => any;
	disabled?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
	const {
		type,
		variant,
		children,
		className,
		onClick,
		href,
		disabled
	} = props;

	const buttonBaseClassName = `min-h-[40px] px-8 rounded-md text-sm font-semibold text-white tracking-wider disabled:opacity-60`;

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

	if (href) {
		return (
            (<Link
                href={href}
                className={`flex items-center justify-center ${buttonClassName} ${className}`}>

                {children}

            </Link>)
        );
	}

	return (
		<button
			type={type || 'button'}
			onClick={onClick}
			className={`${buttonClassName} ${className}`}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
