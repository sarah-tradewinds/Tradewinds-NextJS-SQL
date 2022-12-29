interface GetDisplayBulkPrice {
	product_price: number;
	is_bulk_pricing: boolean;
	bulk_pricing?: { price: number }[];
}

export const getDisplayBulkPrice = ({
	product_price,
	is_bulk_pricing,
	bulk_pricing
}: GetDisplayBulkPrice): string => {
	let displayPrice = `$${product_price}`;
	if (is_bulk_pricing && bulk_pricing && bulk_pricing?.length > 0) {
		const bulkPricingFirst = bulk_pricing[0].price;
		const bulkPricingLast =
			bulk_pricing[bulk_pricing?.length - 1].price;

		let minPrice = bulkPricingFirst;
		let maxPrice = bulkPricingLast;
		if (bulkPricingFirst > bulkPricingLast) {
			maxPrice = bulkPricingFirst;
			minPrice = bulkPricingLast;
		}
		displayPrice = `$${minPrice}-$${maxPrice}`;
	}
	return displayPrice;
};
