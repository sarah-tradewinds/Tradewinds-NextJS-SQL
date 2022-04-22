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
	onTrailingClick?: () => any;
	onTileClick?: () => any;
}

const Collapse: React.FC<CollapseProps> = (props) => {
	const {
		initialValue = false,
		leading,
		title,
		subtitle,
		trailing,
		collapseHeadBgHexColor,
		isReverse,
		children,
		onTileClick,
		contentClassName
	} = props;

	const [isOpen, setIsOpen] = useState<boolean>(initialValue);

	const collapseHandler = () => {
		setIsOpen((prevState) => !prevState);

		if (onTileClick) {
			onTileClick();
		}
	}; // End of collapseHandler

	const transition = `transition-all duration-500`;
	let childClassName = `h-0 overflow-hidden ${transition}`;

	if (isOpen) {
		childClassName = `${transition} h-auto`;
	}

	return (
		<div>
			{/* Header */}
			<div
				onClick={collapseHandler}
				className={`justify-betweens relative flex cursor-pointer ${
					isReverse ? 'flex-row-reverse' : ''
				} items-center`}
				style={{ backgroundColor: collapseHeadBgHexColor }}
			>
				<div>{leading}</div>
				<div className={`ml-4 p-2 ${contentClassName}`}>
					<p>{title}</p>
					<p>{subtitle}</p>
				</div>
				<div>{trailing}</div>
			</div>
			{/* Children */}
			<div className={childClassName}>{children}</div>
		</div>
	);
}; // End of Collapse component

export default Collapse;
