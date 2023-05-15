import {
	axiosInstance,
	proxyAxiosInstance
} from 'utils/axios-instance.utils';

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
			`/order_review/product/${productId}`
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
			`/order_review/analytical/${productId}`
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
		const { data } = await proxyAxiosInstance.post(
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

		const { data } = await axiosInstance[reviewId ? 'put' : 'post'](
			url,
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

export const getOrderIdByProductId = async (productId: string) => {
	try {
		const { data } = await axiosInstance.get(`/order/product/${productId}`);

		
		console.log('reviewId =', data?.data);

		return data.data || {};
	} catch (error) {
		console.log('[getOrderIdByProductId] =', error);
		const { data, status } = (error as any).response || {};
		return {};
	}
}; // End of getOrderIdByProductId