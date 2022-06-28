// Third party packages
import useSWR from 'swr';

export const useGetCategories = () => {
	// Loading mega-menu data here
	const { data, isValidating, error } = useSWR(
		'/categories?page=1&limit=100'
	);

	// console.log(data);
}; // End of useGetCategories function
