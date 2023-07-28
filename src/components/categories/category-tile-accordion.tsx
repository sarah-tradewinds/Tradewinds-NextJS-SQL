import { useState } from 'react';

// components
import { MinusCircleIcon } from '@heroicons/react/20/solid';
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import { useTranslation } from 'next-i18next';
interface CategoryTileAccordionProps {
	title: string;
	imageUrl: string;
	backgroundColor: string;
	onTitleClick?: () => void;
}

const CategoryTileAccordion: React.FC<CategoryTileAccordionProps> = (
	props
) => {
	const { title, imageUrl, backgroundColor, children, onTitleClick } =
		props;
	const { t } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);

	const openAndCloseHandler = () => {
		setIsOpen((prevState) => !prevState);
	}; // End of openAndCloseHandler

	return (
		<div className="overflow-hidden rounded-md bg-white">
			{/* Button */}
			<div className="mt-[5.24px] mr-[4.45px] hidden justify-end sm:flex lg:hidden">
				<button
					onClick={openAndCloseHandler}
					className="flex h-[17.36px] w-[17.36px] items-center justify-center rounded-full outline-none md:h-[20.78px] md:w-[20.78px]"
				>
					<MinusCircleIcon className="text-[#C4C4C4]" />
				</button>
			</div>

			<div className="flex h-[65px] items-center space-x-[10px] pl-[10px]">
				<div className="flex h-[65px] items-center space-x-[10px]">
					{/* Color Box */}
					<button
						onClick={openAndCloseHandler}
						className="sm:w-[22.69px]s h-[26px] w-[26px] outline-none"
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
				</div>

				{/* Title */}
				<button
					onClick={onTitleClick}
					className="cursor-pointer text-left text-[15px] font-semibold leading-[18.29px] text-gray outline-none sm:text-[18px] sm:leading-[21.94px] xl:text-[21.16px] xl:leading-[25.8px] desktop:text-[25px] desktop:leading-[30.48px]"
				>
					{title}
				</button>
			</div>

			{isOpen && <div>{children}</div>}

			{/* Bottom color box */}
			<div className="relative">
				<div
					className="h-[10px] w-full  md:h-[11px] lg:h-[8.85px] xl:h-[11px]"
					style={{ backgroundColor }}
				>
					<button
						onClick={openAndCloseHandler}
						className="absolute top-1/2 left-1/2 z-10 mt-[0px] hidden h-[12.26px] w-[54.47px] -translate-y-1/2 -translate-x-1/2 rounded-sm bg-primary-main text-[10.21px] font-semibold leading-[12.45px] text-white outline-none lg:block xl:h-[15.24px] xl:w-[67.72px]"
					>
						{isOpen ? t('less') : t('more')}
					</button>
				</div>
			</div>
		</div>
	);
}; // End of CategoryTileAccordion

export default CategoryTileAccordion;
