import Link from 'next/link';

interface ArrowButtonProps {
	className?: string;
	href?: string;
	onClick?: (event: any) => any;
	disabled?: boolean;
}

const ArrowButton: React.FC<ArrowButtonProps> = (props) => {
	const { children, className, onClick, href, disabled } = props;

	const buttonBaseClassName = `min-h-[40px] px-8 rounded-md text-sm font-semibold text-white tracking-wider disabled:opacity-60`;

	let buttonClassName = buttonBaseClassName;

	if (href) {
		return (
			<Link href={href}>
				<a
					className={`flex items-center justify-center ${buttonClassName} ${className}`}
				>
					{children}
				</a>
			</Link>
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

export default ArrowButton;
