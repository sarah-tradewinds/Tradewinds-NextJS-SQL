// Third party packages
import { getCountries } from 'lib/common.lib';
import create from 'zustand';

interface CountryState {
	countries: any[];
	selectedCountryIds: string[];
	setSelectedCountryId: (newCountryCode: string) => any;
	fetchCountries: (countryList?: []) => any;
	removeSelectedCountries: () => any;
}

export const useCountriesStore = create<CountryState>((set) => ({
	countries: [],
	selectedCountryIds: [],
	setSelectedCountryId: (newCountryId: string) =>
		set((state) => {
			const countryCodeList: string[] = [...state.selectedCountryIds];
			const countryList: string[] = [...state.countries];
			const countryCodeIndex = countryCodeList.findIndex(
				(countryCode) => countryCode === newCountryId
			);

			// Adding country id if not exist
			if (countryCodeIndex < 0) {
				countryCodeList.push(newCountryId);
			} else {
				// Removing country id if not exist
				countryCodeList.splice(countryCodeIndex, 1);
			}

			const countries = countryList.map((country: any) => {
				country.isSelected = country.isSelected || false;
				// if (country.id === newCountryId) {
				//  country.isSelected = !country.isSelected;
				// }
				if (country.country_name === newCountryId) {
					country.isSelected = !country.isSelected;
				}
				return country;
			});

			return { countries, selectedCountryIds: countryCodeList };
		}), // End of set method
	fetchCountries: async (countryList?: []) => {
		let countries = !countryList
			? await getCountries()
			: countryList || [];

		set(({ selectedCountryIds }) => {
			if (countries.length >= 0) {
				countries = countries.map((country: any) => {
					const isSelected =
						selectedCountryIds.findIndex(
							(selectedCountryId) =>
								selectedCountryId?.toLowerCase() ===
								country.country_name?.toLowerCase()
						) >= 0;

					country.isSelected = isSelected;

					return country;
				});
			}

			return {
				countries
			};
		});
	},
	removeSelectedCountries: () =>
		set((state) => {
			const countries = state.countries.map((country: any) => {
				country.isSelected = country.isSelected || false;
				return country;
			});

			return { countries, selectedCountryIds: [] };
		})
}));
