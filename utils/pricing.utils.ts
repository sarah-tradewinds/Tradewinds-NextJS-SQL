interface BulkPrice {
	range: string;
	price: number;
}

export const getProductPrice = (prices: {
	bulkPrices?: BulkPrice[];
	salePrice?: number;
	price?: number;
	quantity?: number;
}): number => {
	const { bulkPrices, quantity, salePrice, price } = prices;

	if (bulkPrices && quantity) {
		return getProductPriceBuyQuantityRange(quantity, bulkPrices); //
	} else if (salePrice) {
		return salePrice;
	} else {
		return price || 0;
	}
};

const getProductPriceBuyQuantityRange = (
	quantity: number,
	bulkPrices: BulkPrice[]
): number => {
	let filteredPrice = 0;
	for (const bulkPrice of bulkPrices) {
		const { range, price } = bulkPrice;

		const [startQuantity, endQuantity] = range?.split('-');

		if (quantity >= +startQuantity && quantity <= +endQuantity) {
			filteredPrice = price;
			break;
		}
	}

	return filteredPrice;
}; // End of getProductPriceBuyQuantityRange
