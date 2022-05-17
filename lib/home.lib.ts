import { axiosInstance } from 'utils/axios-instance.utils';

export const getHeroCarousels = async () => {
	try {
		const { data } = await axiosInstance.get(
			'/carousel/getallcarousel'
		);
		// console.log(data.data);
		return data.data || [];
	} catch (error) {
		console.log('[getHeroCarousels] =', error);
		const { data } = (error as any).response || {};
		throw Error(data || 'Error occurred in getHeroCarousels');
	}
}; // End of getHeroCarousels function

export const getCardAList = async () => {
	try {
		const { data } = await axiosInstance.get('/cardA/getallcardA');

		return data.data || [];
	} catch (error) {
		console.log('[getCardAList] =', error);
		const { data } = (error as any).response || {};
		throw Error(data || 'Error occurred getCardAList');
	}
}; // End of getCardAList function

export const getCardB = async () => {
	try {
		const { data } = await axiosInstance.get('/cardB/getallcardB');

		return data.data ? data.data[0] : {};
	} catch (error) {
		console.log('[getCardB] =', error);
		const { data } = (error as any).response || {};
		throw Error(data || 'Error occurred getCardB');
	}
}; // End of getCardB function

export const getHomeCategories = async () => {
	try {
		const { data } = await axiosInstance.get('/categories');
		const homeCategories: any[] = [];

		data.data.forEach((mainCategory: any) => {
			const { category } = mainCategory;

			if (category) {
				const categoryAndSubCategories = {
					category: {
						id: mainCategory.id,
						title: mainCategory.title.en,
						slug: mainCategory.slug,
						image: mainCategory.image || '/static/images/TWveg.png',
						desc: mainCategory.description.en,
						btnTxt: mainCategory.btnTxt || '',
						bgHexColor: mainCategory.color,
						isEco: mainCategory.isEco || false
					},
					subCategories: category.map((subCategory: any) => ({
						id: subCategory.id,
						title: subCategory.title.en,
						slug: subCategory.slug,
						img:
							subCategory.image ||
							'/static/images/TWAgricultureMini1.png',
						clr: subCategory.clr || ''
					}))
				};

				homeCategories.push(categoryAndSubCategories);
			}
		});

		if (homeCategories.length > 0) {
			return homeCategories.slice(0, 7);
		}

		return homeCategories || [];
	} catch (error) {
		console.log('[getHomeCategories] =', error);
		const { data } = (error as any).response || {};
		throw Error(data || 'Error occurred getHomeCategories');
	}
}; // End of getHomeCategories function

export const getHomeCountries = async () => {
	try {
		const { data } = await axiosInstance.get('/country/getallcountry');

		return data.data || [];
	} catch (error) {
		console.log('[getHomeCountries] =', error);
		const { data } = (error as any).response || {};
		throw Error(data || 'Error occurred getHomeCountries');
	}
}; // End of getHomeCountries function

export const getHomeAdvertisments = async () => {
	try {
		const { data } = await axiosInstance.get(
			'/advertisement/getalladvertisement'
		);

		return data.data || [];
	} catch (error) {
		console.log('[getHomeAdvertisments] =', error);
		const { data } = (error as any).response || {};
		throw Error(data || 'Error occurred getHomeAdvertisments');
	}
}; // End of getHomeAdvertisments function
