import { Popover } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { getHomeCountries } from 'lib/home.lib';
import { useState } from 'react';
import useSWR from 'swr';
import Button from '../common/form/button';
import CountrySearchDropdown from './country-search-dropdown';
import MinMaxPicker from './product-filter/min-max-picker.components';

interface ProductSearchFilterBarProps {
	onCountryChange?: (id: string, name?: string) => void;
	onOrderChange?: (minOrder?: number, maxOrder?: number) => void;
	onPriceChange?: (minPrice?: number, maxPrice?: number) => void;
}

const ProductSearchFilterBar: React.FC<ProductSearchFilterBarProps> = (
	props
) => {
	const { onCountryChange, onOrderChange, onPriceChange } = props;

	const [minOrder, setMinOrder] = useState(0);
	const [maxOrder, setMaxOrder] = useState(0);
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(0);

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
			<div className="relative flex items-center">
				<p className="mr-2 whitespace-nowrap text-[10px] font-semibold text-gray lg:text-[15px]">
					Min. Order
				</p>

				<Popover className="relative">
					<Popover.Button
						className={`flex items-center justify-between px-2 ${dropDownSelect}`}
					>
						{minOrder && maxOrder && (
							<span>
								{minOrder}-{maxOrder}
							</span>
						)}
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
										Okay
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
										Okay
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
