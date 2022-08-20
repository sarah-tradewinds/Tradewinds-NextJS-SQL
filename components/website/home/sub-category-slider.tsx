import React from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Slider from 'react-slick';
import Button from '../common/form/button';
import SubCategoryCard from './common/sub-category-card';

const SubCategorySlider: React.FC<{
	categories: any[];
	onTileClick?: (categoryId: string) => any;
	className?: string;
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
				className={`absolute -left-2 top-1/2 flex !h-[40px] !w-[40px] -translate-y-1/2 transform items-center justify-center !rounded-full border-2 border-primary-main !p-0 !text-primary-main ${leftButtonClassName}`}
				onClick={() => (slider?.current as any)?.slickPrev()}
			>
				<MdChevronLeft className="h-[32px] w-[32px]" />
			</Button>

			<div className={`mx-[48px] ${className}`}>
				<div>
					<Slider ref={slider} {...settings}>
						{categories.map((subCat: any) => {
							const { categories: category } = subCat as any;

							return (
								<div
									key={subCat.id}
									className="!mt-[24px] !w-[95%] transform transition duration-300 ease-in-out hover:-translate-y-2"
								>
									<SubCategoryCard
										key={subCat.id}
										subCat={category || subCat}
										onClick={() => {
											if (onTileClick) onTileClick(category.id);
										}}
										containerClassName="min-h-[80px] md:min-h-[124px] lg:min-h-[140px]"
									/>
								</div>
							);
						})}
					</Slider>
				</div>
			</div>

			<Button
				className={`absolute right-0 top-1/2 flex !h-[40px] !w-[40px] -translate-y-1/2 transform items-center justify-center !rounded-full border-2 border-primary-main !p-0 !text-primary-main ${rightButtonClassName}`}
				onClick={() => (slider?.current as any)?.slickNext()}
			>
				<MdChevronRight className="h-[32px] w-[32px]" />
			</Button>
		</div>
	);
};

export default SubCategorySlider;
