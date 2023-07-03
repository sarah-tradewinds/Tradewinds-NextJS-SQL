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
		<section className="relative h-[348px] sm:h-[432px] lg:h-[648px] xl:h-[756px] desktop:h-[880px]">
      <HeroCarousel heroCarouselData={hcd} />
			<div className="absolute bottom-0 w-full bg-gradient-to-b from-[#DEDFE0]/60 to-[#F5F5F5] dark:from-bg-eco">
				<CardWrapper cardAList={cardAList} cardBData={cardBData} />
			</div>
		</section>
	);
};

export default Index;
