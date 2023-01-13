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
		<div className="gap-2s flex flex-col space-y-4 px-2 md:flex-row md:space-y-0 md:px-0">
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
						imageUrl={cardAData.image?.url}
						href="/why-sell-on-tradewinds"
					/>
				</div>
			))}

			<div className="md:ml-4 lg:ml-[34px]">
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
