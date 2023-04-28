import { axiosInstance } from 'utils/axios-instance.utils';

export const getAllCategoryByAlphabets = async (isEco?: boolean) => {
	https: try {
		const { data } = await axiosInstance.get(
			`/cms/category/main-cat-sub-specific?isEco=${isEco || false}`
		);
		return data.data || {};
	} catch (error) {
		console.log('[getAllCategoryByAlphabets] =', error);
		const { data, status } = (error as any).response || {};
		return {};
	}
}; // End of getAllCategoryByAlphabets function
