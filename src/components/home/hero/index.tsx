import { useEffect } from 'react';
import useNoLiveBuyPopupStore from 'store/no-live-buy-popup-store';
import { HeroCarouselType } from 'types/home';
import CardWrapper from './card-wrapper';
import HeroCarousel from './hero-carousel';
type Props = {
	hcd: HeroCarouselType[];
	cardAList: any[];
	cardBData: any;
	isHeroCarouselLoading?: boolean;
	isCardALoading?: boolean;
	isCardBLoading?: boolean;
};

const Index = ({
	hcd,
	cardAList,
	cardBData,
	isHeroCarouselLoading,
	isCardALoading,
	isCardBLoading
}: Props) => {
	const { setIsNoLiveBuyPopupOpen } = useNoLiveBuyPopupStore();

	useEffect(() => {
		setIsNoLiveBuyPopupOpen(true);
	}, []);

	return (
		<section className="relative h-[348px] sm:h-[432px] lg:h-[648px] xl:h-[756px] desktop:h-[880px]">
			<HeroCarousel
				heroCarouselData={hcd}
				isHeroCarouselLoading={isHeroCarouselLoading}
			/>
			<div className="absolute bottom-0 w-full">
				<div className="lg:container desktop:w-[1478px]">
					<CardWrapper
						cardAList={cardAList}
						cardBData={cardBData}
						isCardALoading={isCardALoading}
						isCardBLoading={isCardBLoading}
					/>
				</div>
			</div>
		</section>
	);
};

export default Index;
