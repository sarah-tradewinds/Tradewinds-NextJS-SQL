import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

// Third party packages
import {
	ChevronLeftIcon,
	ChevronRightIcon
} from '@heroicons/react/20/solid';
import { useKeenSlider } from 'keen-slider/react'; // import from 'keen-slider/react.es' for to get an ES module
import { useTranslation } from 'next-i18next';
import Skeleton from 'react-loading-skeleton';

// hooks
import useDeviceSize from 'hooks/use-device-size.hooks';

// lib
import { fetchHomeCountries } from 'lib/home.lib';

// utils
import { generateListByCount } from 'utils/common.util';
import { getLocaleText } from 'utils/get_locale_text';

// components
import ImageWithErrorHandler from '../common/elements/image-with-error-handler';

interface CountrySliderProps {
	countries?: {
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
	const { onCountryClick, className } = props;
	const [countries, setCountries] = useState<
		{
			id: string;
			name: any;
			slug: any;
			image: string;
		}[]
	>([]);
	const [pageNumber, setPageNumber] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [isRenderedFirstTime, setIsRenderedFirstTime] = useState(false);

	const [currentSlide, setCurrentSlide] = useState(0);
	const [loaded, setLoaded] = useState(false);
	const { deviceWidth } = useDeviceSize();

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

	useEffect(() => {
		setIsLoading(true);
		fetchHomeCountries(pageNumber)
			.then((data) => {
				setCountries((prevState) => {
					if (pageNumber === 1) {
						return data;
					}
					return [...prevState, ...data];
				});
				setIsRenderedFirstTime(true);
			})
			.finally(() => setIsLoading(false));
	}, [pageNumber]);

	useEffect(() => {
		if (isRenderedFirstTime && deviceWidth >= 768) {
			fetchHomeCountries(pageNumber, { dataPerPage: 300 }).then(
				setCountries
			);
		}
	}, [isRenderedFirstTime, deviceWidth]);

	const countriesSlider = isLoading
		? generateListByCount(8).map((id) => (
				<div key={id} className="keen-slider__slide">
					<Skeleton width="132px" height="80px" />
				</div>
		  ))
		: countries?.map((country, index) => (
				<div
					key={country.id}
					className="keen-slider__slide !relative flex !h-9 !min-w-[36.06px] !max-w-[36.06px] cursor-pointer flex-col items-center md:!mx-5 md:!h-[30.59px] md:!min-w-[52.04px] md:!max-w-[52.04px] lg:!mx-[41px] lg:!h-[64px] lg:!min-w-[107px] lg:!max-w-[107px]"
					onClick={() => {
						if (onCountryClick) {
							onCountryClick(country);
						}
					}}
				>
					<div className="relative !min-h-[24.44px] !min-w-[36.06px] !max-w-[36.06px] md:!h-full md:!min-w-[61.47px] md:!max-w-[61.47px] lg:!min-w-[107px] lg:!max-w-[107px]">
						<ImageWithErrorHandler
							key={country.image + country.id}
							src={country.image}
							alt={country.name?.en?.toString()}
							fill={true}
						/>
					</div>

					<p className="mt-[2.56px] text-[10px] font-semibold leading-3 text-white md:hidden">
						{getLocaleText(country?.name || '', locale)}
					</p>
					{/* </button> */}
				</div>
		  ));

	return (
		<div
			className={`relative h-full bg-gradient-to-r from-primary-main to-primary-main/80 dark:from-primary-eco dark:to-primary-eco/80 ${className}`}
		>
			<div className="flex items-center justify-center space-x-4 md:mt-[5.72px] lg:mt-[11px] lg:mb-3">
				<div className="w-40 border-2 border-[#FFFFFF] md:w-[236.86px] lg:w-[487px]"></div>
				<p className="whitespace-nowrap text-center text-[15px] font-semibold leading-[18px] text-white lg:text-[25px] lg:leading-[30px]">
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
					{countries?.map((country, index) => (
						<IntersectionObserverComponent
							key={country.id}
							isFirst={index === 0}
							isLast={index === countries.length - 1}
							fetchNextData={() =>
								setPageNumber((prevState) => prevState + 1)
							}
						>
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
						</IntersectionObserverComponent>
					))}
				</div>
			</div>

			{/* Medium and Desktop */}
			{deviceWidth >= 768 && (
				<div className="navigation-wrapper relative mt-[11.14px] hidden md:block md:px-8">
					<div
						ref={ref}
						key={isLoading?.toString()}
						className="keen-slider"
					>
						{countriesSlider}
					</div>

					{loaded && instanceRef.current && (
						<>
							<button
								onClick={(e: any) =>
									e.stopPropagation() || instanceRef.current?.prev()
								}
								disabled={currentSlide === 0}
								className="absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full bg-black p-2 text-white"
							>
								<ChevronLeftIcon className="w-5" />
							</button>

							<button
								onClick={(e: any) =>
									e.stopPropagation() || instanceRef?.current?.next?.()
								}
								disabled={
									currentSlide ===
									instanceRef?.current?.track?.details?.slides?.length -
										1
								}
								className="absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full bg-black p-2 text-white "
							>
								<ChevronRightIcon className="w-5" />
							</button>
						</>
					)}
				</div>
			)}

			{/* Shading */}
			<div className="absolute left-0 top-0 h-full w-14 bg-gradient-to-r from-[#01243b]/80 md:w-32 lg:w-[180px] "></div>
			<div className="absolute right-0 top-0 h-full w-14 bg-gradient-to-l from-[#01243b]/80 md:w-32 lg:w-[180px] "></div>
		</div>
	);
};

export default CountrySlider;

export const IntersectionObserverComponent: React.FC<{
	isFirst: boolean;
	isLast: boolean;
	className?: string;
	fetchPreviousData?: () => void;
	fetchNextData?: () => void;
	onClick?: () => void;
}> = (props) => {
	const {
		isFirst,
		isLast,
		children,
		className,
		fetchPreviousData,
		fetchNextData,
		onClick
	} = props;

	const ref = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (isFirst && entry.isIntersecting) {
					if (fetchPreviousData) fetchPreviousData?.();
					observer.unobserve(entry.target);
				}
				if (isLast && entry.isIntersecting) {
					console.log(
						'entry',
						'entry.isIntersecting',
						entry.isIntersecting
					);
					if (fetchNextData) fetchNextData?.();
					observer.unobserve(entry.target);
				}
			},
			{
				threshold: 0.5
			}
		);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => {
			observer.disconnect();
		};
	}, [isFirst, isLast]);

	return (
		<div ref={ref} className={className} onClick={onClick}>
			{children}
		</div>
	);
};
