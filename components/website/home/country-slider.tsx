// Third party packages
import { useKeenSlider } from 'keen-slider/react'; // import from 'keen-slider/react.es' for to get an ES module
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Skeleton from 'react-loading-skeleton';
import { generateListByCount } from 'utils/common.util';
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

	const [ref, instanceRef] = useKeenSlider<HTMLDivElement>({
		slideChanged(slider) {
			setCurrentSlide(slider.track.details.rel);
		},
		created() {
			setLoaded(true);
		},
		loop: true,
		slides: {
			perView: 2,
			spacing: 8
		},
		breakpoints: {
			'(min-width: 640px)': {
				slides: { perView: 4, spacing: 8 }
			},
			'(min-width: 768px)': {
				slides: { perView: 6, spacing: 8 }
			},
			'(min-width: 1024px)': {
				slides: { perView: 8, spacing: 8 }
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
					className="keen-slider__slide"
				>
					<ImageWithErrorHandler
						src={country.image?.url}
						alt=""
						width="107px"
						height="64.2px"
					/>
				</Button>
		  ));

	return (
		<div
			className={`relative bg-gradient-to-r from-primary-main to-primary-main/80 pb-6 dark:from-primary-eco dark:to-primary-eco/80 ${className}`}
		>
			<div className="my-4 flex items-center justify-center space-x-4">
				<div className="w-40 rounded-l-lg border border-white md:w-56 lg:w-80"></div>
				<p className="whitespace-nowrap py-2 text-center text-white">
					{t('shop_by_country')}
				</p>
				<div className="w-40   border border-white md:w-56 lg:w-80"></div>
			</div>

			<div className="navigation-wrapper relative px-8">
				<div ref={ref} className="keen-slider">
					{countriesSlider}
				</div>

				{/* Navigation button */}
				{!isLoading && loaded && instanceRef?.current && (
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
				)}
			</div>

			{/* Shading */}
			{/* <div className="absolute top-0 h-full w-[48px] bg-gradient-to-r from-primary-main to-primary-main/80 md:w-[80px]"></div>
			<div className="absolute top-0 right-0 h-full w-[48px] bg-gradient-to-l from-primary-main to-primary-main/80 md:w-[80px]"></div> */}
		</div>
	);
};

export default CountrySlider;
