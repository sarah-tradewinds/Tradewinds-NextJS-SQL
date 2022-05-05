import { axiosInstance } from 'utils/axios-instance.utils';

export const getHeroCarousels = async () => {
	try {
		const { data } = await axiosInstance.get(
			'/carousel/getallcarousel?limit=10&page=1'
		);
		return data.data || [];
	} catch (error) {
		console.log(error);
		const { data } = (error as any).response || {};
		throw Error(data || 'Error occurred in getHeroCarousels');
	}
}; // End of getHeroCarousels function

export const getCardAList = async () => {
	try {
		const { data } = await axiosInstance.get(
			'/cardA/getallcardA?limit=2&page=1'
		);

		return data.data || [];
	} catch (error) {
		const { data } = (error as any).response || {};
		throw Error(data || 'Error occurred getCardAList');
	}
}; // End of getCardAList function

export const getCardB = async () => {
	try {
		const { data } = await axiosInstance.get(
			'/cardB/getallcardB?limit=1&page=1'
		);

		return data.data ? data.data[0] : {};
	} catch (error) {
		const { data } = (error as any).response || {};
		throw Error(data || 'Error occurred getCardB');
	}
}; // End of getCardB function

export const getHomeCategories = async () => {
	try {
		const { data } = await axiosInstance.get(
			'/categories?page=1&limit=7'
		);

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
						isEco: mainCategory.isEco
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

		return homeCategories || [];
	} catch (error) {
		const { data } = (error as any).response || {};
		throw Error(data || 'Error occurred getHomeCategories');
	}
}; // End of getHomeCategories function

export const getHomeCountries = async () => {
	try {
		const { data } = await axiosInstance.get(
			'/country/getallcountry?limit=10&page=1'
		);

		return data.data || [];
	} catch (error) {
		const { data } = (error as any).response || {};
		throw Error(data || 'Error occurred getHomeCountries');
	}
}; // End of getHomeCountries function