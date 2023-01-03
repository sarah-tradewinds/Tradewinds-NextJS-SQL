import { getHomeCountries } from 'lib/home.lib';
import useSWR from 'swr';
import CountrySearchDropdown from './country-search-dropdown';

interface ProductSearchFilterBarProps {
	onCountryChange?: (id: string, name?: string) => void;
	onOrderChange?: (minOrder?: number, maxOrder?: number) => void;
	onPriceChange?: (minPrice?: number, maxPrice?: number) => void;
}

const ProductSearchFilterBar: React.FC<ProductSearchFilterBarProps> = (
	props
) => {
	const { onCountryChange, onOrderChange, onPriceChange } = props;

	// Fetching Countries
	const { data: countries, isValidating: isCountriesValidating } =
		useSWR('/region_country/all', getHomeCountries);

	const dropDownSelect =
		'outline-none border-2 border-gray/20 h-9 w-[84px] lg:w-[202px]';

	return (
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
				<CountrySearchDropdown
					countries={countries || []}
					onCountryChange={onCountryChange}
				/>
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

				{/* Dollar - dropdown */}
				<div className="flex items-center">
					<label
						htmlFor="country"
						className="mr-2 hidden text-[10px] font-semibold text-gray lg:inline-block lg:text-[15px]"
					>
						$$$
					</label>
					<select
						name="country"
						id="country"
						className={dropDownSelect}
					>
						<option className="text-gray" value="">
							$0 - $10
						</option>
						<option value="$0 - $1">$0 - $1</option>
						<option value="$0 - $2">$0 - $2</option>
						<option value="$0 - $3">$0 - $3</option>
						<option value="$0 - $4">$0 - $4</option>
					</select>
				</div>
			</div>{' '}
		</div>
	);
}; //end of ProductSearchFilterBar

export default ProductSearchFilterBar;
