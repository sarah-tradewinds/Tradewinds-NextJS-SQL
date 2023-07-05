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

	// let slideToShow = 2;
	// let slidesToScroll = 3;
	// if (deviceWidth >= 1536) {
	// 	slideToShow = 4;
	// } else if (deviceWidth >= 1280) {
	// 	slideToShow = 5;
	// } else if (deviceWidth >= 1024) {
	// 	slideToShow = 2;
	// } else if (deviceWidth >= 768) {
	// 	slideToShow = 3;
	// } else if (deviceWidth >= 640) {
	// 	slideToShow = 3;
	// }

	let slidesToShow = 2;
	if (deviceWidth >= 1700) {
		slidesToShow = 3.4;
	} else if (deviceWidth >= 1512) {
		slidesToShow = 3;
	} else if (deviceWidth >= 1280) {
		slidesToShow = 2;
	} else if (deviceWidth >= 1024) {
		slidesToShow = 3;
	} else if (deviceWidth >= 950) {
		slidesToShow = 2.8;
	} else if (deviceWidth >= 900) {
		slidesToShow = 2.6;
	} else if (deviceWidth >= 830) {
		slidesToShow = 2.1;
	}

	const settings = {
		slidesToShow: slidesToShow,
		slidesToScroll: slidesToShow,
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
		<div className="relative w-full md:h-[80.85px] lg:h-[107.21px] xl:h-[156px] desktop:h-[159px]">
			<button
				className={`absolute top-1/2 -left-1 flex -translate-y-1/2 transform items-center justify-center !rounded-full border border-gray !px-0 !py-0 !text-gray tablet:!h-[22px] tablet:!w-[22px] desktop:left-0 desktop:!h-[33px] desktop:!w-[33px] desktop:border-2`}
				onClick={() => (slider?.current as any)?.slickPrev()}
			>
				<MdChevronLeft className="h-full w-full" />
			</button>

			<div className={`tablet:ml-6 desktop:ml-10 ${className}`}>
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
								className="transform cursor-pointer transition duration-300 ease-in-out hover:-translate-y-2 lg:mb-[26.3px] xl:mb-[39px]"
								onClick={() =>
									onTileClick?.(categoryData?.id, categoryData)
								}
							>
								<div className="flex items-center">
									<div className="relative min-h-[30px] min-w-[30px] lg:min-h-[40.46px] lg:min-w-[40.46px] xl:min-h-[60px] xl:min-w-[60px] tablet:mr-[6px] desktop:mr-[7px]">
										<ImageWithErrorHandler
											key={categoryData.image}
											src={categoryData.image}
											// src={'/tmp/category-tmp.svg'}
											alt="bean"
											fill={true}
											className="object-contain"
										/>
									</div>

									<p
										className={`flex items-center font-semibold text-gray md:h-[36px] lg:h-[36.28px] lg:leading-[12.33] lg:text-[10.11] xl:h-[54px] xl:!text-[15px] xl:!leading-[18.29px] tablet:pb-1 tablet:text-[10px] tablet:leading-3 ${
											isSelected
												? 'border-b-4 border-secondary ' +
												  selectedTitleClassName
												: ''
										}`}
									>
										{subCategoryTitle}
										{/* Electronic Components, Accessories &
										Telecommunication */}
									</p>
								</div>
							</div>
						);
					})}
				</Slider>
			</div>

			<button
				className={`absolute right-0 top-1/2 flex -translate-y-1/2 transform items-center justify-center !rounded-full border border-gray/80 !px-0 !py-0 !text-gray/80 2xl:right-0 tablet:!h-[22px] tablet:!w-[22px] desktop:!h-[33px] desktop:!w-[33px] desktop:border-2`}
				onClick={() => (slider?.current as any)?.slickNext()}
			>
				<MdChevronRight className="h-full w-full" />
			</button>
		</div>
	);
};

export default TrendingCategorySlider;
