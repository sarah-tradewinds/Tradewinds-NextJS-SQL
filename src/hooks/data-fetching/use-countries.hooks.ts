// Third party packages
import useSWR from 'swr';
import { axiosInstance } from 'utils/axios-instance.utils';

export const useGetCountries = () => {
	const { data, isLoading, isValidating, error } = useSWR(
		'/cms/country?limit=100000',
		axiosInstance.get
	);

	return {
		countries: (data as any)?.data?.data || [],
		isLoading,
		isValidating,
		error
	};
};

export const useGetStateByCountryId = (countryId: string) => {
	const endpoint = `cms/state/country/${countryId}?limit=100000`;
	return useSWR(endpoint, async () => {
		try {
			const { data } = await axiosInstance.get(endpoint);
			return data?.data || [];
		} catch (error) {
			return [];
		}
	});
}; // End of useGetStateByCountryId

export const useGetCityByStateId = (stateId: string) => {
	const endpoint = `cms/city/state/${stateId}?limit=100000`;
	return useSWR(endpoint, async () => {
		try {
			const { data } = await axiosInstance.get(endpoint);
			return data?.data || [];
		} catch (error) {
			return [];
		}
	});
}; // End of useGetCityByStateId
