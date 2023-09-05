import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import { useKeenSlider } from 'keen-slider/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { getDefaultProductAndProductVariants } from 'utils/common.util';
import { getLocaleText } from 'utils/get_locale_text';
import Button from '../common/form/button';

interface SimilarProductListProps {
	title: string;
	similarProducts: any[];
	className?: string;
}

const SimilarProductList: React.FC<SimilarProductListProps> = (
	props
) => {
	const { title, similarProducts, className } = props;

	const [currentSlide, setCurrentSlide] = useState(0);
	const [loaded, setLoaded] = useState(false);

	const { locale, push } = useRouter();

	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
		initial: 0,
		slideChanged(slider) {
			setCurrentSlide(slider.track.details.rel);
		},
		created() {
			setLoaded(true);
		},
		breakpoints: {
			'(min-width: 400px)': {
				slides: { perView: 2, spacing: 5 }
			},
			'(min-width: 1000px)': {
				slides: { perView: 4, spacing: 10 }
			},
			'(min-width: 1800px)': {
				slides: { perView: 5, spacing: 10 }
			},
			'(min-width: 2000px)': {
				slides: { perView: 6, spacing: 10 }
			}
		},
		slides: { perView: 1 }
	});

	return (
		<div className="h-full rounded-md bg-white px-4">
			<h3 className="md:text-leading-[14.63px] mb-6 pt-[9.32px] font-semibold text-gray md:text-[12px] lg:mb-[16px] lg:pt-[12.42px] lg:text-[15px] lg:leading-[18.29px] desktop:text-[25px] desktop:leading-[30px]">
				{title}
			</h3>

			<div className="md:ml-[41.34px] md:grid md:grid-cols-4 md:gap-x-[32px] lg:ml-[24px] xl:grid-cols-5">
				{similarProducts.map((similarProduct, index) => {
					const { defaultVariant } =
						getDefaultProductAndProductVariants(
							similarProduct?.edges?.product_variants || []
						);
					return (
						<div
							key={similarProduct?.id}
							onClick={() => push(`/product/${similarProduct?.id}`)}
							className="cursor-pointer"
						>
							<div className="md:pb-[21.25px]">
								<div className="relative h-[116.52px] w-[116.52px] lg:h-[155.29px] lg:w-[155.29px]">
									<ImageWithErrorHandler
										src={defaultVariant?.images?.[0] || ''}
										alt=""
										fill={true}
									/>
								</div>

								<div className="w-[116.52px] overflow-x-clip lg:w-[155.29px]">
									<p className="mt-1 flex  justify-between space-x-8 truncate text-[12px] font-bold leading-[14.63px] text-gray">
										{getLocaleText(defaultVariant?.name || {}, locale)}
									</p>
									<p className="truncates text-[10px] leading-[12.19px] text-gray">
										{getLocaleText(
											defaultVariant?.description || {},
											locale
										)}
										nice green color
									</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			{/* Similar Products */}
			<div className="navigation-wrapper pl-8s group relative hidden">
				<div ref={sliderRef} className={`keen-slider ${className}`}>
					{similarProducts.map((similarProduct, index) => {
						const { defaultVariant } =
							getDefaultProductAndProductVariants(
								similarProduct?.edges?.product_variants || []
							);
						return (
							<div
								key={similarProduct?.id}
								className={`keen-slider__slide cursor-pointer ${
									index === 3 ? 'hidden xl:block' : ''
								}`}
								onClick={() => push(`/product/${similarProduct?.id}`)}
							>
								{/* {console.log('similarProduct', similarProduct)} */}
								<div className="h-[274px] w-[298px]">
									<div className="relative h-[116.52px] w-[240px]">
										<ImageWithErrorHandler
											src={defaultVariant?.images?.[0] || ''}
											alt=""
											fill={true}
										/>
									</div>
									<p className="mt-1 flex justify-between space-x-8 truncate text-[18px] font-bold text-primary-main">
										{getLocaleText(defaultVariant?.name || {}, locale)}
									</p>
									<p className="truncate text-[15px] text-gray">
										{getLocaleText(
											defaultVariant?.description || {},
											locale
										)}
									</p>
								</div>
							</div>
						);
					})}
				</div>

				{/* Navigation button */}
				{loaded && instanceRef.current && (
					<div>
						<Button
							className={`absolute -left-0 top-1/2 flex !h-[40px] !w-[40px] -translate-y-1/2 transform items-center justify-center !rounded-full border-2 border-primary-main !p-0 !text-primary-main`}
							onClick={(e: any) =>
								e.stopPropagation() || instanceRef.current?.prev()
							}
						>
							<MdChevronLeft className="h-[32px] w-[32px]" />
						</Button>

						<Button
							className={`absolute right-0 top-1/2 flex !h-[40px] !w-[40px] -translate-y-1/2 transform items-center justify-center !rounded-full border-2 border-primary-main !p-0 !text-primary-main`}
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
					</div>
				)}
			</div>
		</div>
	);
}; // End of SimilarProductList

export default SimilarProductList;
