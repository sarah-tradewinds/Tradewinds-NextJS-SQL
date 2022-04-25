import CardA from './card-a';
import CardB from './card-b';

const CardWrapper = () => {
	return (
		<div className="mx-auto flex w-[96%] flex-col gap-2 space-y-4 sm:flex-row md:space-y-0 lg:gap-5">
			<CardA
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
			/>
			<CardB />
		</div>
	);
};

export default CardWrapper;
