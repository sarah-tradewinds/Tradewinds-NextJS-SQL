import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import Button from 'components/common/form/button';
import { useKeenSlider } from 'keen-slider/react';
import Link from 'next/link';
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

	const settings = {
		dots: false,
		arrows: false,
		infinite: true,
		// autoplay: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	};

	const [ref] = useKeenSlider<HTMLDivElement>({
		loop: true
	});

	return (
		<div ref={ref} className="keen-slider">
			{heroCarouselData.map((item, index) => (
				<div
					className="keen-slider__slide relative h-[329px] w-full"
					key={item.id || index}
				>
					{/* Image */}
					<Link href={item.link || '/'}>
						<div className="relative h-full w-full">
							<ImageWithErrorHandler
								src={item.image}
								alt={item.title?.en || item.order?.toString()}
								fill={true}
							/>
						</div>
					</Link>

					{item.title?.en && (
						<div
							className={`absolute z-[4] hidden w-[90%] space-y-2 p-4 md:w-auto ${getAlignmentClassName(
								(item.horizonatal_alignment ||
									'left') as xAxisAlignment,
								(item.vertical_alignment || 'center') as yAxisAlignment
							)}`}
						>
							<p
								className="text-[24px] font-semibold lg:text-[72px] lg:leading-[88px]"
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
								<Button href={item.action?.slug} variant="buyer">
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
