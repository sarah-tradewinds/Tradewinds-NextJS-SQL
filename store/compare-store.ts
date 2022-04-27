import create from 'zustand';

interface CompareState {
	compareProducts: any[];
	addProductToCompareList: (product: any) => void;
	removeProductFromCompareList: (productId: string) => void;
	removeAllProductFromCompareList: () => void;
}

export const useCompareStore = create<CompareState>((set) => ({
	compareProducts: [],
	addProductToCompareList: (product: any) =>
		set((state) => {
			const productId = product.id;
			const isExist = state.compareProducts.find(
				(compareProduct) => compareProduct.id === productId
			);

			if (isExist) {
				return {
					compareProducts: state.compareProducts.filter(
						(product) => product.id != productId
					)
				};
			}

			return {
				compareProducts: [...state.compareProducts, product]
			};
		}),
	removeProductFromCompareList: (productId: string) =>
		set((state) => ({
			compareProducts: state.compareProducts.filter(
				(product) => product.id != productId
			)
		})),
	removeAllProductFromCompareList: () =>
		set(() => ({
			compareProducts: []
		}))
}));
