import React from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Slider from 'react-slick';
import Button from '../common/form/button';
import SubCategoryCard from './common/sub-category-card';

const SubCategorySlider: React.FC<{ categories: any[] }> = (props) => {
	const slider = React.useRef(null);

	const settings = {
		slidesToShow: 4,
		speed: 500,
		rows: 2,
		arrows: false,
		infinite: false
	};

	const { categories = [] } = props;

	return (
		<div className="relative w-full">
			<Button
				variant="buyer"
				className="absolute -left-2 top-1/2 flex !h-[40px] !w-[40px] -translate-y-1/2 transform items-center justify-center !rounded-full !p-0"
				onClick={() => (slider?.current as any)?.slickPrev()}
			>
				<MdChevronLeft className="h-[32px] w-[32px]" />
			</Button>
			<div className="mx-[48px]">
				<div>
					<Slider ref={slider} {...settings}>
						{categories.map((subCat: any) => {
							const { categories: category } = subCat as any;

							return (
								<div key={subCat.id} className="!mb-[24px] !w-[95%]">
									<SubCategoryCard
										key={subCat.id}
										subCat={category}
										// onClick={async () => {
										// 	await setSelectedMainCategoryId(
										// 		main_category.id!,
										// 		main_category.title
										// 	);
										// 	await setSelectedCategoryId(category.id as string);
										// 	router.push('/product-search');
										// }}
										// style={
										// 	applyBgColor
										// 		? { backgroundColor: main_category.bgHexColor }
										// 		: null
										// }
										containerClassName="min-h-[80px] md:min-h-[124px] lg:min-h-[140px]"
									/>
								</div>
							);
						})}
					</Slider>
				</div>
			</div>
			<Button
				variant="buyer"
				className="absolute right-0 top-1/2 flex !h-[40px] !w-[40px] -translate-y-1/2 transform items-center justify-center !rounded-full !p-0"
				onClick={() => (slider?.current as any)?.slickNext()}
			>
				<MdChevronRight className="h-[32px] w-[32px]" />
			</Button>
		</div>
	);
};

export default SubCategorySlider;
