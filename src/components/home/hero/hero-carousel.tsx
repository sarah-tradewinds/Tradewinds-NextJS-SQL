import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import Button from 'components/common/form/button';
import { useKeenSlider } from 'keen-slider/react';
import { useRouter } from 'next/router';
import Skeleton from 'react-loading-skeleton';
import { HeroCarouselType } from 'types/home';
import {
	getAlignmentClassName,
	xAxisAlignment,
	yAxisAlignment
} from 'utils/common.util';
import { getLocaleText } from 'utils/get_locale_text';

type Props = {
	heroCarouselData: HeroCarouselType[];
	isHeroCarouselLoading?: boolean;
};

const HeroCarousel = ({
	heroCarouselData,
	isHeroCarouselLoading
}: Props) => {
	const { locale } = useRouter();

	const [ref] = useKeenSlider<HTMLDivElement>(
		{
			loop: true,
			slides: {
				perView: 1
			}
		},
		[
			(slider) => {
				let timeout: ReturnType<typeof setTimeout>;
				let mouseOver = false;
				function clearNextTimeout() {
					clearTimeout(timeout);
				}
				function nextTimeout() {
					clearTimeout(timeout);
					if (mouseOver) return;
					timeout = setTimeout(() => {
						try {
							slider?.next?.();
						} catch (error) {}
					}, 2000);
				}
				slider?.on('created', () => {
					slider?.container.addEventListener('mouseover', () => {
						mouseOver = true;
						clearNextTimeout();
					});
					slider?.container.addEventListener('mouseout', () => {
						mouseOver = false;
						nextTimeout();
					});
					nextTimeout();
				});
				slider?.on('dragStarted', clearNextTimeout);
				slider?.on('animationEnded', nextTimeout);
				slider?.on('updated', nextTimeout);
			}
		]
	);

	return (
		<div>
			{isHeroCarouselLoading && (
				<Skeleton
					className="relative h-[184px] sm:h-[214px] lg:h-[380px] xl:h-[440px] 2xl:h-[500px]"
					baseColor="#b7b5b5"
					highlightColor="white"
				/>
			)}

			{!isHeroCarouselLoading && (
				<div
					key={heroCarouselData?.length}
					ref={ref}
					className="keen-slider"
				>
					{heroCarouselData.map((item, index) => {
						const title = getLocaleText(item?.title || {}, locale);

						return (
							<div
								className="keen-slider__slide relative h-[248px] w-full sm:h-[278px] md:h-[277.8px] lg:h-[463px] xl:h-[536px] desktop:h-[623px]"
								key={item.id || index}
							>
								{/* Image */}
								<div className="relative h-full w-full">
									<ImageWithErrorHandler
										key={item.image}
										src={item.image}
										alt={item.title?.en || item.order?.toString()}
										fill={true}
										className="object-cover md:object-fill"
									/>
								</div>

								{item.title?.en && (
									<div
										className={`absolute z-[4] mb-10 flex w-fit flex-col items-center space-y-2 p-4 sm:!max-w-[60%] lg:mb-12 xl:mb-16 desktop:mb-20 ${getAlignmentClassName(
											(item.horizonatal_alignment ||
												'left') as xAxisAlignment,
											(item.vertical_alignment ||
												'center') as yAxisAlignment
										)}`}
									>
										<p
											className="lg:text-[72px]s lg:leading-[88px]s text-[20px]  font-semibold leading-[23px] sm:text-[24px] sm:leading-[27px] lg:!text-6xl"
											style={{
												color: item?.color,
												whiteSpace:
													title?.length <= 24 ? 'nowrap' : 'normal'
											}}
										>
											{title}
										</p>
										<p
											className="text-[16px] xl:text-[24px]"
											style={{ color: item?.color }}
										>
											{getLocaleText(item?.description || {}, locale)}
										</p>

										<div className="flex justify-center">
											<Button
												href={
													item.btn_link ||
													'/product-search?main_category=e6bf3b93-05d5-4958-aaf9-bd6c0809fca2_Agriculture'
												}
												variant="buyer"
												style={{ backgroundColor: item?.btn_color }}
												className="!whitespace-nowrap"
											>
												{getLocaleText(item?.btn_text || {}, locale)}
											</Button>
										</div>
									</div>
								)}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default HeroCarousel;
