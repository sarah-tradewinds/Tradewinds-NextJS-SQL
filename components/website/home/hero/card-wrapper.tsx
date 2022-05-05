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
					title={cardAData.title.en}
					imageUrl={'/' + cardAData.image}
					subtitle={cardAData.description.en}
					name="Name Here"
					href="/why-sell-on-tradewinds"
				/>
			))}
			{/* <CardA
				title="Become a Vendor"
				imageUrl="/become-a-vendor.png"
				subtitle="Lorem ipsum dolor sit amet, consecamet Lorem ipsum dolor sit amet"
				name="Name Here"
				href="/why-sell-on-tradewinds"
			/>
			<CardA
				title="Why Buy?"
				imageUrl="/static/images/TWsell.png"
				subtitle="Lorem ipsum dolor sit amet, consecamet Lorem ipsum dolor sit amet"
				name="Name Here"
				href="/why-buy"
			/> */}
			<CardB
				title={cardBData.title?.en}
				imageUrl={cardBData.image || '/static/images/rfq-orange.png'}
				subtitle={cardBData.description1?.en}
				description={cardBData.description2?.en}
				buttonText={cardBData.action?.actionText}
				href={cardBData.action?.slug}
				name=""
				alt={cardBData.title?.en}
			/>
		</div>
	);
};

export default CardWrapper;
