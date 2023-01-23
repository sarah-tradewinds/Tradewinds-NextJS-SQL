// Third party packages
import { useKeenSlider } from 'keen-slider/react'; // import from 'keen-slider/react.es' for to get an ES module
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { generateListByCount } from 'utils/common.util';
import { getLocaleText } from 'utils/get_locale_text';
import ImageWithErrorHandler from '../common/elements/image-with-error-handler';
import Button from '../common/form/button';

interface CountrySliderProps {
	countries: {
		id: string;
		name: any;
		slug: any;
		image: { url: string };
	}[];
	onCountryClick?: (country: any) => any;
	isLoading?: boolean;
	className?: string;
}

const CountrySlider: React.FC<CountrySliderProps> = (props) => {
	const { countries, onCountryClick, isLoading, className } = props;

	const [currentSlide, setCurrentSlide] = useState(0);
	const [loaded, setLoaded] = useState(false);

	const { t } = useTranslation('home');
	const { locale } = useRouter();

	const [ref, instanceRef] = useKeenSlider<HTMLDivElement>({
		slideChanged(slider) {
			setCurrentSlide(slider.track.details.rel);
		},
		created() {
			setLoaded(true);
		},
		loop: true,
		slides: {
			perView: 4,
			spacing: 8
		},
		breakpoints: {
			'(min-width: 744px)': {
				slides: { perView: 7 }
			},
			'(min-width: 1512px)': {
				slides: { perView: 7 }
			}
		}
	});

	const countriesSlider = isLoading
		? generateListByCount(8).map((id) => (
				<div key={id} className="keen-slider__slide">
					<Skeleton width="132px" height="80px" />
				</div>
		  ))
		: countries?.map((country) => (
				<Button
					key={country.id}
					onClick={() => {
						if (onCountryClick) {
							onCountryClick(country);
						}
					}}
					className="keen-slider__slide !relative flex !h-9 !min-w-[36.06px] !max-w-[36.06px] flex-col items-center md:!mx-5 md:!h-[30.59px] md:!min-w-[52.04px] md:!max-w-[52.04px] lg:!mx-[41px] lg:!h-[64px] lg:!min-w-[107px] lg:!max-w-[107px]"
				>
					{/* <div className="w-[107px]s relative h-[64px] w-full"> */}
					<div className="relative h-[24.44px] !min-w-[36.06px] !max-w-[36.06px] md:!h-full md:!min-w-[52.04px] md:!max-w-[52.04px] lg:!min-w-[107px] lg:!max-w-[107px]">
						<ImageWithErrorHandler
							src={country.image?.url}
							alt={country.name?.toString()}
							fill={true}
						/>
					</div>
					<p className="mt-[2.56px] text-[10px] font-semibold leading-3 md:hidden">
						{getLocaleText(country?.name || '', locale)}
					</p>
					{/* </div> */}
				</Button>
		  ));

	return (
		<div
			className={`relative h-full bg-gradient-to-r from-primary-main to-primary-main/80 dark:from-primary-eco dark:to-primary-eco/80 ${className}`}
		>
			<div className="flex items-center justify-center space-x-4 md:mt-[5.72px] lg:mt-[11px] lg:mb-3">
				<div className="w-40 border-2 border-[#FFFFFF] md:w-[236.86px] lg:w-[487px]"></div>
				<p className="whitespace-nowrap text-center text-[15px] font-semibold leading-[18px]  text-white lg:text-[25px] lg:leading-[30px]">
					{t('shop_by_country')}
				</p>
				<div className="w-40 border-2 border-[#FFFFFF] md:w-[236.86px] lg:w-[487px]"></div>
			</div>

			<div className="mt-[7px] md:hidden">
				<div ref={ref} className="scrollbar-hide flex overflow-x-auto">
					{countriesSlider}
				</div>
			</div>

			<div className="navigation-wrapper relative mt-[7px] hidden md:mt-0 md:block md:px-8">
				<div ref={ref} className="keen-slider">
					{countriesSlider}
				</div>

				{/* Navigation button */}
				{/* {!isLoading && loaded && instanceRef?.current && (
					<>
						<Button
							className={`absolute left-3 top-1/2 flex !h-[40px] !w-[40px] -translate-y-1/2 transform items-center justify-center !rounded-full border-2 border-white !p-0 !text-white`}
							onClick={(e: any) =>
								e.stopPropagation() || instanceRef.current?.prev()
							}
						>
							<MdChevronLeft className="h-[32px] w-[32px]" />
						</Button>

						<Button
							className={`absolute right-3 top-1/2 flex !h-[40px] !w-[40px] -translate-y-1/2 transform items-center justify-center !rounded-full border-2 border-white !p-0 !text-white`}
							onClick={(e: any) =>
								e.stopPropagation() || instanceRef.current?.next()
							}
							disabled={
								currentSlide ===
								instanceRef?.current?.track?.details?.slides?.length - 1
							}
						>
							<MdChevronRight className="h-[32px] w-[32px]" />
						</Button>
					</>
				)} */}
			</div>

			{/* Shading */}
			<div className="absolute left-0 top-0 h-full w-14 bg-gradient-to-r from-[#01243b]/80 md:w-32 lg:w-[180px] "></div>
			<div className="absolute right-0 top-0 h-full w-14 bg-gradient-to-l from-[#01243b]/80 md:w-32 lg:w-[180px] "></div>

			{/* <div className="absolute top-0 h-full w-[48px] bg-gradient-to-r from-primary-main to-primary-main/80 md:w-[80px]"></div>
			<div className="absolute top-0 right-0 h-full w-[48px] bg-gradient-to-l from-primary-main to-primary-main/80 md:w-[80px]"></div> */}
		</div>
	);
};

export default CountrySlider;
