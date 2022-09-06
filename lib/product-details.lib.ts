import { serviceAxiosInstance } from 'utils/axios-instance.utils';

export const getProductById = async (productId: string) => {
	try {
		const { data } = await serviceAxiosInstance.get(
			`/product/${productId}`
		);

		if (data?.data) {
			data.data.tags = data.data.seo?.keyword || [];
		}

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
		const { data } = await serviceAxiosInstance.get(
			`/order_review/product/${productId}`
		);
		return data.data || [];
	} catch (error) {
		console.log('[getProductReviewsByProductId] =', error);
		const { data, status } = (error as any).response || {};
		return [];
	}
}; // End of getProductReviewsByProductId

export const getSellerDetailsBySellerId = async (sellerId: string) => {
	try {
		const { data } = await serviceAxiosInstance.get(
			`/seller/profile/${sellerId}`
		);
		console.log(data.data);
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
		const { data } = await serviceAxiosInstance.get(
			`/seller/${sellerId}`
		);
		return data.data || {};
	} catch (error) {
		console.log('[getSellerStorefrontDetailsSellerId] =', error);
		const { data, status } = (error as any).response || {};
		return {};
	}
}; // End of getSellerStorefrontDetailsSellerId

export const canCustomerGiveReviewOnThisProduct = async (
	customerId: string,
	productId: string
) => {
	const defaultResponse = {
		message: '',
		canCustomerWiteReviewForThisProduct: false
	};

	if (!customerId) {
		return defaultResponse;
	}

	try {
		const { data } = await serviceAxiosInstance.post(
			'/order_review/is-review-allowed',
			{ buyer_id: customerId, product_id: productId }
		);

		return {
			message: data.message,
			canCustomerWiteReviewForThisProduct: data.data
		};
	} catch (error) {
		console.log('[canCustomerGiveReviewOnThisProduct] =', error);
		const { data, status } = (error as any).response || {};

		defaultResponse.message = data.message;
		return defaultResponse;
	}
}; // End of canCustomerGiveReviewOnThisProduct

export const submitProductRatingAndReview = async (
	ratingData: {
		comments: string;
		rating: number;
		user_id: string;
		product_id: string;
		order_id: string;
	},
	reviewId?: string
) => {
	try {
		const url = reviewId
			? `/order_review/update/${reviewId}`
			: '/order_review';

		const { data } = await serviceAxiosInstance[
			reviewId ? 'put' : 'post'
		](url, ratingData);
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
		const { data } = await serviceAxiosInstance.get(
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
		const { data } = await serviceAxiosInstance.get(
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
		const { data } = await serviceAxiosInstance.get(
			`/seller_collection/collection_and_products?seller_id=${sellerId}`
		);
		return data.data || [];
	} catch (error) {
		console.log('[getProductsWithCollectionBySellerId] =', error);
		const { data, status } = (error as any).response || {};
		return [];
	}
}; // End of getProductsWithCollectionBySellerId
