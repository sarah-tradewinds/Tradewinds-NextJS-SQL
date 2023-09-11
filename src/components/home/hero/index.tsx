import { useEffect } from 'react';
import useNoLiveBuyPopupStore from 'store/no-live-buy-popup-store';
import { HeroCarouselType } from 'types/home';
import CardWrapper from './card-wrapper';
import HeroCarousel from './hero-carousel';
type Props = {
	hcd: HeroCarouselType[];
	cardAList: any[];
	cardBData: any;
};

const Index = ({ hcd, cardAList, cardBData }: Props) => {
	const { setIsNoLiveBuyPopupOpen } = useNoLiveBuyPopupStore();

	useEffect(() => {
		setIsNoLiveBuyPopupOpen(true);
	}, []);

	return (
		<section className="relative h-[348px] sm:h-[432px] lg:h-[648px] xl:h-[756px] desktop:h-[880px]">
			<HeroCarousel heroCarouselData={hcd} />
			<div className="absolute bottom-0 w-full">
				<div className="lg:container desktop:w-[1478px]">
					<CardWrapper cardAList={cardAList} cardBData={cardBData} />
				</div>
			</div>
		</section>
	);
};

export default Index;
