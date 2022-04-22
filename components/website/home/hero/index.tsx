import { HeroCarouselType } from 'types/home';
import CardWrapper from './card-wrapper';
import HeroCarousel from './hero-carousel';
type Props = {
	hcd: HeroCarouselType[];
};

const Index = ({ hcd }: Props) => {
	return (
		// <section className="relative h-full w-full overflow-hidden sm:h-screen md:h-3/4 lg:h-[880px] xl:h-[980px]">
		<section className="relative h-[680px] w-full overflow-hidden md:h-[780px] lg:h-[880px] xl:h-[980px]">
			<HeroCarousel heroCarouselData={hcd} />

			{/* <div className="relative z-[3] -mt-[70%] sm:absolute sm:bottom-10 sm:mt-0"> */}
			<div className="absolute bottom-0 z-[3] md:bottom-16 lg:bottom-32 xl:bottom-16">
				<CardWrapper />
			</div>

			<div className="absolute inset-0 z-[2] h-full w-full bg-gradient-to-t from-bg-main to-transparent"></div>
		</section>
	);
};

export default Index;
