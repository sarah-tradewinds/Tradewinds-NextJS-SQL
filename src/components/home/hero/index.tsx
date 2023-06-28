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
		<section className="relative h-[482px] bg-error">
			{/* <div className="relative h-[329px] w-full overflow-hidden md:h-[600px] tablet:h-[540px] desktop:!h-[724px]"> */}
			{/* <HeroCarousel heroCarouselData={hcd} /> */}
			{/* <div className="bg-error/40s absolute bottom-0 z-[2] h-[140px] w-full bg-gradient-to-t from-bg-main to-transparent dark:from-bg-eco md:bottom-8 md:h-[300px] lg:!-bottom-32 tablet:bottom-10 tablet:h-[240px] desktop:bottom-14 desktop:!h-[396px]"></div>
			</div> */}

			{/* <div className="absolute -bottom-8 z-[3] w-full lg:!-bottom-32 tablet:bottom-16 desktop:bottom-20">
				<div>
					<CardWrapper cardAList={cardAList} cardBData={cardBData} />
				</div>
			</div> */}

			<div>
				<HeroCarousel heroCarouselData={hcd} />
			</div>
			<div className="bottom-s absolute">
				<CardWrapper cardAList={cardAList} cardBData={cardBData} />
			</div>
		</section>
	);
};

export default Index;
