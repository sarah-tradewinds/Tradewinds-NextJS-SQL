import { axiosInstance } from 'utils/axios-instance.utils';

export const getProductById = async (productId: string) => {
	try {
		const { data } = await axiosInstance.get(`/product/${productId}`);

		if (data?.data) {
			data.data.tags = data.data.seo?.keyword || [];
		}
		console.log('product details =', data?.data);

		return data.data || {};
	} catch (error) {
		console.log('[getProductById] =', error);
		const { data, status } = (error as any).response || {};
		return {};
	}
}; // End of getProductById

export const getProductReviewsByProductId = async (
	productId: string
) => {
	try {
		const { data } = await axiosInstance.get(
			`/product/reviews/${productId}`
		);

		return data.data || [];
	} catch (error) {
		console.log('[getProductReviewsByProductId] =', error);
		const { data, status } = (error as any).response || {};
		return [];
	}
}; // End of getProductReviewsByProductId

export const getProductReviewAnalyticsByProductId = async (
	productId: string
) => {
	try {
		const { data } = await axiosInstance.get(
			`/product/analytical-reviews/${productId}`
		);

		return data.data || {};
	} catch (error) {
		console.log('[getProductReviewAnalyticsByProductId] =', error);
		const { data, status } = (error as any).response || {};
		return {};
	}
}; // End of getProductReviewAnalyticsByProductId

export const getSellerDetailsBySellerId = async (sellerId: string) => {
	try {
		const { data } = await axiosInstance.get(
			// `/seller/profile/${sellerId}`
			`/seller/${sellerId}`
		);
		return data.data || {};
	} catch (error) {
		console.log('[getSellerDetailsBySellerId] =', error);
		const { data, status } = (error as any).response || {};
		return {};
	}
}; // End of getSellerDetailsBySellerId

export const getSellerStorefrontDetailsSellerId = async (
	sellerId: string
) => {
	try {
		const { data } = await axiosInstance.get(`/seller/${sellerId}`);
		return data.data || {};
	} catch (error) {
		console.log('[getSellerStorefrontDetailsSellerId] =', error);
		const { data, status } = (error as any).response || {};
		return {};
	}
}; // End of getSellerStorefrontDetailsSellerId

export const canCustomerGiveReviewOnThisProduct = async (
	productId: string
) => {
	const defaultResponse = {
		message: '',
		canCustomerWiteReviewForThisProduct: false
	};

	try {
		const { data } = await axiosInstance.get(
			`product-review/validate-product-review/${productId}`
		);
		console.log('[canCustomerGiveReviewOnThisProduct] =', data?.data);
		const isEligible = data?.data?.IsEligible || false;

		return {
			message: data?.message || '',
			canCustomerWiteReviewForThisProduct: isEligible
		};
	} catch (error) {
		console.log('[canCustomerGiveReviewOnThisProduct] =', error);
		const { data, status } = (error as any).response || {};

		defaultResponse.message = data.message;
		return defaultResponse;
	}
}; // End of canCustomerGiveReviewOnThisProduct

export const submitProductRatingAndReview = async (ratingData: {
	product_id: string;
	rating: number;
	comments: string;
}) => {
	try {
		const { data } = await axiosInstance.post(
			'/product-review',
			ratingData
		);
		return {
			message: data.message
		};
	} catch (error) {
		console.log('[submitProductRatingAndReview] =', error);
		const { data, status } = (error as any).response || {};

		return {};
	}
}; // End of submitProductRatingAndReview

export const getSimilarProducts = async (productId: string) => {
	try {
		const { data } = await axiosInstance.get(
			`/product/similar/${productId}`
		);
		return data.data || [];
	} catch (error) {
		console.log('[getSimilarProducts] =', error);
		const { data, status } = (error as any).response || {};
		return [];
	}
}; // End of getSimilarProducts

export const getFeaturedProductsBySellerId = async (
	sellerId: string
) => {
	try {
		const { data } = await axiosInstance.get(
			`/product/is_featured_product?seller_id=${sellerId}`
		);
		return data.data || [];
	} catch (error) {
		console.log('[getFeaturedProductsBySellerId] =', error);
		const { data, status } = (error as any).response || {};
		return [];
	}
}; // End of getFeaturedProductsBySellerId

export const getProductsWithCollectionBySellerId = async (
	sellerId: string
) => {
	try {
		const { data } = await axiosInstance.get(
			`/seller/collection?seller_id=${sellerId}`
		);
		return data.data || [];
	} catch (error) {
		console.log('[getProductsWithCollectionBySellerId] =', error);
		const { data, status } = (error as any).response || {};
		return [];
	}
}; // End of getProductsWithCollectionBySellerId
