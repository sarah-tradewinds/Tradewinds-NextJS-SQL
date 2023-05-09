import useDeviceSize from 'hooks/use-device-size.hooks';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Slider from 'react-slick';
import { getLocaleText } from 'utils/get_locale_text';
import ImageWithErrorHandler from '../common/elements/image-with-error-handler';

const TrendingCategorySlider: React.FC<{
	categories: any[];
	selectedCategoryIds?: string[];
	onTileClick?: (categoryId: string, data: any) => any;
	className?: string;
	selectedTitleClassName?: string;
}> = (props) => {
	const slider = useRef(null);
	const router = useRouter();

	const { deviceWidth } = useDeviceSize();

	const {
		categories = [],
		onTileClick,
		selectedCategoryIds,
		className,
		selectedTitleClassName = ''
	} = props;

	let slideToShow = 2;
	if (deviceWidth >= 1512) {
		slideToShow = 3;
	}

	const settings = {
		slidesToShow: slideToShow,
		slidesToScroll: 3,
		speed: 500,
		rows: 2,
		arrows: false,
		infinite: false
	};

	const selectedCategories: any = [];
	const nonSelectedCategories: any = [];
	{
		categories?.map((subCat: any) => {
			const { categories: category } = subCat as any;
			const categoryData = category || subCat;
			const subCategoryTitle = getLocaleText(
				subCat?.title || {},
				router.locale
			);

			if (categoryData.id == selectedCategoryIds) {
				selectedCategories.push(categoryData);
			} else {
				nonSelectedCategories.push(categoryData);
			}
		});
	}
	const updatedCategories: any = [
		...selectedCategories,
		...nonSelectedCategories
	];

	return (
		<div className="relative w-full">
			<button
				className={`absolute top-1/2 -left-1 flex -translate-y-1/2 transform items-center justify-center !rounded-full border border-gray !px-0 !py-0 !text-gray md:!h-[22px] md:!w-[22px] lg:left-4 lg:!h-[33px] lg:!w-[33px] lg:border-2`}
				onClick={() => (slider?.current as any)?.slickPrev()}
			>
				<MdChevronLeft className="h-full w-full" />
			</button>

			<div className={`md:ml-6 lg:ml-14 ${className}`}>
				<Slider ref={slider} {...settings}>
					{updatedCategories?.map((subCat: any) => {
						const { categories: category } = subCat as any;
						const categoryData = category || subCat;

						const subCategoryTitle = getLocaleText(
							subCat?.title || {},
							router.locale
						);

						const isSelected = selectedCategoryIds?.includes(
							categoryData.id
						);

						return (
							<div
								key={subCat.id}
								className="transform cursor-pointer transition duration-300 ease-in-out hover:-translate-y-2"
								onClick={() =>
									onTileClick?.(categoryData?.id, categoryData)
								}
							>
								<div className="flex items-center">
									<div className="relative h-[30px] w-[30px] md:mr-[6px] lg:mr-[7px] lg:h-[60px] lg:w-[60px] lg:leading-[18px]">
										<ImageWithErrorHandler
											src={categoryData.image}
											alt="bean"
											fill={true}
											className="object-contain"
										/>
									</div>

									<p
										className={`md:pb-1 md:text-[10px] md:leading-3 lg:text-[15px] lg:font-semibold ${
											isSelected
												? 'border-b-4 border-secondary ' +
												  selectedTitleClassName
												: ''
										}`}
									>
										{subCategoryTitle}
									</p>
								</div>
							</div>
						);
					})}
				</Slider>
			</div>

			<button
				className={`absolute right-0 top-1/2 flex -translate-y-1/2 transform items-center justify-center !rounded-full border border-gray/80 !px-0 !py-0 !text-gray/80 md:!h-[22px] md:!w-[22px] lg:!h-[33px] lg:!w-[33px] lg:border-2`}
				onClick={() => (slider?.current as any)?.slickNext()}
			>
				<MdChevronRight className="h-full w-full" />
			</button>
		</div>
	);
};

export default TrendingCategorySlider;
