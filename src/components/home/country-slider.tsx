// Third party packages
import { useKeenSlider } from 'keen-slider/react'; // import from 'keen-slider/react.es' for to get an ES module
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { generateListByCount } from 'utils/common.util';
import { getLocaleText } from 'utils/get_locale_text';
import ImageWithErrorHandler from '../common/elements/image-with-error-handler';

interface CountrySliderProps {
	countries: {
		id: string;
		name: any;
		slug: any;
		image: string;
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
				<button
					key={country.id}
					onClick={() => {
						if (onCountryClick) {
							onCountryClick(country);
						}
					}}
					className="keen-slider__slide !relative flex !h-9 !min-w-[36.06px] !max-w-[36.06px] flex-col items-center md:!mx-5 md:!h-[30.59px] md:!min-w-[52.04px] md:!max-w-[52.04px] lg:!mx-[41px] lg:!h-[64px] lg:!min-w-[107px] lg:!max-w-[107px]"
				>
					<div className="relative !min-h-[24.44px] !min-w-[36.06px] !max-w-[36.06px] md:!h-full md:!min-w-[52.04px] md:!max-w-[52.04px] lg:!min-w-[107px] lg:!max-w-[107px]">
						<ImageWithErrorHandler
							key={country.image + country.id}
							src={country.image}
							alt={country.name?.toString()}
							fill={true}
						/>
					</div>

					<p className="mt-[2.56px] text-[10px] font-semibold leading-3 text-white md:hidden">
						{getLocaleText(country?.name || '', locale)}
					</p>
					{/* </div> */}
				</button>
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

			{/* For mobile only */}
			<div className="mt-[7px] md:hidden">
				<div
					ref={ref}
					className="scrollbar-hide flex space-x-8 overflow-x-auto"
				>
					{countries?.map((country) => (
						<button
							key={country.id}
							onClick={() => {
								if (onCountryClick) {
									onCountryClick(country);
								}
							}}
							className="flex flex-col items-center"
						>
							<div className="relative h-[24.44px] w-[36.06px]">
								<ImageWithErrorHandler
									key={country.image + country.id}
									src={country.image}
									alt={country.name?.toString()}
									fill={true}
								/>
							</div>

							<p className="mt-[2.56px] whitespace-nowrap text-[10px] font-semibold leading-3 text-white">
								{getLocaleText(country?.name || '', locale)}
							</p>
						</button>
					))}
				</div>
			</div>

			<div className="navigation-wrapper relative mt-[7px] hidden md:mt-0 md:block md:px-8">
				<div ref={ref} className="keen-slider">
					{countriesSlider}
				</div>
			</div>

			{/* Shading */}
			<div className="absolute left-0 top-0 h-full w-14 bg-gradient-to-r from-[#01243b]/80 md:w-32 lg:w-[180px] "></div>
			<div className="absolute right-0 top-0 h-full w-14 bg-gradient-to-l from-[#01243b]/80 md:w-32 lg:w-[180px] "></div>
		</div>
	);
};

export default CountrySlider;
