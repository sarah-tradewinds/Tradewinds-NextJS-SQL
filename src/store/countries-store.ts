// Third party packages
import { getCountries } from 'lib/common.lib';
import { getRegionsAndCountries } from 'lib/shop-by-country.lib';
import create from 'zustand';

interface CountryState {
	countries: any[];
	regionsAndCountries: any[];
	selectedCountries: { id: string; name: string }[];
	setSelectedCountry: (newCountryCode: string, name: string) => any;
	fetchCountries: (countryList?: []) => any;
	fetchRegionsAndCountries: () => any;
	removeSelectedCountries: () => any;
}

export const useCountriesStore = create<CountryState>((set) => ({
	countries: [],
	regionsAndCountries: [],
	selectedCountries: [],
	setSelectedCountry: (newCountryId, name) =>
		set(({ selectedCountries, countries, regionsAndCountries }) => {
			const selectedCountryList = [...selectedCountries];
			const countryList: string[] = [...countries];

			const countryIndex = selectedCountryList.findIndex(
				(country) => country.id === newCountryId
			);

			// Adding country id if not exist
			if (countryIndex < 0) {
				selectedCountryList.push({
					id: newCountryId,
					name
				});
			} else {
				// Removing country id if not exist
				selectedCountryList.splice(countryIndex, 1);
			}

			const updatedCountries = updatedCountriesSelectedState(
				countryList,
				selectedCountryList
			);

			const updatedRegionsAndCountries =
				updatedRegionsAndCountriesSelectedState(
					regionsAndCountries,
					selectedCountryList
				);

			return {
				countries: updatedCountries,
				regionsAndCountries: updatedRegionsAndCountries,
				selectedCountries: selectedCountryList
			};
		}), // End of set method
	fetchCountries: async (countryList?: []) => {
		let countries = !countryList
			? await getCountries()
			: countryList || [];

		set(({ selectedCountries }) => {
			if (countries.length >= 0) {
				countries = updatedCountriesSelectedState(
					countries,
					selectedCountries
				);
			}

			return {
				countries
			};
		});
	},
	fetchRegionsAndCountries: async () => {
		let regionsAndCountries = (await getRegionsAndCountries()) || [];

		set(({ selectedCountries }) => {
			if (regionsAndCountries.length >= 0) {
				regionsAndCountries = updatedRegionsAndCountriesSelectedState(
					regionsAndCountries,
					selectedCountries
				);
			}

			return {
				regionsAndCountries
			};
		});
	},
	removeSelectedCountries: () =>
		set(({ countries, selectedCountries, regionsAndCountries }) => {
			const countryList = updatedCountriesSelectedState(
				countries,
				selectedCountries
			);

			const updatedRegionsAndCountries =
				updatedRegionsAndCountriesSelectedState(
					regionsAndCountries,
					selectedCountries
				);

			return {
				countries: countryList,
				regionsAndCountries: updatedRegionsAndCountries,
				selectedCountries: []
			};
		})
}));

const updatedCountriesSelectedState = (
	countries: any[],
	selectedCountries: any[]
) => {
	return countries.map((country: any) => {
		const countryIndex = selectedCountries.findIndex(
			(selectedCountry: any) => {
				return selectedCountry.id === country.id;
			}
		);
		country.isSelected = countryIndex >= 0;
		return country;
	});
}; // End of updatedCountriesSelectedState

const updatedRegionsAndCountriesSelectedState = (
	regionsAndCountries: any[],
	selectedCountries: any[]
) => {
	return (regionsAndCountries = regionsAndCountries.map(
		(regionAndCountries: any) => {
			const { countries = [] } = regionAndCountries || {};

			regionAndCountries.isSelected = false;
			const updatedCountries = countries?.map((country: any) => {
				const countryIndex = selectedCountries.findIndex(
					(selectedCountry: any) => {
						return selectedCountry.id === country.id;
					}
				);

				const isSelected = countryIndex >= 0;
				country.isSelected = isSelected;
				if (isSelected) {
					regionAndCountries.isSelected = isSelected;
				}
				return country;
			});
			regionAndCountries.countries = updatedCountries || [];
			return regionAndCountries;
		}
	));
}; // End of updatedRegionsAndCountriesSelectedState
