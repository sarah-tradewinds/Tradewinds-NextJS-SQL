import CardA from './card-a';
import CardB from './card-b';

const CardWrapper: React.FC<{
	cardAList: any[];
	cardBData: any;
}> = ({ cardAList, cardBData = {} }) => {
	return (
		<div className="mx-auto flex w-[96%] flex-col gap-2 space-y-4 sm:flex-row md:space-y-0 lg:gap-5">
			{cardAList.map((cardAData) => (
				<CardA
					key={cardAData.id}
					title={cardAData?.title?.en}
					imageUrl={'https://' + cardAData.image?.url}
					subtitle={cardAData?.description?.en}
					name="Name Here"
					href="/why-sell-on-tradewinds"
				/>
			))}

			<CardB
				title={cardBData.title?.en}
				imageUrl={'https://' + cardBData?.image?.url}
				subtitle={cardBData.description_1?.en}
				description={cardBData.description_2?.en}
				buttonText={cardBData.btn_text}
				href={cardBData.action?.slug}
				name=""
				alt={cardBData.title?.en}
			/>
		</div>
	);
};

export default CardWrapper;
