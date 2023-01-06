import { Popover } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { getHomeCountries } from 'lib/home.lib';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { getFilterValueFromQuery } from 'utils/common.util';
import Button from '../common/form/button';
import CountrySearchDropdown, {
	ICountry
} from './country-search-dropdown';
import MinMaxPicker from './product-filter/min-max-picker.components';

interface ProductSearchFilterBarProps {
	onCountryChange?: (id?: string, name?: string) => void;
	onOrderChange?: (minOrder?: number, maxOrder?: number) => void;
	onPriceChange?: (minPrice?: number, maxPrice?: number) => void;
	onCustomizableChange?: (isCustomizable: boolean) => void;
	onLiveBuyReadyToShipChange?: (value: boolean) => void;
}

const ProductSearchFilterBar: React.FC<ProductSearchFilterBarProps> = (
	props
) => {
	const {
		onCountryChange,
		onOrderChange,
		onPriceChange,
		onCustomizableChange,
		onLiveBuyReadyToShipChange
	} = props;

	const [isCustomizable, setIsCustomizable] = useState(false);
	const [isReadyToShip, setIsReadyToShip] = useState(false);
	const [minOrder, setMinOrder] = useState(1);
	const [maxOrder, setMaxOrder] = useState(100);
	const [minPrice, setMinPrice] = useState(1);
	const [maxPrice, setMaxPrice] = useState(100);
	const [selectedCountry, setSelectedCountry] = useState<
		ICountry | undefined
	>();

	const { query } = useRouter();

	useEffect(() => {
		const filterValue = getFilterValueFromQuery(query);
		console.log(filterValue);
		setIsCustomizable(filterValue.is_customizable);
		setIsReadyToShip(filterValue.is_ready_to_ship);

		// order
		setMinOrder(+(filterValue.minimum_order || 1));
		setMaxOrder(+(filterValue.maximum_order || 100));

		// price
		setMinPrice(+(filterValue.price_start || 1));
		setMaxPrice(+(filterValue.price_end || 100));

		// country
		const countryId = filterValue.countryId;
		setSelectedCountry(
			countryId
				? {
						id: (countryId || '').toString(),
						name: {
							en: (filterValue.country_of_region || '').toString()
						},
						slug: {}
				  }
				: undefined
		);
	}, [query]);

	// Fetching Countries
	const { data: countries, isValidating: isCountriesValidating } =
		useSWR('/region_country/all', getHomeCountries);

	const dropDownSelect =
		'outline-none border-2 border-gray/20 h-9 w-[84px] lg:w-[202px]';

	return (
		<div className="hidden justify-between rounded-md border border-gray/10 bg-white p-2 shadow-lg md:flex lg:p-4">
			{/* Live Buy/ Ready to ship - checkbox */}
			<label className="flex cursor-pointer items-center">
				<input
					type="checkbox"
					checked={isReadyToShip}
					className="!rounded-none md:scale-125"
					onChange={() => {
						setIsReadyToShip((prevState) => {
							onLiveBuyReadyToShipChange?.(!prevState);
							return !prevState;
						});
					}}
				/>
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
				<input
					type="checkbox"
					checked={isCustomizable}
					className="!rounded-none md:scale-125"
					onChange={() => {
						setIsCustomizable((prevState) => {
							onCustomizableChange?.(!prevState);
							return !prevState;
						});
					}}
				/>
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
					defaultValue={selectedCountry}
					onCountryChange={onCountryChange}
					inputAndButtonContainerClassName={`flex justify-between text-gray-900 h-9 w-[84px] border-2 border-gray/20 py-2 pl-3 pr-10 font-semibold outline-none lg:w-[202px]`}
					buttonClassName="absolute inset-y-0 right-0 flex items-center pr-2"
					optionsContainerClassName="w-[240px]s w-full"
				/>
			</div>
			{/* Min. Order - dropdown */}
			<div className="relative flex items-center">
				<p className="mr-2 whitespace-nowrap text-[10px] font-semibold text-gray lg:text-[15px]">
					Min. Order
				</p>

				<Popover className="relative">
					<Popover.Button
						className={`flex items-center justify-between px-2 ${dropDownSelect}`}
					>
						<span>
							{minOrder}-{maxOrder}
						</span>
						<ChevronDownIcon className="h-6 w-6" />
					</Popover.Button>

					<Popover.Panel className="absolute -right-0 z-10 mt-1 w-auto bg-black">
						{({ close }) => (
							<>
								<MinMaxPicker
									minStart={1}
									minEnd={100}
									maxStart={1}
									maxEnd={100}
									className="h-[180px] rounded-md"
									onMinChange={setMinOrder}
									onMaxChange={setMaxOrder}
								/>

								<div className="mt-4 flex">
									<Button
										className="!text-error"
										onClick={() => {
											setMinOrder(0);
											setMaxOrder(0);
											close();
										}}
									>
										Cancel
									</Button>
									<Button
										className="!text-primary-main"
										onClick={() => {
											onOrderChange?.(minOrder, maxOrder);
											close();
										}}
									>
										Select
									</Button>
								</div>
							</>
						)}
					</Popover.Panel>
				</Popover>
			</div>
			{/* Dollar - dropdown */}
			<div className="relative flex items-center">
				<p className="mr-2 whitespace-nowrap text-[10px] font-semibold text-gray lg:text-[15px]">
					$$$
				</p>

				<Popover className="relative">
					<Popover.Button
						className={`flex items-center justify-between px-2 ${dropDownSelect}`}
					>
						<span>
							{minPrice}-{maxPrice}
						</span>
						<ChevronDownIcon className="h-6 w-6" />
					</Popover.Button>

					<Popover.Panel className="absolute -right-8 z-10 w-auto bg-black">
						{({ close }) => (
							<>
								<MinMaxPicker
									minStart={1}
									minEnd={100}
									maxStart={1}
									maxEnd={100}
									className="h-[180px] rounded-md"
									onMinChange={setMinPrice}
									onMaxChange={setMaxPrice}
								/>

								<div className="mt-4 flex">
									<Button
										className="!text-error"
										onClick={() => {
											setMinPrice(0);
											setMaxPrice(0);
											close();
										}}
									>
										Cancel
									</Button>
									<Button
										className="!text-primary-main"
										onClick={() => {
											onPriceChange?.(minPrice, maxPrice);
											close();
										}}
									>
										Select
									</Button>
								</div>
							</>
						)}
					</Popover.Panel>
				</Popover>
			</div>
		</div>
	);
}; //end of ProductSearchFilterBar

export default ProductSearchFilterBar;
