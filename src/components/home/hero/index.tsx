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
		<section className="relative md:container">
			<div className="md:h-[343px]s relative h-[600px] w-full overflow-hidden lg:h-[880px]">
				<HeroCarousel heroCarouselData={hcd} />
				<div className="absolute bottom-0 z-[2] h-[300px] w-full bg-gradient-to-t from-bg-main to-transparent md:bottom-8 lg:bottom-14 lg:h-[396px]"></div>
			</div>
			{/* <div className="absolute bottom-0 z-[3] w-full md:bottom-16 lg:bottom-32 xl:bottom-16">
				<div className="container mx-auto">
					<CardWrapper cardAList={cardAList} cardBData={cardBData} />
				</div>
			</div> */}

			<div className="absolute bottom-0 z-[3] w-full md:bottom-16 lg:bottom-20">
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
