import { HeroCarouselType } from 'types/home';
import CardWrapper from './card-wrapper';
import HeroCarousel from './hero-carousel';
type Props = {
	hcd: HeroCarouselType[];
	cardAList: any[];
	cardBData: any;
};

const Index = ({ hcd, cardAList, cardBData }: Props) => {
	return (
		<section className="relative h-[680px] w-full overflow-hidden md:h-[780px] lg:h-[880px] xl:h-[980px]">
			<HeroCarousel heroCarouselData={hcd} />

			<div className="absolute bottom-0 z-[3] md:bottom-16 lg:bottom-32 xl:bottom-16">
				<CardWrapper cardAList={cardAList} cardBData={cardBData} />
			</div>
		</section>
	);
};

export default Index;
