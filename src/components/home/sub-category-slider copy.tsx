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
	slidesToScroll?: number;
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
		slidesToScroll = 4,
		rows = 2
	} = props;

	const slider = React.useRef(null);

	const settings = {
		slidesToShow: slidesToShow || 4,
		slidesToScroll: slidesToScroll || 4,
		speed: 500,
		rows: rows || 2,
		arrows: false,
		infinite: false
	};

	return (
		<div className={`relative w-full ${subCategoryContainerClassName}`}>
			<Button
				onClick={() => (slider?.current as any)?.slickPrev()}
				className={`absolute -left-[45px] top-1/2 hidden -translate-y-1/2 transform items-center justify-center !rounded-full bg-[#DCDBDB] !px-0 !py-0 lg:flex lg:!h-[20px] lg:!w-[40px] lg:border ${leftButtonClassName}`}
			>
				<MdChevronLeft className="text-[#575858]s w-full text-white lg:h-full" />
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
										// containerClassName="md:!w-[220px] md:!h-[134px] lg:!w-[239px] lg:!h-[134px] lg:!border-[2px] lg:!border-[#C4C4C4] lg:!mb-[11px] md:!mb-[11px]"
										containerClassName="md:!h-[134px] md:!mb-[11px] md:!mr-[11px]"
									/>
								</div>
							);
						})}
					</Slider>
				</div>
			</div>

			<Button
				className={`absolute -right-[40px] top-1/2 hidden !h-[40px] !w-[40px] -translate-y-1/2 transform items-center justify-center !rounded-full bg-[#DCDBDB] !px-0 !py-0 lg:flex lg:!h-[20px] lg:!w-[40px] lg:border ${rightButtonClassName}`}
				onClick={() => (slider?.current as any)?.slickNext()}
			>
				<MdChevronRight className="text-[#575858]s w-full text-white lg:h-full" />
			</Button>
		</div>
	);
};

export default SubCategorySlider;
