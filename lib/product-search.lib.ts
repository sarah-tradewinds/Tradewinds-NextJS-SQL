import { serviceAxiosInstance } from 'utils/axios-instance.utils';
import { generateQueryString } from 'utils/generate_query_string.utils';

export const getProducts = async (params: {
	price_start: number;
	price_end?: number;
	categories?: string;
	main_category?: string;
	category?: string;
	sub_category?: string;
	sub_sub_category?: string;
	country_of_region?: string;
	is_eco?: boolean;
}) => {
	const queryString = generateQueryString(params);

	try {
		const { data } = await serviceAxiosInstance.get(
			`/product/search?${queryString}`
		);

		// return [];

		return (
			data.response.filter(
				(res: any) => res.images.length >= 1 && res.images[0].url
			) || []
		);
	} catch (error) {
		console.log('[getProducts] =', error);
		const { data, status } = (error as any).response || {};
		// if (status >= 500) {
		//   throw Error('Error occurred in getProducts');
		// }
		return [];
	}
}; // End of getProducts

export const getSelectedMainCategoryAndCategories = async (
	mainCategoryId: string
) => {
	try {
		const { data } = await serviceAxiosInstance.get(
			`/category/trending_category/${mainCategoryId}`
		);

		return data.data || {};
	} catch (error) {
		console.log('[getProducts] =', error);
		const { data, status } = (error as any).response || {};
		// if (status >= 500) {
		//   throw Error('Error occurred in getProducts');
		// }
		return {};
	}
}; // End of getSelectedMainCategoryAndCategories

export const searchCountryByNameUtil = (
	regionsAndCountries: any[],
	searchedCountryName: string
) => {
	const copiedRegionsAndCountries = [...regionsAndCountries];

	if (!searchedCountryName) {
		return copiedRegionsAndCountries;
	}

	const searchedRegionOrCountryName =
		searchedCountryName.toLocaleLowerCase();

	const filteredCountries = copiedRegionsAndCountries.filter(
		(regionAndCountries) => {
			const { name, countries = [] } = regionAndCountries || {};

			regionAndCountries.isSelected = false;
			if (name.toLowerCase() === searchedRegionOrCountryName) {
				regionAndCountries.isSelected = true;
				return regionAndCountries;
			} else {
				const filterCountries = countries.filter((country: any) => {
					const countryNames = Object.values(country?.name || {});
					const countryIndex = countryNames.findIndex(
						(countryName: any) => {
							return (
								countryName.toLowerCase() ===
								searchedRegionOrCountryName
							);
						}
					);

					const isCountryNameMatched = countryIndex >= 0;
					country.isSelected = isCountryNameMatched;

					return isCountryNameMatched;
				});

				regionAndCountries.isSelected = filterCountries.length > 0;
				regionAndCountries.countries = filterCountries || [];
				return regionAndCountries;
			}
		}
	);

	return filteredCountries || [];
}; // End of searchCountryByNameUtil function
