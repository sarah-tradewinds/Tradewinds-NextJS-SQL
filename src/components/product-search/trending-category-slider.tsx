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

	let slidesToScroll = 2;
	let slidesToShow = 2;
	if (deviceWidth >= 1536) {
		slidesToScroll = 3;
		slidesToShow = 3;
	} else if (deviceWidth >= 1280) {
		slidesToScroll = 3;
		slidesToShow = 3;
	} else if (deviceWidth >= 1024) {
		slidesToScroll = 2.4;
		slidesToShow = 2.4;
	} else if (deviceWidth >= 950) {
		slidesToScroll = 2.8;
		slidesToShow = 2.8;
	} else if (deviceWidth >= 900) {
		slidesToScroll = 2.6;
		slidesToShow = 2.6;
	} else if (deviceWidth >= 830) {
		slidesToScroll = 2.1;
		slidesToShow = 2.1;
	}

	const settings = {
		slidesToShow: slidesToShow,
		slidesToScroll: slidesToScroll,
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
				className={`absolute top-1/2 -left-1 flex -translate-y-1/2 transform items-center justify-center !rounded-full border border-gray !px-0 !py-0 !text-gray tablet:!h-[22px] tablet:!w-[22px] desktop:left-4 desktop:!h-[33px] desktop:!w-[33px] desktop:border-2`}
				onClick={() => (slider?.current as any)?.slickPrev()}
			>
				<MdChevronLeft className="h-full w-full" />
			</button>

			<div className={`tablet:ml-6 desktop:ml-14 ${className}`}>
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
									<div className="relative h-[30px] w-[30px] tablet:mr-[6px] desktop:mr-[7px] desktop:h-[60px] desktop:w-[60px] desktop:leading-[18px]">
										<ImageWithErrorHandler
											src={categoryData.image}
											alt="bean"
											fill={true}
											className="object-contain"
										/>
									</div>

									<p
										className={`tablet:pb-1 tablet:text-[10px] tablet:leading-3 desktop:text-[15px] desktop:font-semibold ${
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
				className={`absolute right-0 top-1/2 flex -translate-y-1/2 transform items-center justify-center !rounded-full border border-gray/80 !px-0 !py-0 !text-gray/80 2xl:right-0 tablet:!h-[22px] tablet:!w-[22px] desktop:!h-[33px] desktop:!w-[33px] desktop:border-2`}
				onClick={() => (slider?.current as any)?.slickNext()}
			>
				<MdChevronRight className="h-full w-full" />
			</button>
		</div>
	);
};

export default TrendingCategorySlider;
