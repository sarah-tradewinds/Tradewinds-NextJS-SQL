import { serviceAxiosInstance } from 'utils/axios-instance.utils';

export const getProductById = async (productId: string) => {
	try {
		const { data } = await serviceAxiosInstance.get(
			`/product/${productId}`
		);
		return data.data || {};
	} catch (error) {
		console.log('[getProductById] =', error);
		const { data, status } = (error as any).response || {};
		return {};
		if (status >= 500) {
			throw Error('Error occurred in getProductById');
		}
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
		if (status >= 500) {
			throw Error('Error occurred in getProductReviewsByProductId');
		}
		return [];
	}
}; // End of getProductReviewsByProductId

export const getSellerDetailsSellerId = async (sellerId: string) => {
	try {
		const { data } = await serviceAxiosInstance.get(
			`/seller/profile/${sellerId}`
		);
		return data.data || {};
	} catch (error) {
		console.log('[getSellerDetailsSellerId] =', error);
		const { data, status } = (error as any).response || {};
		return {};
		if (status >= 500) {
			throw Error('Error occurred in getSellerDetailsSellerId');
		}
	}
}; // End of getSellerDetailsSellerId

export const canCustomerGiveReviewOnThisProduct = async (
	customerId: string,
	productId: string
) => {
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
		if (status >= 500) {
			throw Error(
				'Error occurred in canCustomerGiveReviewOnThisProduct'
			);
		}
		return {
			message: data.message,
			canCustomerWiteReviewForThisProduct: false
		};
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
		if (status >= 500) {
			throw Error('Error occurred in submitProductRatingAndReview');
		}
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
		if (status >= 500) {
			throw Error('Error occurred in getSimilarProducts');
		}
		return [];
	}
}; // End of getSimilarProducts
