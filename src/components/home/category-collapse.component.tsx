import { useState } from 'react';

// Third party package
import { HiMinusCircle, HiPlusCircle } from 'react-icons/hi';

// components
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';

interface CategoryCollapseProps {
	title: string;
	imageUrl: string;
	children?: React.ReactNode;
	containerClassName?: string;
	backgroundColor?: string;
	onTitleClick?: () => void;
}

const CategoryCollapse: React.FC<CategoryCollapseProps> = (props) => {
	const { title, imageUrl, children, backgroundColor, onTitleClick } =
		props;

	const [isOpen, setIsOpen] = useState(false);

	const transition = `transition-all duration-500`;
	let childClassName = `h-0 overflow-hidden ${transition}`;

	if (isOpen) {
		childClassName = `${transition} h-auto`;
	}

	return (
		<div className="overflow-hidden rounded-t-md bg-white">
			<div
				className="relative flex h-[67px] items-center justify-between rounded-md pl-2"
				style={{ backgroundColor }}
			>
				<div className="flex items-center space-x-4">
					<button
						onClick={() => setIsOpen((prevState) => !prevState)}
						className="text-[26px] text-primary-main outline-none"
					>
						{isOpen ? <HiMinusCircle /> : <HiPlusCircle />}
					</button>
					<p onClick={onTitleClick} className="text-[18px] font-semibold text-primary-main">
						{title}
					</p>
				</div>

        {/* Image container */}
        <div className="relative w-20 h-full">
				<div className="absolute right-0 top-1/2 transform -translate-y-1/2">
					<ImageWithErrorHandler
						src={imageUrl}
						alt=""
						width={80}
						height={80}
						className="h-20 w-20"
					/>
				</div>
				</div>
			</div>

			{/* Children */}
			<div className={childClassName}>{children}</div>
		</div>
	);
}; // End of CategoryCollapse component

export default CategoryCollapse;
