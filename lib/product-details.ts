import {
	axiosInstance,
	serviceAxiosInstance
} from 'utils/axios-instance.utils';

export const getProductById = async (productId: string) => {
	try {
		const { data } = await serviceAxiosInstance.get(
			`/product/${productId}`
		);
		return data.data || {};
	} catch (error) {
		console.log('[getProductById] =', error);
		const { data, status } = (error as any).response || {};
		if (status >= 500) {
			throw Error('Error occurred in getProductById');
		}
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
		if (status >= 500) {
			throw Error('Error occurred in getProductReviewsByProductId');
		}
		return [];
	}
}; // End of getProductReviewsByProductId

export const getSellerDetailsSellerId = async (sellerId: string) => {
	try {
		const { data } = await axiosInstance.get(`/seller/${sellerId}`);
		return data.response || {};
	} catch (error) {
		console.log('[getSellerDetailsSellerId] =', error);
		const { data, status } = (error as any).response || {};
		if (status >= 500) {
			throw Error('Error occurred in getSellerDetailsSellerId');
		}
		return {};
	}
}; // End of getSellerDetailsSellerId

export const submitProductRatingAndReview = async (ratingData: {
	comments: string;
	rating: number;
	user_id: string;
	product_id: string;
	order_id: string;
}) => {
	try {
		const { data } = await serviceAxiosInstance.post(
			'/order_review',
			ratingData
		);
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
