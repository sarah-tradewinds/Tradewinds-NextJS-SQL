// Third party packages
import useSWR from 'swr';
import { axiosInstance } from 'utils/axios-instance.utils';

export const useGetCountries = () => {
	const { data, isLoading, isValidating, error } = useSWR(
		'/cms/country',
		axiosInstance.get
	);

	return {
		countries: (data as any)?.data?.data || [],
		isLoading,
		isValidating,
		error
	};
};
