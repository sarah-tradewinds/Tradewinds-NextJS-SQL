import Button from 'components/website/common/form/button';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import { HeroCarouselType } from 'types/home';

type Props = {
	heroCarouselData: HeroCarouselType[];
};

const HeroCarousel = ({ heroCarouselData }: Props) => {
	let settings = {
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
									src={item.image || '/Ads-Section.png'}
									alt={String(item.order)}
									layout="fill"
								/>
							</div>
						</a>
					</Link>

					{/* TODO: Tmp */}
					<div className="absolute top-16 left-4 w-[90%] space-y-2 bg-black/60 p-4 text-white md:left-16 md:top-40 md:w-auto">
						<p className="text-[24px] font-semibold xl:text-[32px]">
							{item.title?.en}
						</p>
						<p className="text-[16px] xl:text-[24px]">
							{item.description?.en}
						</p>
						<div className="flex">
							<Button href={item.action?.slug} variant="buyer">
								{item.action?.actionText}
							</Button>
						</div>
					</div>
				</div>
			))}
		</Slider>
	);
};

export default HeroCarousel;
