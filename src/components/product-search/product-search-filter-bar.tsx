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
		'outline-none border-2 border-gray/20 tablet:h-[18px] desktop:h-9 w-[84px] desktop:w-[202px] font-semibold tablet:text-[10px] tablet:leading-[22px]';

	const chevronDownIcon = (
		<ChevronDownIcon className="hidden h-6 w-6 text-[#E1DDDD] desktop:block" />
	);

	return (
		<div className="hidden justify-between rounded-md border border-gray/10 bg-white shadow-lg tablet:flex tablet:h-8 tablet:py-[7px] tablet:pl-[9px] tablet:pr-2 desktop:h-[54px] desktop:pl-[13px] desktop:pr-[14px] desktop:pt-2 desktop:pb-[10px]">
			{/* Live Buy/ Ready to ship - checkbox */}
			<label className="flex cursor-pointer items-center">
				<input
					type="checkbox"
					checked={isReadyToShip}
					className="!rounded-none tablet:scale-125"
					onChange={() => {
						setIsReadyToShip((prevState) => {
							onLiveBuyReadyToShipChange?.(!prevState);
							return !prevState;
						});
					}}
				/>
				{/* For large screen */}
				<p className="ml-2 font-semibold text-gray">
					<span className="hidden text-[15px] desktop:block desktop:leading-[18px]">
						Live Buy/ Ready to ship
					</span>

					{/* For medium screen */}
					<span className="block text-[10px] desktop:hidden">
						Ready to ship
					</span>
				</p>
			</label>

			{/* Customizable - checkbox */}
			<label className="flex cursor-pointer items-center">
				<input
					type="checkbox"
					checked={isCustomizable}
					className="!rounded-none tablet:scale-125"
					onChange={() => {
						setIsCustomizable((prevState) => {
							onCustomizableChange?.(!prevState);
							return !prevState;
						});
					}}
				/>
				<p className="ml-2 text-[10px] font-semibold text-gray desktop:text-[15px] desktop:leading-[18px]">
					Customizable
				</p>
			</label>

			{/* Country - dropdown */}
			<div className="relative flex items-center">
				<label
					htmlFor="country"
					className="mr-2 text-[10px] font-semibold leading-[22px] text-gray desktop:text-[15px]"
				>
					Country
				</label>
				<CountrySearchDropdown
					countries={countries || []}
					defaultValue={selectedCountry}
					onCountryChange={onCountryChange}
					inputAndButtonContainerClassName={`flex justify-between tablet:h-[18px] text-gray-900 desktop:h-9 tablet:w-[115px] border-2 border-gray/20 desktop:py-2 pl-1 pr-8 font-semibold outline-none desktop:w-[202px]`}
					buttonClassName="absolute inset-y-0 right-0 flex items-center pr-2 tablet:hidden desktop:block text-center"
					optionsContainerClassName="w-[202px] sw-full"
				/>
			</div>

			{/* Min. Order - dropdown */}
			<div className="relative flex items-center">
				<p className="mr-2 whitespace-nowrap text-[10px] font-semibold text-gray desktop:text-[15px]">
					Min. Order
				</p>

				<Popover className="relative">
					<Popover.Button
						className={`px-2s flex items-center justify-center ${dropDownSelect}`}
					>
						<span>
							{minOrder}-{maxOrder}
						</span>

						{chevronDownIcon}
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
				<p className="mr-2 whitespace-nowrap text-[10px] font-semibold text-gray desktop:text-[15px]">
					$$$
				</p>

				<Popover className="relative">
					<Popover.Button
						className={`flex items-center justify-center px-2 ${dropDownSelect}`}
					>
						<span>
							{minPrice}-{maxPrice}
						</span>
						{chevronDownIcon}
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
