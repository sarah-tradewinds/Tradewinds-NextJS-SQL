import { useRef } from 'react';
import { useRouter } from 'next/router';
import Slider from "react-slick";
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

// components
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import useDeviceSize from 'hooks/use-device-size.hooks';



import { getLocaleText } from 'utils/get_locale_text';

interface HomeCategorySliderProps {
	categories: any[];
}

const HomeCategorySlider: React.FC<HomeCategorySliderProps> = (
	props
) => {
	const { categories = [] } = props;
	const { locale } = useRouter();
	const { deviceWidth } = useDeviceSize();
	const slider = useRef(null);

	let slidesToShow = 3;
	if (deviceWidth >= 1536) {
		slidesToShow = 4;
	} else if (deviceWidth >= 1024) {
		slidesToShow = 4;
	}  else if (deviceWidth >= 980) {
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
	}    else if (deviceWidth >= 830) {
		slidesToShow = 3.2;
	}  else if (deviceWidth >= 800) {
		slidesToShow = 3.1;
	}

	const settings = {
    slidesToShow: slidesToShow,
		slidesToScroll: slidesToShow,
		speed: 500,
		rows: 2,
		arrows: false,
		infinite: false,
	};

	return (
		<div className='relative w-full'>
      <button
				onClick={() => (slider?.current as any)?.slickPrev()}
				className='outline-none absolute -left-[24px] top-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-[#DCDBDB] md:w-[13.6px] md:h-[13.6px]' 
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
              <div key={categoryData.id} className="mb-[7.1px] pr-[8.84px]">
                <SubCategoryCard
                  key={categoryData.id}
                  title={subCategoryTitle}
                  imageUrl={categoryData?.image}
                  isEco={categoryData?.is_eco}
                />
              </div>
            );
          })}
      </Slider>


      <button
				className='outline-none absolute -right-[16px] top-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-[#DCDBDB] md:w-[13.6px] md:h-[13.6px]'
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
	onPressed?: () => void;
}

const SubCategoryCard: React.FC<SubCategoryCardProps> = (props) => {
	const {
		title,
		imageUrl,
		backgroundColor,
		buttonBackgroundColor,
    isEco,
		onPressed
	} = props;

	return (
		<div className="relative border-[1.36px] border-[#C4C4C4] md:h-[86.43px] md:w-[162.48px] xl:w-[202.91px] xl:h-[107.93px] desktop:w-[239px] desktop:h-[127.13px] flex flex-col justify-between">
			<h4 className="mt-[9.74px] ml-[6.12px] text-[14px] lg:text-[15px] font-semibold text-primary-main">
				{title}
			</h4>

			{/* Icons */}
			<div className="md:ml-[6.12px] md:mb-[3.18px] flex gap-x-2">
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
			<div className="absolute bottom-0 right-0">
				<div className="relative h-[80.08px] w-[80.08px] xl:w-[100px] xl:h-[100px] destop:w-[120px] destop:h-[120px]">
					<ImageWithErrorHandler
						src={imageUrl}
						alt={title}
						fill={true}
					/>
				</div>
			</div>
		</div>
	);
}; // End of SubCategoryCard
