import { useKeenSlider } from 'keen-slider/react';
import { useRouter } from 'next/router';
import { getLocaleText } from 'utils/get_locale_text';
import CardA from './card-a';
import CardB from './card-b';

const CardWrapper: React.FC<{
	cardAList: any[];
	cardBData: any;
}> = ({ cardAList, cardBData = {} }) => {
	const { locale } = useRouter();

	const [ref] = useKeenSlider<HTMLDivElement>({
		mode: 'free-snap',
		slides: {
			origin: 'center',
			perView: 3,
			spacing: 13
		}
	});

	const settings = {
		className: 'center',
		centerMode: true,
		infinite: true,
		centerPadding: '60px',
		slidesToShow: 3,
		speed: 500
	};

	return (
		<>
			{/* Medium and desktop */}
			<div className="hidden justify-center space-x-2 md:flex lg:space-x-6 desktop:!space-x-8">
				{cardAList.map((cardAData) => (
					<div key={cardAData.id}>
						<CardA
							title={getLocaleText(cardAData?.title || {}, locale)}
							subtitle={getLocaleText(
								cardAData?.description || {},
								locale
							)}
							imageUrl={cardAData.image}
							href="/why-sell-on-tradewinds"
						/>
					</div>
				))}

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
						buttonText={getLocaleText(cardBData.btn_text || {}, locale)}
						href={cardBData.slug?.en}
						alt={cardBData.title?.en}
					/>
			</div>

			{/* Card Slider only visible on mobile */}
			<div ref={ref} className="keen-slider md:!hidden">
				{cardAList.map((cardAData, index) => (
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
							href="/why-sell-on-tradewinds"
						/>
					</div>
				))}

				<div className="keen-slider__slide h-[153px] !min-w-[203px] !max-w-[203px] sm:!min-h-[203px] sm:!min-w-[245px]">
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
						buttonText={getLocaleText(cardBData.btn_text || {}, locale)}
						href={cardBData.slug?.en}
						alt={cardBData.title?.en}
					/>
				</div>
			</div>
		</>
	);
};

export default CardWrapper;
