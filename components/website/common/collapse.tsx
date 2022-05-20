import { useState } from 'react';

interface CollapseProps {
	initialValue?: boolean;
	leading?: any;
	title?: any;
	subtitle?: any;
	trailing?: any;
	contentClassName?: string;
	collapseHeadBgHexColor?: string;
	isReverse?: boolean;
	onLeadingClick?: () => any;
	onContentClick?: () => any;
}

const Collapse: React.FC<CollapseProps> = (props) => {
	const {
		initialValue,
		leading,
		title,
		subtitle,
		trailing,
		collapseHeadBgHexColor,
		isReverse,
		children,
		onLeadingClick,
		onContentClick,
		contentClassName
	} = props;

	const [isOpen, setIsOpen] = useState(initialValue);

	const collapseHandler = () => {}; // End of collapseHandler

	const transition = `transition-all duration-500`;
	let childClassName = `h-0 overflow-hidden ${transition}`;

	if (isOpen) {
		childClassName = `${transition} h-auto`;
	}

	return (
		<div>
			{/* Header */}
			<div
				className={`relative flex cursor-pointer justify-between ${
					isReverse ? 'flex-row-reverse' : ''
				} items-center`}
				style={{ backgroundColor: collapseHeadBgHexColor }}
			>
				<div className={`flex ${isReverse ? 'flex-row-reverse' : ''}`}>
					<div
						onClick={() => {
							setIsOpen((prevState) => !prevState);
							if (onLeadingClick) {
								onLeadingClick();
							}
						}}
					>
						{leading}
					</div>
					<div
						onClick={onContentClick}
						className={`ml-4 flex flex-col p-2 ${contentClassName}`}
					>
						<p>{title}</p>
						<p>{subtitle}</p>
					</div>
				</div>
				<div>{trailing}</div>
			</div>
			{/* Children */}
			<div className={childClassName}>{children}</div>
		</div>
	);
}; // End of Collapse component

export default Collapse;
