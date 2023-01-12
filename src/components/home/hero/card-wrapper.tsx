import { useRouter } from 'next/router';
import { getLocaleText } from 'utils/get_locale_text';
import CardA from './card-a';
import CardB from './card-b';

const CardWrapper: React.FC<{
	cardAList: any[];
	cardBData: any;
}> = ({ cardAList, cardBData = {} }) => {
	const { locale } = useRouter();

	return (
		// <div className="mx-auto flex w-[96%] flex-col gap-2 space-y-4 sm:flex-row md:space-x-2 md:space-y-0 lg:gap-[25px] lg:space-x-4">
		<div className="gap-2s space-y-4s sm:flex-rows md:space-x-2s md:space-y-0s lg:gap-[25px]s lg:space-x-4s flex-cold flex">
			{cardAList.map((cardAData, index) => (
				<div
					key={cardAData.id}
					className={index === 0 ? 'tablet:mr-4 desktop:mr-[38px]' : ''}
				>
					<CardA
						title={getLocaleText(cardAData?.title || {}, locale)}
						name={getLocaleText(cardAData?.name || {}, locale)}
						subtitle={getLocaleText(
							cardAData?.description || {},
							locale
						)}
						imageUrl={cardAData.image?.url}
						href="/why-sell-on-tradewinds"
					/>
				</div>
			))}

			<div className="tablet:ml-4 desktop:ml-[34px]">
				<CardB
					title={getLocaleText(cardBData.title || {}, locale)}
					imageUrl={cardBData?.image?.url}
					subtitle={getLocaleText(
						cardBData.description_1 || {},
						locale
					)}
					description={getLocaleText(
						cardBData.description_2 || {},
						locale
					)}
					buttonText={cardBData.btn_text}
					href={cardBData.action?.slug}
					name=""
					alt={cardBData.title?.en}
				/>
			</div>
		</div>
	);
};

export default CardWrapper;
