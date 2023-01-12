import React from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Slider from 'react-slick';
import Button from '../common/form/button';
import SubCategoryCard from './common/sub-category-card';

const SubCategorySlider: React.FC<{
	categories: any[];
	onTileClick?: (categoryId: string, data: any) => any;
	className?: string;
	subCategoryContainerClassName?: string;
	subCategoryStyle?: any;
	leftButtonClassName?: string;
	rightButtonClassName?: string;
	slidesToShow?: number;
	rows?: number;
}> = (props) => {
	const slider = React.useRef(null);

	const {
		categories = [],
		onTileClick,
		className,
		subCategoryContainerClassName,
		subCategoryStyle,
		leftButtonClassName,
		rightButtonClassName,
		slidesToShow = 4,
		rows = 2
	} = props;

	const settings = {
		slidesToShow: slidesToShow || 4,
		slidesToScroll: 4,
		speed: 500,
		rows: rows || 2,
		arrows: false,
		infinite: false
	};

	return (
		<div className="relative w-full">
			<Button
				// className={`absolute -left-2 top-1/2 flex !h-[40px] !w-[40px] -translate-y-1/2 transform items-center justify-center !rounded-full border-2 border-primary-main !p-0 !text-primary-main ${leftButtonClassName}`}
				onClick={() => (slider?.current as any)?.slickPrev()}
				className={`absolute -left-[32px] top-1/2 flex -translate-y-1/2 transform items-center justify-center !rounded-full !px-0 !py-0 lg:!h-[20px] lg:!w-[28px] lg:!bg-[#DCDBDB] ${leftButtonClassName}`}
			>
				<MdChevronLeft className="h-full w-full text-white" />
			</Button>

			<div className={`mx-[48px]s ${className}`}>
				<div>
					<Slider ref={slider} {...settings}>
						{categories?.map((subCat: any) => {
							const { categories: category } = subCat as any;
							const categoryData = category || subCat;
							return (
								<div
									key={subCat.id}
									// className="!mt-[24px] !w-[95%] transform transition duration-300 ease-in-out hover:-translate-y-2"
									// className="!mt-[24px] !w-[95%] transform transition duration-300 ease-in-out hover:-translate-y-2"
								>
									<SubCategoryCard
										key={categoryData.id}
										subCat={categoryData}
										onClick={() => {
											if (onTileClick)
												onTileClick(categoryData?.id, categoryData);
										}}
										style={subCategoryStyle}
										// containerClassName={`min-h-[80px] md:min-h-[124px] lg:min-h-[140px] ${subCategoryContainerClassName}`}
										containerClassName="lg:!w-[239px] lg:!h-[134px] lg:!border-[2px] lg:!border-[#E1DDDD] lg:!mb-[11px]"
									/>
								</div>
							);
						})}
					</Slider>
				</div>
			</div>

			<Button
				className={`absolute -right-[18px] top-1/2 flex !h-[40px] !w-[40px] -translate-y-1/2 transform items-center justify-center !rounded-full !px-0 !py-0 lg:!h-[20px] lg:!w-[28px] lg:!bg-[#DCDBDB] ${rightButtonClassName}`}
				onClick={() => (slider?.current as any)?.slickNext()}
			>
				<MdChevronRight className="h-full w-full text-white" />
			</Button>
		</div>
	);
};

export default SubCategorySlider;
