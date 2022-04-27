// Third party packages
import create from 'zustand';

// data
import { products } from '../data/product-search/products';

export type Product = {
	id: any;
	name: string;
	slug: string;
	title?: string;
	description: string;
	minPrice: number;
	maxPrice: number;
	minimumOrderQuantity: number;
	keywords: string[];
	imageUrl: string;
	alt?: string;
	rating: number;
	totalReviewCount: number;
	isInCompareList?: boolean;
}[];

interface ProductState {
	products: Product;
	addProductToCompareList: (product: any) => void;
	removeProductFromCompareList: (productId: string) => void;
	removeAllProductFromCompareList: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
	products: products,
	addProductToCompareList: (product: any) =>
		set((state) => {
			let comparedProductCount = 0;

			state.products.forEach((product) => {
				if (product.isInCompareList) {
					comparedProductCount += 1;
				}
			});
			if (comparedProductCount >= 4) {
				return { products: state.products };
			}
			const productId = product.id;

			return {
				products: state.products.map((product) => {
					if (product.id === productId) {
						product.isInCompareList = !product.isInCompareList;
					}
					return product;
				})
			};
		}),
	removeProductFromCompareList: (productId: string) =>
		set((state) => ({
			products: state.products.filter((product) => {
				if (product.id === productId) {
					product.isInCompareList = !product.isInCompareList;
				}
				return product;
			})
		})),
	removeAllProductFromCompareList: () =>
		set((state) => ({
			products: state.products.filter((product) => {
				product.isInCompareList = false;
				return product;
			})
		}))
}));
