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
		<div className="mx-auto flex w-[96%] flex-col gap-2 space-y-4 sm:flex-row md:space-y-0 lg:gap-5">
			{cardAList.map((cardAData) => (
				<CardA
					key={cardAData.id}
					title={getLocaleText(cardAData?.title || {}, locale)}
					imageUrl={'https://' + cardAData.image?.url}
					subtitle={getLocaleText(cardAData?.description || {}, locale)}
					name=""
					href="/why-sell-on-tradewinds"
				/>
			))}

			<CardB
				title={getLocaleText(cardBData.title || {}, locale)}
				imageUrl={'https://' + cardBData?.image?.url}
				subtitle={getLocaleText(cardBData.description_1 || {}, locale)}
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
	);
};

export default CardWrapper;
