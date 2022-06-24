import { serviceAxiosInstance } from 'utils/axios-instance.utils';

export const getHeroCarousels = async () => {
	try {
		const { data } = await serviceAxiosInstance.get(
			'/carousel/getallcarousel'
		);
		return data.data || [];
	} catch (error) {
		console.log('[getHeroCarousels] =', error);
		const { data } = (error as any).response || {};
		// throw Error(data || 'Error occurred in getHeroCarousels');
		return [];
	}
}; // End of getHeroCarousels function

export const getCardAList = async () => {
	try {
		const { data } = await serviceAxiosInstance.get(
			'/cardA/getallcardA'
		);

		return data.data || [];
	} catch (error) {
		console.log('[getCardAList] =', error);
		const { data } = (error as any).response || {};
		// throw Error(data || 'Error occurred getCardAList');
		return [];
	}
}; // End of getCardAList function

export const getCardB = async () => {
	try {
		const { data } = await serviceAxiosInstance.get(
			'/cardB/getallcardB'
		);

		return data.data ? data.data[0] : {};
	} catch (error) {
		console.log('[getCardB] =', error);
		const { data } = (error as any).response || {};
		// throw Error(data || 'Error occurred getCardB');
		return {};
	}
}; // End of getCardB function

export const getHomeMainCategoriesAndCategories = async () => {
	try {
		const { data } = await serviceAxiosInstance.get('/cms_category');
		const homeCategories: any[] = [];
		// console.log(data.data[0].cat_section);

		// data.data.forEach((mainCategory: any) => {
		// 	const { category } = mainCategory;

		// 	if (category) {
		// 		const categoryAndSubCategories = {
		// 			category: {
		// 				id: mainCategory.id,
		// 				title: mainCategory.title.en,
		// 				slug: mainCategory.slug,
		// 				image: mainCategory.image || '/static/images/TWveg.png',
		// 				desc: mainCategory.description.en || 'description',
		// 				btnTxt: mainCategory.btnTxt || '',
		// 				bgHexColor: mainCategory.color || '#C4C4C4',
		// 				isEco: mainCategory.isEco || false
		// 			},
		// 			subCategories: category.map((subCategory: any) => ({
		// 				id: subCategory.id,
		// 				title: subCategory.title.en,
		// 				slug: subCategory.slug,
		// 				img:
		// 					subCategory.image ||
		// 					'/static/images/TWAgricultureMini1.png',
		// 				clr: subCategory.clr || ''
		// 			}))
		// 		};

		// 		homeCategories.push(categoryAndSubCategories);
		// 	}
		// });

		// if (homeCategories.length > 0) {
		// 	return homeCategories.slice(0, 7);
		// }

		return data.data[0].cat_section;

		return [];
		return homeCategories || [];
	} catch (error) {
		console.log('[getHomeMainCategoriesAndCategories] =', error);
		const { data } = (error as any).response || {};
		// throw Error(data || 'Error occurred getHomeMainCategoriesAndCategories');
		return [];
	}
}; // End of getHomeMainCategoriesAndCategories function

export const getHomeCountries = async () => {
	try {
		const { data } = await serviceAxiosInstance.get(
			'/country/getallcountry'
		);

		return data.data || [];
	} catch (error) {
		console.log('[getHomeCountries] =', error);
		const { data } = (error as any).response || {};
		// throw Error(data || 'Error occurred getHomeCountries');
		return [];
	}
}; // End of getHomeCountries function

export const getHomeAdvertisments = async () => {
	try {
		const { data } = await serviceAxiosInstance.get(
			'/advertisement/getalladvertisement'
		);

		return data.data || [];
	} catch (error) {
		console.log('[getHomeAdvertisments] =', error);
		const { data } = (error as any).response || {};
		// throw Error(data || 'Error occurred getHomeAdvertisments');
		return [];
	}
}; // End of getHomeAdvertisments function
