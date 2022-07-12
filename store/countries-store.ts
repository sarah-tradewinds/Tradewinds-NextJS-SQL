// Third party packages
import { getCountries } from 'lib/common.lib';
import create from 'zustand';

interface CountryState {
	countries: any[];
	// selectedCountryIds: string[];
	selectedCountries: { id: string; name: string }[];
	setSelectedCountry: (newCountryCode: string, name: string) => any;
	fetchCountries: (countryList?: []) => any;
	removeSelectedCountries: () => any;
}

export const useCountriesStore = create<CountryState>((set) => ({
	countries: [],
	// selectedCountryIds: [],
	selectedCountries: [],
	setSelectedCountry: (newCountryId, name) =>
		set(({ selectedCountries, countries }) => {
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

			const updatedCountries = countryList.map((country: any) => {
				const countryIndex = selectedCountryList.findIndex(
					(selectedCountry) => {
						return selectedCountry.id === country.id;
					}
				);
				country.isSelected = countryIndex >= 0;

				return country;
			});

			return {
				countries: updatedCountries,
				selectedCountries: selectedCountryList
			};
		}), // End of set method
	fetchCountries: async (countryList?: []) => {
		let countries = !countryList
			? await getCountries()
			: countryList || [];

		set(({ selectedCountries }) => {
			if (countries.length >= 0) {
				countries = countries.map((country: any) => {
					const countryIndex = selectedCountries.findIndex(
						(selectedCountry: any) => {
							return selectedCountry.id === country.id;
						}
					);
					country.isSelected = countryIndex >= 0;

					return country;
				});
			}

			return {
				countries
			};
		});
	},
	removeSelectedCountries: () =>
		set(({ countries }) => {
			const countryList = countries.map((country: any) => {
				country.isSelected = country.isSelected || false;
				return country;
			});

			return { countries: countryList, selectedCountries: [] };
		})
}));
