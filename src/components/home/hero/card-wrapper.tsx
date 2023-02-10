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
		// loop: true,
		slides: {
			origin: 'center',
			perView: 2,
			spacing: 15
		}
	});

	return (
		<>
			<div className="hidden flex-col space-y-4 px-2 md:flex md:flex-row md:space-y-0 md:px-0">
				{cardAList.map((cardAData, index) => (
					<div
						key={cardAData.id}
						className={index === 0 ? 'md:mr-4 lg:mr-[38px]' : ''}
					>
						<CardA
							title={getLocaleText(cardAData?.title || {}, locale)}
							name={getLocaleText(cardAData?.name || {}, locale)}
							subtitle={getLocaleText(
								cardAData?.description || {},
								locale
							)}
							imageUrl={cardAData.image}
							href="/why-sell-on-tradewinds"
						/>
					</div>
				))}

				<div className="md:ml-4 lg:ml-[34px]">
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
						name=""
						alt={cardBData.title?.en}
					/>
				</div>
			</div>

			{/* Card Slider */}
			<div className="md:hidden">
				<div ref={ref} className="keen-slider">
					{cardAList.map((cardAData, index) => (
						<div
							key={cardAData.id}
							className="keen-slider__slide h-[153px] !min-w-[203px] !max-w-[203px]"
						>
							<CardA
								title={getLocaleText(cardAData?.title || {}, locale)}
								name={getLocaleText(cardAData?.name || {}, locale)}
								subtitle={getLocaleText(
									cardAData?.description || {},
									locale
								)}
								imageUrl={cardAData.image}
								href="/why-sell-on-tradewinds"
							/>
						</div>
					))}

					<div className="keen-slider__slide h-[153px] !min-w-[203px] !max-w-[203px]">
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
							href={cardBData.slug?.en}
							name=""
							alt={cardBData.title?.en}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default CardWrapper;
