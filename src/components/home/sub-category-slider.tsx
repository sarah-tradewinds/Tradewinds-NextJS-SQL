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

	const slider = React.useRef(null);

	const settings = {
		slidesToShow: slidesToShow || 4,
		slidesToScroll: 4,
		speed: 500,
		rows: rows || 2,
		arrows: false,
		infinite: false
	};

	return (
		<div className={`relative w-full ${subCategoryContainerClassName}`}>
			<Button
				// className={`absolute -left-2 top-1/2 flex !h-[40px] !w-[40px] -translate-y-1/2 transform items-center justify-center !rounded-full border-2 border-primary-main !p-0 !text-primary-main ${leftButtonClassName}`}
				onClick={() => (slider?.current as any)?.slickPrev()}
				className={`absolute -left-[40px] top-1/2 flex -translate-y-1/2 transform items-center justify-center !rounded-full !px-0 !py-0 lg:!h-[33px] lg:!w-[33px] lg:border lg:!border-[#575858] ${leftButtonClassName}`}
			>
				<MdChevronLeft className="w-full text-[#575858] lg:h-full" />
			</Button>

			<div className={`${className}`}>
				<div>
					<Slider ref={slider} {...settings}>
						{categories?.map((subCat: any) => {
							const { categories: category } = subCat as any;
							const categoryData = category || subCat;
							return (
								<div key={subCat.id}>
									<SubCategoryCard
										key={categoryData.id}
										subCat={categoryData}
										onClick={() => {
											if (onTileClick)
												onTileClick(categoryData?.id, categoryData);
										}}
										style={subCategoryStyle}
										containerClassName="lg:!w-[239px] lg:!h-[134px] lg:!border-[2px] lg:!border-[#C4C4C4] lg:!mb-[11px]"
									/>
								</div>
							);
						})}
					</Slider>
				</div>
			</div>

			<Button
				className={`absolute -right-[34px] top-1/2 flex !h-[40px] !w-[40px] -translate-y-1/2 transform items-center justify-center !rounded-full !px-0 !py-0 lg:!h-[33px] lg:!w-[33px] lg:border lg:!border-[#575858] ${rightButtonClassName}`}
				onClick={() => (slider?.current as any)?.slickNext()}
			>
				<MdChevronRight className="w-full text-[#575858] lg:h-full" />
			</Button>
		</div>
	);
};

export default SubCategorySlider;
