import { useKeenSlider } from 'keen-slider/react';
import { useRouter } from 'next/router';
import { getLocaleText } from 'utils/get_locale_text';
import CardA from './card-a';
import CardB from './card-b';

import useDeviceSize from 'hooks/use-device-size.hooks';
import Skeleton from 'react-loading-skeleton';
import { useHomeStore } from 'store/home';

const CardWrapper: React.FC<{
	cardAList: any[];
	cardBData: any;
	isCardALoading?: boolean;
	isCardBLoading?: boolean;
}> = ({
	cardAList,
	cardBData = {},
	isCardALoading,
	isCardBLoading
}) => {
	const { locale } = useRouter();
	const { deviceWidth } = useDeviceSize();

	const { isEco } = useHomeStore(({ setIsEco, isEco }) => ({
		setIsEco,
		isEco
	}));

	const [ref] = useKeenSlider<HTMLDivElement>({
		mode: 'free-snap',
		slides: {
			origin: 'center',
			perView: 2,
			spacing: 13
		}
	});

	return (
		<>
			{/* Medium and desktop */}
			{deviceWidth >= 768 && (
				<div className="hidden justify-center space-x-2 md:flex lg:space-x-[11.21px] desktop:space-x-8">
					{cardAList.map((cardAData, index) => (
						<div key={cardAData.id}>
							<CardA
								title={getLocaleText(cardAData?.title || {}, locale)}
								subtitle={getLocaleText(
									cardAData?.description || {},
									locale
								)}
								imageUrl={cardAData.image}
								href={
									index == 0
										? isEco
											? '/eco/why-sell-on-tradewinds'
											: '/why-sell-on-tradewinds'
										: isEco
										? '/eco/why-sell-on-tradewinds'
										: '/eco'
								}
							/>
						</div>
					))}

					{cardBData?.id && (
						<CardB
							title={getLocaleText(cardBData.title || {}, locale)}
							imageUrl={cardBData?.image}
							subtitle={getLocaleText(
								cardBData.description || {},
								locale
							)}
							description={getLocaleText(
								cardBData.description2 || {},
								locale
							)}
							buttonText={getLocaleText(
								cardBData.btn_text || {},
								locale
							)}
							href={'/what-is-rfq' || cardBData.slug?.en}
							alt={cardBData.title?.en}
						/>
					)}
				</div>
			)}

			<div
				ref={ref}
				key={`${isCardALoading}_${isCardBLoading}`}
				className="keen-slider md:!hidden"
			>
				{isCardALoading && (
					<>
						<Skeleton className="keen-slider__slide h-[153px] !min-w-[203px] !max-w-[203px] sm:!min-h-[203px] sm:!min-w-[245px]" />
						<Skeleton className="keen-slider__slide h-[153px] !min-w-[203px] !max-w-[203px] sm:!min-h-[203px] sm:!min-w-[245px]" />
					</>
				)}

				{!isCardALoading &&
					cardAList.map((cardAData, index) => (
						<div
							key={cardAData.id}
							className="keen-slider__slide h-[153px] !min-w-[203px] !max-w-[203px] sm:!min-h-[203px] sm:!min-w-[245px]"
						>
							<CardA
								title={getLocaleText(cardAData?.title || {}, locale)}
								subtitle={getLocaleText(
									cardAData?.description || {},
									locale
								)}
								imageUrl={cardAData.image}
								href={
									index == 0
										? isEco
											? '/eco/why-sell-on-tradewinds'
											: '/why-sell-on-tradewinds'
										: isEco
										? '/eco/why-sell-on-tradewinds'
										: '/eco'
								}
							/>
						</div>
					))}

				<div className="keen-slider__slide h-[153px] !min-w-[203px] !max-w-[203px] sm:!min-h-[203px] sm:!min-w-[245px]">
					{isCardBLoading ? (
						<Skeleton className="h-[153px] w-[203px] overflow-hidden rounded-md sm:h-[203px] sm:w-[245px] lg:h-[244.24px] lg:w-[325.92px] xl:h-[305px] xl:w-[405.73px] desktop:h-[352px] desktop:w-[466px]" />
					) : (
						<CardB
							title={getLocaleText(cardBData.title || {}, locale)}
							imageUrl={cardBData?.image}
							subtitle={getLocaleText(
								cardBData.description || {},
								locale
							)}
							description={getLocaleText(
								cardBData.description2 || {},
								locale
							)}
							buttonText={getLocaleText(
								cardBData.btn_text || {},
								locale
							)}
							href={'/what-is-rfq' || cardBData.slug?.en}
							alt={cardBData.title?.en}
						/>
					)}
				</div>
			</div>
		</>
	);
};

export default CardWrapper;
