import { useState } from 'react';

// components
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';

interface CategoryTileAccordionProps {
	title: string;
	imageUrl: string;
	backgroundColor: string;
}

const CategoryTileAccordion: React.FC<CategoryTileAccordionProps> = (
	props
) => {
	const { title, imageUrl, backgroundColor, children } = props;

	const [isOpen, setIsOpen] = useState(false);

	const openAndCloseHandler = () => {
		setIsOpen((prevState) => !prevState);
	}; // End of openAndCloseHandler

	return (
		<div className="overflow-hidden rounded-md bg-white">
			{/* Button */}
			<div className="mt-[5.24px] mr-[4.45px] hidden justify-end sm:flex">
				<button
					onClick={openAndCloseHandler}
					className="flex h-[17.36px] w-[17.36px] items-center justify-center rounded-full bg-gray outline-none"
				>
					-
				</button>
			</div>

			<div className="flex h-[65px] items-center space-x-[10px] pl-[10px]">
				{/* Color Box */}
				<button
					onClick={openAndCloseHandler}
					className="sm:h-[22.69px]s sm:w-[22.69px]s h-[26px] w-[26px] outline-none"
					style={{ backgroundColor }}
				></button>
				{/* Image */}
				<div className="relative h-[47px] w-[47px]">
					<ImageWithErrorHandler
						src={imageUrl}
						alt="category-search"
						fill={true}
					/>
				</div>
				{/* Title */}
				<p className="text-[15px] font-semibold leading-[18.29px] text-gray sm:text-[18px] sm:leading-[21.94px]">
					{title}
				</p>
			</div>

			{isOpen && <div>{children}</div>}

			{/* Bottom color box */}
			<div
				className="h-[10px] w-full"
				style={{ backgroundColor }}
			></div>
		</div>
	);
}; // End of CategoryTileAccordion

export default CategoryTileAccordion;
