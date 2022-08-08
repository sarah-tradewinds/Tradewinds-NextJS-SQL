// Third party packages
import create from 'zustand';

interface ProductCompareState {
	compareProducts: any[];
	addProductToCompareList: (product: any) => void;
	removeProductFromCompareList: (productId: string) => void;
	removeAllProductFromCompareList: () => void;
}

export const useProductCompareStore = create<ProductCompareState>(
	(set) => ({
		compareProducts: [],
		addProductToCompareList: (product: any) =>
			set(({ compareProducts }) => {
				// Removing Product if product is in compare list
				const isProductExist = compareProducts.find(
					(compareProduct) => compareProduct.id === product.id
				);

				if (isProductExist) {
					// Removing compare product
					return {
						compareProducts: compareProducts.filter(
							(compareProduct) => {
								if (compareProduct.id !== product.id) {
									product.isInCompareList = true;
									return compareProduct;
								}
							}
						)
					};
				}

				if (compareProducts.length < 4) {
					product.isInCompareList = true;
					return {
						compareProducts: [...compareProducts, product]
					};
				}

				return { compareProducts };
			}),
		removeProductFromCompareList: (productId: string) =>
			set(({ compareProducts }) => ({
				compareProducts: compareProducts.filter(
					(compareProduct) => compareProduct.id !== productId
				)
			})),
		removeAllProductFromCompareList: () =>
			set(() => ({
				compareProducts: []
			}))
	})
);
