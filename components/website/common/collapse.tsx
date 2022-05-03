import { useEffect, useState } from 'react';

interface CollapseProps {
	isOpen?: boolean;
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
		isOpen,
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

	const [isCollapse, setIsCollapse] = useState(false);

	useEffect(() => {
		if (isOpen === undefined) {
			setIsCollapse((prevState) => !prevState);
		}
	}, [isOpen]);

	const collapseHandler = () => {}; // End of collapseHandler

	const transition = `transition-all duration-500`;
	let childClassName = `h-0 overflow-hidden ${transition}`;

	if (isCollapse) {
		childClassName = `${transition} h-auto`;
	}

	return (
		<div>
			{/* Header */}
			<div
				className={`justify-betweens relative flex cursor-pointer ${
					isReverse ? 'flex-row-reverse' : ''
				} items-center`}
				style={{ backgroundColor: collapseHeadBgHexColor }}
			>
				<div onClick={onLeadingClick}>{leading}</div>
				<div
					onClick={onContentClick}
					className={`ml-4 p-2 ${contentClassName}`}
				>
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
