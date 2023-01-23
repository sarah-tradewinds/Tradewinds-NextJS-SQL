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
		// <section className="relative h-[680px] w-full overflow-hidden md:h-[343px] lg:h-[880px] xl:h-[980px]">
		<section className="md:containers relative">
			<div className="relative h-[329px] w-full overflow-hidden md:h-[600px] lg:h-[880px]">
				<HeroCarousel heroCarouselData={hcd} />
				<div className="absolute bottom-0 z-[2] h-[140px] w-full bg-gradient-to-t from-bg-main to-transparent dark:from-bg-eco md:bottom-8 md:h-[300px] lg:bottom-14 lg:h-[396px]"></div>
			</div>
			{/* <div className="absolute bottom-0 z-[3] w-full md:bottom-16 lg:bottom-32 xl:bottom-16">
				<div className="container mx-auto">
					<CardWrapper cardAList={cardAList} cardBData={cardBData} />
				</div>
			</div> */}

			<div className="absolute -bottom-8 z-[3] w-full md:bottom-16 lg:bottom-20">
				<div className="md:container md:mx-auto">
					<div className="md:ml-4 md:mr-[18px] lg:ml-[19px] lg:mr-[23px]">
						<CardWrapper cardAList={cardAList} cardBData={cardBData} />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Index;
