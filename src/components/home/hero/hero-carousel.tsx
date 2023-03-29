import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import Button from 'components/common/form/button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Slider from 'react-slick';
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
		autoplay: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	};

	return (
		<Slider {...settings}>
			{heroCarouselData.map((item, index) => (
				<div
					className="relative h-[329px] w-full md:h-[343px] lg:h-[688px]"
					key={item.id || index}
				>
					<Link href={item.link ?? '/'}>
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
							className={`absolute z-[4] w-[90%] space-y-2 p-4 md:w-auto ${getAlignmentClassName(
								(item.horizonatal_alignment ||
									'left') as xAxisAlignment,
								(item.vertical_alignment || 'center') as yAxisAlignment
							)}`}
						>
							<p
								className="lg:leading-[ 88px] text-[24px] font-semibold lg:text-[72px]"
								style={{ color: item?.color }}
							>
								{getLocaleText(item?.title || {}, locale)}
							</p>
							<p
								className="xl:text-[24px] text-[16px]"
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
		</Slider>
	);
};

export default HeroCarousel;
