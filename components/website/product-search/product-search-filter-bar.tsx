import { getHomeCountries } from 'lib/home.lib';
import useSWR from 'swr';
import CountrySearchDropdown from './country-search-dropdown';

const ProductSearchFilterBar: React.FC = () => {
	// const dropDownSelect =
	// 	'focus:shadow-outline block w-full max-w-[250px] cursor-pointer border border-solid border-gray/40 py-1 px-2 leading-tight focus:outline-none md:px-3 md:py-[5px]';

	// Fetching Countries
	const { data: countries, isValidating: isCountriesValidating } =
		useSWR('/region_country/all', getHomeCountries);

	console.log('countries =', countries);

	const dropDownSelect =
		'outline-none border-2 border-gray/20 h-9 w-[84px] lg:w-[202px]';

	return (
		// <div className="sticky top-[188.5px] z-[1000] w-full sm:top-[112px] md:px-4 md:pt-2 lg:px-6 lg:pt-4">
		// <div className="top-[127px]s sticky top-[355px] z-[1000] md:mx-4 md:mt-2 lg:top-[360px] lg:mx-6 lg:mt-4">
		<div className="hidden justify-between rounded-md border border-gray/10 bg-white p-2 shadow-lg md:flex lg:p-4">
			{/* Live Buy/ Ready to ship - checkbox */}
			<label className="flex cursor-pointer items-center">
				<input type="checkbox" className="!rounded-none md:scale-125" />
				{/* For large screen */}
				<p className="ml-2 font-semibold text-gray">
					<span className="hidden text-[15px] lg:block">
						Live Buy/ Ready to ship
					</span>

					{/* For medium screen */}
					<span className="block text-[10px] lg:hidden">
						Ready to ship
					</span>
				</p>
			</label>

			{/* Customizable - checkbox */}
			<label className="flex cursor-pointer items-center">
				<input type="checkbox" className="!rounded-none md:scale-125" />
				<p className="ml-2 text-[10px] font-semibold text-gray lg:text-[15px]">
					Customizable
				</p>
			</label>

			{/* Country - dropdown */}
			<div className="relative flex items-center">
				<label
					htmlFor="country"
					className="mr-2 text-[10px] font-semibold text-gray lg:text-[15px]"
				>
					Country
				</label>
				<CountrySearchDropdown countries={countries || []} />
				{/* <select
						name="country"
						id="country"
						// className={`!w-[115px] ${dropDownSelect}`}
					>
						<option value="">Select a country</option>
						<option value="afghanistan">Afghanistan</option>
						<option value="albania">Albania</option>
						<option value="algeria">Algeria</option>
						<option value="usa">United State</option>
					</select> */}
			</div>

			{/* Min. Order - dropdown */}
			<div className="flex items-center">
				<label
					htmlFor="country"
					className="mr-2 whitespace-nowrap text-[10px] font-semibold text-gray lg:text-[15px]"
				>
					Min. Order
				</label>
				<select name="country" id="country" className={dropDownSelect}>
					<option value="">0 - 10</option>
					<option value="0 - 1">0 - 1</option>
					<option value="0 - 2">0 - 2</option>
					<option value="0 -  3">0 - 3</option>
					<option value="0 - 4">0 - 4</option>
				</select>
			</div>

			{/* Dollar - dropdown */}
			<div className="flex items-center">
				<label
					htmlFor="country"
					className="mr-2 hidden text-[10px] font-semibold text-gray lg:inline-block lg:text-[15px]"
				>
					$$$
				</label>
				<select name="country" id="country" className={dropDownSelect}>
					<option className="text-gray" value="">
						$0 - $10
					</option>
					<option value="$0 - $1">$0 - $1</option>
					<option value="$0 - $2">$0 - $2</option>
					<option value="$0 - $3">$0 - $3</option>
					<option value="$0 - $4">$0 - $4</option>
				</select>
			</div>
		</div>
		// </div>
	);
}; //end of ProductSearchFilterBar

export default ProductSearchFilterBar;
