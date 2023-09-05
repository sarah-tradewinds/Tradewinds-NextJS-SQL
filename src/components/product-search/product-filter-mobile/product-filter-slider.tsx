import { Menu, Popover } from '@headlessui/react';
import Button from 'components/common/form/button';
import { getHomeCountries } from 'lib/home.lib';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import {
	getFilterValueFromQuery,
	getProductSearchURL
} from 'utils/common.util';
import CountrySearchDropdown from '../country-search-dropdown';
import CategoriesFilter from '../product-filter/categories-filter';
import MinMaxPicker from '../product-filter/min-max-picker.components';
interface ProductFilterSliderProps {
	isOpen?: boolean;
	onClose?: () => void;
}

const ProductFilterSlider: React.FC<ProductFilterSliderProps> = (
	props
) => {
	const { isOpen, onClose } = props;

	const [isCustomizable, setIsCustomizable] = useState(false);
	const [isLiveBuy, setIsLiveBuy] = useState(false);
	const [minOrder, setMinOrder] = useState(1);
	const [maxOrder, setMaxOrder] = useState(100);
	const [minPrice, setMinPrice] = useState(1);
	const [maxPrice, setMaxPrice] = useState(100);
	const [sortType, setSortType] = useState('');
	const { t } = useTranslation();
	const router = useRouter();
	const { push, query } = router;
	const sortingBy = [
		{
			sort: 'price_low_to_high',
			name: 'Price: Low to High'
		},
		{
			sort: 'price_high_to_low',
			name: 'Price: High to Low'
		},
		{
			sort: 'moq_low_to_high',
			name: 'MOQ: Low to High'
		},
		{
			sort: 'moq_high_to_low',
			name: 'MOQ: High to Low'
		}
	];
	useEffect(() => {
		const filterValue = getFilterValueFromQuery(query);
		setIsCustomizable(filterValue.is_customizable);
		setIsLiveBuy(filterValue.is_live_buy);
		setSortType(filterValue.sort_type);

		// order
		setMinOrder(+(filterValue.minimum_order || minOrder));
		setMaxOrder(+(filterValue.maximum_order || maxOrder));

		// price
		setMinPrice(+(filterValue.price_start || minPrice));
		setMaxPrice(+(filterValue.price_end || maxPrice));
	}, [query]);

	// Fetching Countries
	const { data: countries, isValidating: isCountriesValidating } =
		useSWR('/region_country/all', getHomeCountries);

	let containerClassName =
		'md:hidden fixed bottom-[80px]s top-[98px] z-40 w-[211px] overflow-y-auto rounded-tr-md rounded-br-md bg-white py-4 pl-2 pr-4 pb-6 h-[443.23px] shadow-xl transition-all duration-300';

	if (isOpen) {
		containerClassName += ' translate-x-0';
	} else {
		containerClassName += ' -translate-x-full';
	}

	return (
		<div className={containerClassName}>
			{/* Categories */}
			<div>
				<p className="text-[13.27px] font-semibold">
					{t('catagories')}{' '}
				</p>
				<div className="h-[99.53px] overflow-auto rounded-md border-2 border-accent-primary-main p-4">
					<CategoriesFilter />
				</div>
			</div>
			<div className="z-50 mt-4 ">
				<Menu as="div" className=" inline-block text-left ">
					<div>
						<Menu.Button className=" flex items-center text-[13.27px] font-semibold text-black ">
							<p className="font-semibold">Sort</p>
						</Menu.Button>
					</div>

					<Menu.Items className="divide-gray-100  mt-2 w-full origin-top-right divide-y rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:right-1">
						<div className=" p-2">
							{sortingBy.map(({ sort, name }) => {
								return (
									<Menu.Item key={sort}>
										<button
											// onClick={() => ProductSortType?.(sort)}
											// onClick={() => setSortType(sort)}
											onClick={() => {
												getProductSearchURL(router, {
													sort_type: sort
												});
												close();
											}}
											className={` my-1 block text-[11px] capitalize leading-[13px] hover:text-primary-main `}
											// 	locale === code
											// 		? 'font-semibold text-primary-main'
											// 		: ''
											// }`}
											// className=" block"
										>
											{name}
										</button>
									</Menu.Item>
								);
							})}
						</div>
					</Menu.Items>
				</Menu>
			</div>

			<div className="mt-4 space-y-4">
				{/* Customizable - checkbox */}
				<label className="flex items-center justify-between">
					<p className="text-[13.27px] font-semibold">
						{t('customizable')}
					</p>
					<input
						type="checkbox"
						checked={isCustomizable}
						className="h-5 w-5"
						onChange={() => {
							setIsCustomizable((prevState) => {
								const updatedValue = !prevState;
								getProductSearchURL(router, {
									isCustomizable: updatedValue
								});
								return updatedValue;
							});
						}}
					/>
				</label>
				{/* Live Buy/ Ready to ship - checkbox */}
				<label className="flex items-center  justify-between">
					<p className="w-[165px] text-[13.27px] font-semibold">
						{t('live_buy/_ready_to_ship')}
					</p>
					<input
						type="checkbox"
						checked={isLiveBuy}
						className="h-5 w-5"
						onChange={() => {
							setIsLiveBuy((prevState) => {
								const updatedValue = !prevState;
								getProductSearchURL(router, {
									isLiveBuy: updatedValue
								});
								return updatedValue;
							});
						}}
					/>
				</label>

				{/* Min order */}
				<div className="text-[13.27px] font-semibold">
					<p>{t('min._order')}</p>
					{/* <p className="flex h-7 items-center justify-center rounded-md border-2 border-accent-primary-main p-4"></p> */}
					<Popover className="relative">
						<Popover.Button className="flex h-7 w-full items-center justify-center rounded-md border-2 border-accent-primary-main p-4">
							{minOrder} - {maxOrder}
						</Popover.Button>

						<Popover.Panel className="absolute z-10 mt-1 w-full bg-black">
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

									<div className="mt-4 flex justify-evenly">
										<Button
											className="!px-0 !text-error"
											onClick={() => {
												setMinOrder(0);
												setMaxOrder(0);
												close();
											}}
										>
											{t('cancel')}
										</Button>
										<Button
											className="!px-0 !text-primary-main"
											onClick={() => {
												getProductSearchURL(router, {
													minOrder,
													maxOrder
												});
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

				{/* Min Price */}
				<div className="text-[13.27px] font-semibold">
					<p className="text-[13.27px] font-semibold">Min. Price</p>

					<Popover className="relative">
						<Popover.Button className="flex h-7 w-full items-center justify-center rounded-md border-2  border-accent-primary-main p-4">
							${minPrice} - ${maxPrice} USD
						</Popover.Button>

						<Popover.Panel className="absolute z-10 mt-1 w-full bg-black">
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

									<div className="mt-4 flex justify-evenly">
										<Button
											className="!px-0 !text-error"
											onClick={() => {
												setMinPrice(0);
												setMaxPrice(0);
												close();
											}}
										>
											{t('cancel')}
										</Button>
										<Button
											className="!px-0 !text-primary-main"
											onClick={() => {
												getProductSearchURL(router, {
													price_start: minPrice,
													price_end: maxPrice
												});
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

				{/* Supplier Country / Region */}
				<div className="text-[13.27px] font-semibold">
					<p className="text-[13.27px] font-semibold">
						{t('supplier_country')}/{t('region')}
					</p>
					<CountrySearchDropdown
						countries={countries || []}
						onCountryChange={(id, name) =>
							getProductSearchURL(router, {
								country: `${id}_${name || ''}`
							})
						}
						inputAndButtonContainerClassName="flex h-8 items-center justify-center rounded-md border-2 border-accent-primary-main px-6"
						inputClassName="text-center"
						buttonClassName="hidden"
						optionsContainerClassName="w-full"
					/>
				</div>
			</div>

			{/* actions */}
			<div className="mt-6 space-y-2">
				<Button
					variant="buyer"
					className="!w-full !text-[13.27px]"
					onClick={onClose}
				>
					{t('search')}
				</Button>
				<Button
					className="!w-full !text-[13.27px] !font-normal !text-accent-primary-main"
					onClick={() => getProductSearchURL(router, {}, true)}
				>
					{t('reset_filters')}
				</Button>
			</div>
		</div>
	);
}; // End of ProductFilterSlider

export default ProductFilterSlider;
