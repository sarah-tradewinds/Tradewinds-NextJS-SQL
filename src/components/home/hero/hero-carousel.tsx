import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import Button from 'components/common/form/button';
import { useKeenSlider } from 'keen-slider/react';
import { useRouter } from 'next/router';
import { HeroCarouselType } from 'types/home';
import {
	getAlignmentClassName,
	xAxisAlignment,
	yAxisAlignment
} from 'utils/common.util';
import { getLocaleText } from 'utils/get_locale_text';

type Props = {
	heroCarouselData: HeroCarouselType[];
};

const HeroCarousel = ({ heroCarouselData }: Props) => {
	const { locale } = useRouter();

	const animation = { duration: 5000, easing: (t: number) => t };

	const [ref] = useKeenSlider<HTMLDivElement>({
		loop: true,
		slides: {
			perView: 1
		}
	});

	return (
		<div
			key={heroCarouselData?.length}
			ref={ref}
			className="keen-slider"
		>
			{heroCarouselData.map((item, index) => (
				<div
					className="keen-slider__slide relative h-[248px] w-full sm:h-[278px] md:h-[277.8px] lg:h-[463px] xl:h-[536px] desktop:h-[623px]"
					key={item.id || index}
				>
					{/* Image */}

					<div className="relative h-full w-full">
						<ImageWithErrorHandler
							src={item.image}
							alt={item.title?.en || item.order?.toString()}
							fill={true}
							className="object-cover"
						/>
					</div>

					{item.title?.en && (
						<div
							className={`absolute z-[4] mb-10 w-fit space-y-2 p-4 sm:!w-[60%] lg:mb-12 xl:mb-16 desktop:mb-20 ${getAlignmentClassName(
								(item.horizonatal_alignment ||
									'left') as xAxisAlignment,
								(item.vertical_alignment || 'center') as yAxisAlignment
							)}`}
						>
							<p
								className="lg:text-[72px]s lg:leading-[88px]s text-[24px] font-semibold lg:!text-6xl"
								style={{ color: item?.color }}
							>
								{getLocaleText(item?.title || {}, locale)}
							</p>
							<p
								className="text-[16px] xl:text-[24px]"
								style={{ color: item?.color }}
							>
								{getLocaleText(item?.description || {}, locale)}
							</p>
							<div className="flex">
								<Button
									href={
										item.action?.slug ||
										'/product-search?main_category=e6bf3b93-05d5-4958-aaf9-bd6c0809fca2_Agriculture'
									}
									variant="buyer"
									style={{ backgroundColor: item?.btn_color }}
								>
									{getLocaleText(item?.btn_text || {}, locale)}
								</Button>
							</div>
						</div>
					)}
				</div>
			))}
		</div>
	);
};

export default HeroCarousel;
