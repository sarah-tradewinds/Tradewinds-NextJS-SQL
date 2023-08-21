import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Third party packages
import { Popover } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useTranslation } from 'next-i18next';
import useSWR from 'swr';

// components
import Button from '../common/form/button';
import CountrySearchDropdown, {
	ICountry
} from './country-search-dropdown';
import MinMaxPicker from './product-filter/min-max-picker.components';

// libs
import { getHomeCountries } from 'lib/home.lib';

// util
import { getFilterValueFromQuery } from 'utils/common.util';

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
	const { t } = useTranslation();
	const [isCustomizable, setIsCustomizable] = useState(false);
	const [isLiveBuy, setIsLiveBuyShip] = useState(false);
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
		setIsLiveBuyShip(filterValue.is_live_buy);

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
		'relative flex items-center justify-center outline-none border-[1.27px] border-[#DCDBDB] md:h-[18px] lg:h-[15.43px] w-[84px] lg:w-[133.7px] desktop:w-[195.89px] desktop:h-[22.6px] rounded-full font-semibold md:text-[10px] md:leading-[22px]';

	const chevronDownIcon = (
		<ChevronDownIcon className="hidden h-6 w-6 text-[#E1DDDD] lg:block" />
	);

	return (
		<div className="hidden justify-between rounded-md border border-gray/10 bg-white shadow-lg md:flex md:h-8 md:py-[7px] md:pl-[9px] md:pr-2 lg:h-[54px] lg:pl-[13px] lg:pr-[14px] lg:pt-2 lg:pb-[10px] xl:pl-[49px] xl:pr-[24.67px]">
			{/* Live Buy/ Ready to ship - checkbox */}
			<label className="flex cursor-pointer items-center">
				<input
					type="checkbox"
					checked={isLiveBuy}
					className="!rounded-none md:scale-125"
					onChange={() => {
						setIsLiveBuyShip((prevState) => {
							onLiveBuyReadyToShipChange?.(!prevState);
							return !prevState;
						});
					}}
				/>
				{/* For large screen */}
				<p className="ml-2 font-semibold text-gray">
					<span className="hidden text-[15px] lg:block lg:text-[12px] lg:leading-[14.63px] xl:text-[14.5px] xl:leading-[17.29px]">
						{t('live_buy/_ready_to_ship')}
					</span>

					{/* For medium screen */}
					<span className="block text-[10px] font-semibold lg:hidden">
						{t('ready_to_ship')}
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
				<p className="ml-2 text-[10px] font-semibold text-gray lg:text-[12px] lg:leading-[14.63px] xl:text-[14.5px] xl:leading-[17.29px]">
					{t('customizable')}
				</p>
			</label>

			{/* Country - dropdown */}
			<div className="relative flex items-center lg:hidden">
				<label
					htmlFor="country"
					className="mr-2 text-[10px] font-semibold leading-[22px] text-gray lg:text-[15px]"
				>
					{t('country')}
				</label>
				<CountrySearchDropdown
					countries={countries || []}
					defaultValue={selectedCountry}
					onCountryChange={onCountryChange}
					inputAndButtonContainerClassName={`flex justify-between md:h-[18px] text-gray-900 lg:h-9 md:w-[115px] border-2 border-gray/20 lg:py-2 pl-1 pr-8 font-semibold outline-none lg:w-[202px]`}
					buttonClassName="absolute inset-y-0 right-0 flex items-center pr-2 md:hidden lg:block text-center"
					optionsContainerClassName="w-[202px] sw-full"
				/>
			</div>

			{/* Min. Order - dropdown */}
			<div className="relative mr-2 flex items-center">
				<p className="mr-2 whitespace-nowrap text-[10px] font-semibold text-gray lg:text-[12px] lg:leading-[14.63px] xl:text-[14.5px] xl:leading-[17.29px]">
					{t('min._order')}
				</p>

				<Popover className="relative">
					<Popover.Button className={dropDownSelect}>
						<span className=" text-[10px] text-gray lg:text-[12px] lg:leading-[14.63px] xl:text-[14px] xl:leading-[17.29px]">
							{minOrder} - {maxOrder}
						</span>

						<span className="absolute right-1">{chevronDownIcon}</span>
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
										{t('cancel')}
									</Button>
									<Button
										className="!text-primary-main"
										onClick={() => {
											onOrderChange?.(minOrder, maxOrder);
											close();
										}}
									>
										{t('select')}
									</Button>
								</div>
							</>
						)}
					</Popover.Panel>
				</Popover>
			</div>

			{/* Dollar - dropdown */}
			<div className="relative flex items-center">
				<p className="mr-2 whitespace-nowrap text-[10px] font-semibold text-gray lg:text-[12px] lg:leading-[14.63px] xl:text-[14.5px] xl:leading-[17.29px]">
					$$$
				</p>

				<Popover className="relative">
					<Popover.Button className={dropDownSelect}>
						<span className="text-[10px] text-gray lg:text-[12px] lg:leading-[14.63px] xl:text-[14px] xl:leading-[17.29px]">
							${minPrice} - ${maxPrice}
						</span>
						<span className="absolute right-1">{chevronDownIcon}</span>
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
										{t('cancel')}
									</Button>
									<Button
										className="!text-primary-main"
										onClick={() => {
											onPriceChange?.(minPrice, maxPrice);
											close();
										}}
									>
										{t('select')}
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
