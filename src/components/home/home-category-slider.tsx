import { useRouter } from 'next/router';
import { useRef } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Slider from 'react-slick';

// components
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import useDeviceSize from 'hooks/use-device-size.hooks';

import { getLocaleText } from 'utils/get_locale_text';

interface HomeCategorySliderProps {
	categories: any[];
	onTileClick?: (categoryId: string, data: any) => any;
}

const HomeCategorySlider: React.FC<HomeCategorySliderProps> = (
	props
) => {
	const { categories = [], onTileClick } = props;
	const { locale } = useRouter();
	const { deviceWidth } = useDeviceSize();
	const slider = useRef(null);

	let slidesToShow = 3;
	if (deviceWidth >= 1536) {
		slidesToShow = 4;
	} else if (deviceWidth >= 1024) {
		slidesToShow = 4;
	} else if (deviceWidth >= 980) {
		slidesToShow = 3.9;
	} else if (deviceWidth >= 960) {
		slidesToShow = 3.8;
	} else if (deviceWidth >= 930) {
		slidesToShow = 3.7;
	} else if (deviceWidth >= 900) {
		slidesToShow = 3.6;
	} else if (deviceWidth >= 890) {
		slidesToShow = 3.4;
	} else if (deviceWidth >= 860) {
		slidesToShow = 3.3;
	} else if (deviceWidth >= 830) {
		slidesToShow = 3.2;
	} else if (deviceWidth >= 800) {
		slidesToShow = 3.1;
	}

	const settings = {
		slidesToShow: slidesToShow,
		slidesToScroll: slidesToShow,
		speed: 500,
		rows: 2,
		arrows: false,
		infinite: false
	};

	return (
		<div className="relative w-full">
			<button
				onClick={() => (slider?.current as any)?.slickPrev()}
				className="absolute -left-[24px] top-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-[#DCDBDB] outline-none md:h-[13.6px] md:w-[13.6px]"
			>
				<MdChevronLeft className="w-full text-white" />
			</button>

			<Slider ref={slider} {...settings}>
				{categories?.map((categoryInfo) => {
					const { categories: category } = categoryInfo as any;
					const categoryData = category || categoryInfo;
					const subCategoryTitle = getLocaleText(
						categoryData?.title || {},
						locale
					);

					return (
						<div
							key={categoryData.id}
							className="mb-[7.1px] mt-[2px] pr-[8.84px] transition-all hover:-translate-y-[2px]"
						>
							<SubCategoryCard
								key={categoryData.id}
								title={subCategoryTitle}
								imageUrl={categoryData?.image}
								isEco={categoryData?.is_eco}
								onTileClick={() =>
									onTileClick?.(categoryData?.id, categoryData)
								}
							/>
						</div>
					);
				})}
			</Slider>

			<button
				className="absolute -right-[16px] top-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-[#DCDBDB] outline-none md:h-[13.6px] md:w-[13.6px]"
				onClick={() => (slider?.current as any)?.slickNext()}
			>
				<MdChevronRight className="w-full text-white lg:h-full" />
			</button>
		</div>
	);
}; // End of HomeCategorySlider

export default HomeCategorySlider;

interface SubCategoryCardProps {
	title: string;
	imageUrl: string;
	backgroundColor?: string;
	buttonBackgroundColor?: string;
	isEco?: boolean;
	onTileClick?: () => void;
}

const SubCategoryCard: React.FC<SubCategoryCardProps> = (props) => {
	const { title, imageUrl, backgroundColor, isEco, onTileClick } =
		props;

	return (
		<div
			className="relative flex cursor-pointer flex-col justify-between border-[1.36px] border-[#C4C4C4] md:h-[86.43px] md:w-[162.48px] xl:h-[107.93px] xl:w-[202.91px] desktop:h-[127.13px] desktop:w-[239px]"
			style={{ backgroundColor }}
			onClick={onTileClick}
		>
			<h4
				// onClick={onTileClick}
				className={`mt-[9.74px] ml-[6.12px] w-[76%] font-semibold text-gray lg:w-[78%] lg:text-[13px] ${
					title?.length >= 20 ? 'text-[12px]' : 'text-[14px]'
				}`}
			>
				{title}
			</h4>

			{/* Icons */}
			<div className="flex gap-x-2 md:ml-[6.12px] md:mb-[3.18px]">
				<div className="relative md:h-[14.31px] md:w-[14.96px] xl:h-[18.68px] xl:w-[17.81px] desktop:h-[22px] desktop:w-[21.08px]">
					<ImageWithErrorHandler
						src="/static/images/TWSafety.png"
						alt="Logo"
						fill={true}
					/>
				</div>
				{!isEco && (
					<div className="relative md:h-[14.31px] md:w-[14.96px] xl:h-[18.68px] xl:w-[17.81px] desktop:h-[22px] desktop:w-[21.08px]">
						<ImageWithErrorHandler
							src="/static/images/TWEco.png"
							alt="Logo"
							fill={true}
						/>
					</div>
				)}
			</div>

			{/* Sub category Image */}
			<div className="absolute bottom-[1px] right-0">
				<div className="relative h-[80.08px] w-[80.08px] overflow-hidden xl:h-[100px] xl:w-[100px] desktop:h-[120px] desktop:w-[120px]">
					<ImageWithErrorHandler
						src={imageUrl}
						alt={title}
						width={120}
						height={120}
					/>
				</div>
			</div>
		</div>
	);
}; // End of SubCategoryCard
