// Third party packages
import { getCountries } from 'lib/common.lib';
import create from 'zustand';

interface CountryState {
	countries: any[];
	fetchCountries: () => any;
}

export const useCountriesStore = create<CountryState>((set) => ({
	countries: [],
	fetchCountries: async () => {
		const countries = await getCountries();
		set({ countries });
	}
}));
