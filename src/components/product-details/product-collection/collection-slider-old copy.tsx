// Third party packages
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import Button from 'components/common/form/button';
import { useKeenSlider } from 'keen-slider/react'; // import from 'keen-slider/react.es' for to get an ES module
import { useRouter } from 'next/router';
import { useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { getLocaleText } from 'utils/get_locale_text';

interface CollectionSliderOldProps {
	dataList: any[];
	onCountryClick?: (country: any) => any;
	isLoading?: boolean;
	className?: string;
}

const CollectionSliderOld: React.FC<CollectionSliderOldProps> = (
	props
) => {
	const { dataList, onCountryClick, isLoading, className } = props;

	const [currentSlide, setCurrentSlide] = useState(0);
	const [loaded, setLoaded] = useState(false);

	const router = useRouter();

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
				slides: { perView: 1, spacing: 8 }
				// slides: { perView: 8, spacing: 8 }
			}
		}
	});

	const productList =
		dataList?.map((product: any) => {
			const imageUrl = product?.images[0]
				? product?.images[0]?.url
				: '';
			return (
				<div
					key={product?.id}
					className="relative h-[134px] w-[232px] border-2 border-primary-main"
				>
					<div className="flex h-full w-full flex-col justify-between p-2 ">
						<p>
							{getLocaleText(
								product?.product_name || {},
								router.locale
							)}{' '}
						</p>

						{/* Icon or Image */}
						<div className="flex space-x-2">
							<div className="relative h-5 w-5">
								<ImageWithErrorHandler
									src="/static/images/TWSafety.png"
									alt="Logo"
									fill={true}
								/>
							</div>
							<div className="relative h-5 w-5">
								<ImageWithErrorHandler
									src="/static/images/TWEco.png"
									alt="Logo"
									fill={true}
								/>
							</div>
						</div>
					</div>

					<div className="absolute bottom-0 right-0 ">
						<div className="relative h-[100px] w-[100px]">
							<ImageWithErrorHandler
								key={imageUrl}
								src={imageUrl}
								alt=""
								fill={true}
							/>
						</div>
					</div>
				</div>
			);
		}) || [];

	const sliderList = generateRows({
		rowCount: 2,
		dataPerRows: 4,
		gridCols: productList?.length < 8 ? 2 : undefined,
		elementList: productList || []
	});

	const sliderListLength = sliderList?.length || 0;

	return (
		<div className="mt-8 w-full">
			<div className="navigation-wrapper relative lg:px-12">
				<p className="py-4 text-[18px] leading-[22px]">Name</p>
				<div ref={ref} className="keen-slider">
					{sliderList}
				</div>

				{/* Navigation button */}
				{!isLoading && loaded && instanceRef?.current && (
					<>
						<Button
							className={`absolute left-0 top-1/2 flex !h-[40px] !w-[40px] -translate-y-1/2 transform items-center justify-center !rounded-full border-2 border-accent-primary-main !p-0 !text-accent-primary-main`}
							onClick={(e: any) =>
								e.stopPropagation() || instanceRef.current?.prev()
							}
						>
							<MdChevronLeft className="h-[32px] w-[32px]" />
						</Button>

						<Button
							className={`absolute right-0 top-1/2 flex !h-[40px] !w-[40px] -translate-y-1/2 transform items-center justify-center !rounded-full border-2 border-accent-primary-main !p-0 !text-accent-primary-main`}
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
		</div>
	);

	// return sliderListLength <= 1 ? (
	// 	<div className="flex h-full items-center lg:ml-12">
	// 		<div className="grid grid-cols-4">
	// 			<div>{sliderList}</div>
	// 		</div>
	// 	</div>
	// ) : (
	// 	<div className="w-full">
	// 		<div className="navigation-wrapper relative lg:px-12">
	// 			<div ref={ref} className="keen-slider">
	// 				{sliderList}
	// 			</div>

	// 			{/* Navigation button */}
	// 			{!isLoading && loaded && instanceRef?.current && (
	// 				<>
	// 					<Button
	// 						className={`absolute left-0 top-1/2 flex !h-[40px] !w-[40px] -translate-y-1/2 transform items-center justify-center !rounded-full border-2 border-accent-primary-main !p-0 !text-accent-primary-main`}
	// 						onClick={(e: any) =>
	// 							e.stopPropagation() || instanceRef.current?.prev()
	// 						}
	// 					>
	// 						<MdChevronLeft className="h-[32px] w-[32px]" />
	// 					</Button>

	// 					<Button
	// 						className={`absolute right-0 top-1/2 flex !h-[40px] !w-[40px] -translate-y-1/2 transform items-center justify-center !rounded-full border-2 border-accent-primary-main !p-0 !text-accent-primary-main`}
	// 						onClick={(e: any) =>
	// 							e.stopPropagation() || instanceRef.current?.next()
	// 						}
	// 						disabled={
	// 							currentSlide ===
	// 							instanceRef?.current?.track?.details?.slides?.length - 1
	// 						}
	// 					>
	// 						<MdChevronRight className="h-[32px] w-[32px]" />
	// 					</Button>
	// 				</>
	// 			)}
	// 		</div>
	// 	</div>
	// );
};

export default CollectionSliderOld;

const generateRows = (payload: {
	rowCount: number;
	dataPerRows: number;
	gridCols?: number;
	elementList: any[];
}) => {
	const { elementList = [], gridCols, rowCount, dataPerRows } = payload;

	const splitCount = rowCount * dataPerRows;
	const elementListLength = elementList?.length || 0;

	const masterList = [];
	let currentList = [];
	for (let i = 0; i <= elementListLength - 1; i++) {
		if (currentList.length >= splitCount) {
			masterList.push(
				<div className="keen-slider__slide">
					<div className={`grid-cols-${dataPerRows} grid gap-4`}>
						{currentList}
					</div>
				</div>
			);
			currentList = [];
		}

		currentList.push(elementList[i]);
	}

	if (currentList?.length < splitCount) {
		masterList.push(
			<div className="keen-slider__slide">
				<div
					className={`grid-cols-${gridCols || dataPerRows} grid gap-4`}
				>
					{currentList}
				</div>
			</div>
		);
		currentList = [];
	}

	return masterList;
}; // End of generateRows
