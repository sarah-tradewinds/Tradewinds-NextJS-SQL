interface InputProps {
	id?: string;
	name?: string;
	type?: React.HTMLInputTypeAttribute;
	value?: any;
	placeholder?: any;
	onChange?: (event: any) => any;
	icon?: any;
	containerClassName?: string;
	className?: string;
	required?: boolean;
	invalid?: boolean;
	isSmall?: boolean;
	checked?: boolean;
}

const Input: React.FC<InputProps> = (props) => {
	const {
		id,
		name,
		type,
		value,
		placeholder,
		onChange,
		icon,
		containerClassName,
		className,
		required,
		invalid,
		isSmall,
		checked
	} = props;

	const inputClassName = `rounded-md border-2 ${
		isSmall ? 'py-1' : 'py-2'
	} pl-8 pr-4 focus:outline-none ${
		invalid ? 'border-accent-error' : 'border-accent-primary-main'
	} ${className}`;

	return (
		<div className={`relative ${containerClassName}`}>
			<input
				id={id || name}
				name={name}
				type={type || 'text'}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				required={required}
				className={inputClassName}
				checked={checked}
			/>
			<span className="absolute left-3 top-1/2 -translate-y-1/2 transform">
				{icon}
			</span>
		</div>
	);
};

export default Input;
