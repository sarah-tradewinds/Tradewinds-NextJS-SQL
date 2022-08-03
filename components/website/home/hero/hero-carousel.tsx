import Button from 'components/website/common/form/button';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Slider from 'react-slick';
import { HeroCarouselType } from 'types/home';
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
					className="relative h-[75vh] w-full"
					key={item.id || index}
				>
					<Link href={item.link ?? '/'}>
						<a>
							<div className="relative h-[75vh] w-full">
								<Image
									src={item.image?.url}
									alt={String(item.order)}
									layout="fill"
									objectFit="cover"
								/>
							</div>
						</a>
					</Link>

					{item.title?.en && (
						<div className="absolute left-4 top-16 z-[4] w-[90%] space-y-2 bg-black/60 p-4 text-white md:left-16 md:top-40 md:w-auto">
							<p className="text-[24px] font-semibold xl:text-[32px]">
								{getLocaleText(item?.title || {}, locale)}
							</p>
							<p className="text-[16px] xl:text-[24px]">
								{getLocaleText(item?.description || {}, locale)}
							</p>
							<div className="flex">
								<Button href={item.action?.slug} variant="buyer">
									{item.btn_text}
								</Button>
							</div>
						</div>
					)}

					<div className="absolute inset-0 z-[2] h-full w-full bg-gradient-to-t from-bg-main to-transparent"></div>
				</div>
			))}
		</Slider>
	);
};

export default HeroCarousel;
