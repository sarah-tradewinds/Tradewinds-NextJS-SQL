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
	console.log(prices);

	if (bulkPrices && bulkPrices.length > 0 && quantity) {
		return getProductPriceBuyQuantityRange(quantity, bulkPrices);
	} else if (salePrice && salePrice > 0) {
		return salePrice;
	} else {
		return price || 0;
	}
}; // End of getProductPrice function

const getProductPriceBuyQuantityRange = (
	quantity: number,
	bulkPrices: BulkPrice[]
): number => {
	let filteredPrice = 0;

	for (const bulkPrice of bulkPrices) {
		const { range, price } = bulkPrice;

		const [startQuantity, endQuantity] = range?.split('-') || [];

		if (quantity >= +startQuantity && quantity <= +endQuantity) {
			filteredPrice = price;
			break;
		}
	}

	if (!filteredPrice) {
		const firstRange = bulkPrices[0];
		const [startQuantity, endQuantity] =
			firstRange?.range?.split('-') || [];

		if (quantity <= +startQuantity && quantity >= +endQuantity) {
			filteredPrice = firstRange?.price;
		}
	}

	if (!filteredPrice) {
		const lastRange = bulkPrices[bulkPrices.length - 1];
		filteredPrice = lastRange?.price;
	}

	return filteredPrice || 0;
}; // End of getProductPriceBuyQuantityRange
