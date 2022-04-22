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
				<div className="h-[75vh] w-full" key={index}>
					<Link href={item.link ? item.link : '/'}>
						<a>
							{/* <img
								src={item.img}
								alt={String(item.order)}
								className="w-full h-full object-cover"
							/> */}
							<div className="relative h-[75vh] w-full">
								<Image
									src={item.img}
									alt={String(item.order)}
									layout="fill"
								/>
							</div>
						</a>
					</Link>
				</div>
			))}
		</Slider>
	);
};

export default HeroCarousel;
