import { useKeenSlider } from 'keen-slider/react';
import { useRouter } from 'next/router';
import Slider from 'react-slick';
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
			<div className="hidden justify-center space-x-4 lg:space-x-6 tablet:flex desktop:!space-x-8">
				{/* <CardA
					title={'Become a Vendor'}
					name={''}
					subtitle={
						'Grow your business. Reach a global audience. Connect with motivated buyers and unlock new opportunities'
					}
					imageUrl={
						'https://wmarketplacestgact.blob.core.windows.net/tradewinds-static/cardA/1681206214-Trade%20winds%20HP%201.26%203%20%282%29.png'
					}
					href="/why-sell-on-tradewinds"
				/>

				<CardA
					title={' Tradewvinds ECO '}
					name={''}
					subtitle={
						'Discover sustainable commerce. Explore environmentally focused products, support ethical brands, and make a positive impact on the planet.'
					}
					imageUrl={
						'https://wmarketplacestgact.blob.core.windows.net/tradewinds-static/cardA/1681206158-Trade%20winds%20HP%201.26%201%20%282%29.png'
					}
					href="/why-sell-on-tradewinds"
				/> */}

				{cardAList.map((cardAData, index) => (
					<div key={cardAData.id}>
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

				<div className="tablet:ml-4s lg:ml-[34px]s">
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

			{/* Card Slider only visible on mobile */}
				<div ref={ref} className="keen-slider tablet:hidden">
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
		</>
	);
};

export default CardWrapper;
