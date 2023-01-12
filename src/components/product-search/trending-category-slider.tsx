import useDeviceSize from 'hooks/use-device-size.hooks';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Slider from 'react-slick';
import { getLocaleText } from 'utils/get_locale_text';
import ImageWithErrorHandler from '../common/elements/image-with-error-handler';
import Button from '../common/form/button';

const TrendingCategorySlider: React.FC<{
	categories: any[];
	selectedCategoryIds?: string[];
	onTileClick?: (categoryId: string, data: any) => any;
	className?: string;
}> = (props) => {
	const slider = useRef(null);
	const router = useRouter();

	const { deviceSize } = useDeviceSize();
	console.log('deviceSize =', deviceSize);

	const {
		categories = [],
		onTileClick,
		selectedCategoryIds,
		className
	} = props;

	let slideToShow = 3;
	if (deviceSize === 'md') {
		slideToShow = 2;
	}

	const settings = {
		slidesToShow: slideToShow,
		slidesToScroll: 3,
		speed: 500,
		rows: 2,
		arrows: false,
		infinite: false
	};

	return (
		<div className="relative w-full">
			<Button
				className={`-left-3s absolute left-0 top-1/2 flex !h-8 !w-10 -translate-y-1/2 transform items-center justify-center !rounded-full border-2 border-gray !p-0 !text-gray lg:!h-[33px] lg:!w-[33px]`}
				onClick={() => (slider?.current as any)?.slickPrev()}
			>
				<MdChevronLeft className="h-full w-full" />
			</Button>

			<div
				// className={`mx-6s md:ml-10s lg:mx-[48px]s bg-error ${className}`}
				className={`lg:ml-14 ${className}`}
			>
				<Slider ref={slider} {...settings}>
					{categories?.map((subCat: any) => {
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
								// className="!mt-[24px] !w-[95%] transform cursor-pointer transition duration-300 ease-in-out hover:-translate-y-2"
								className="transform cursor-pointer transition duration-300 ease-in-out hover:-translate-y-2"
								onClick={() =>
									onTileClick?.(categoryData?.id, categoryData)
								}
							>
								<div className="flex items-center space-x-[7px]">
									<div className="relative h-[29px] w-[29px] lg:h-[60px] lg:w-[60px] lg:leading-[18px]">
										<ImageWithErrorHandler
											src={categoryData.image?.url}
											alt="bean"
											fill={true}
										/>
									</div>

									<p
										className={`w-[186px] text-[8px] lg:text-[15px] lg:font-semibold ${
											isSelected ? 'border-b-4 border-secondary' : ''
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

			<Button
				className={`absolute right-0 top-1/2 flex !h-8 !w-10 -translate-y-1/2 transform items-center justify-center !rounded-full border-2 border-gray/80 !p-0 !text-gray/80 lg:!h-[33px] lg:!w-[33px]`}
				onClick={() => (slider?.current as any)?.slickNext()}
			>
				<MdChevronRight className="h-full w-full" />
			</Button>
		</div>
	);
};

export default TrendingCategorySlider;
