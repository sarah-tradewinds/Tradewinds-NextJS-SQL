import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
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
			}
		},
		slides: { perView: 1 }
	});

	return (
		<div className="mx-4 h-full rounded-md bg-white p-4">
			<h3 className="mb-6 font-semibold text-primary-main lg:text-[25px] lg:leading-[30px]">
				{title}
			</h3>

			{/* Similar Products */}
			<div className="navigation-wrapper pl-8s group relative">
				<div ref={sliderRef} className={`keen-slider ${className}`}>
					{similarProducts.map((similarProduct, index) => (
						<div
							key={similarProduct.id}
							className={`keen-slider__slide cursor-pointer ${
								index === 3 ? 'xl:block hidden' : ''
							}`}
							onClick={() => push(`/product/${similarProduct.id}`)}
						>
							<div className="h-[274px] w-[298px]">
								<div className="relative h-[205px] w-[240px]">
									<Image
										src={
											similarProduct?.edges?.product_variants
												?.images?.[0] || '/loading-circle-50.png'
										}
										alt=""
										fill={true}
									/>
								</div>
								<p className="mt-1 flex justify-between space-x-8 text-[18px] font-bold text-primary-main">
									{getLocaleText(similarProduct.name || {}, locale)}
								</p>
								<p className="text-[15px] text-gray">
									{getLocaleText(
										similarProduct.description || {},
										locale
									)}
								</p>
							</div>
						</div>
					))}
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
