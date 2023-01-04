import Button from 'components/common/form/button';
import { getHomeCountries } from 'lib/home.lib';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import {
	getFilterValueFromQuery,
	getProductSearchURL
} from 'utils/common.util';
import CountrySearchDropdown from '../country-search-dropdown';

interface ProductFilterSliderProps {
	isOpen?: boolean;
	onClose?: () => void;
}

const ProductFilterSlider: React.FC<ProductFilterSliderProps> = (
	props
) => {
	const { isOpen, onClose } = props;

	const [isCustomizable, setIsCustomizable] = useState(false);
	const [isReadyToShip, setIsReadyToShip] = useState(false);
	const [minOrder, setMinOrder] = useState(1);
	const [maxOrder, setMaxOrder] = useState(100);
	const [minPrice, setMinPrice] = useState(1);
	const [maxPrice, setMaxPrice] = useState(100);

	const router = useRouter();
	const { push, query } = router;

	useEffect(() => {
		const filterValue = getFilterValueFromQuery(query);
		setIsCustomizable(filterValue.is_customizable);
		setIsReadyToShip(filterValue.is_ready_to_ship);

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
		'md:hidden fixed bottom-[80px] top-[98px] z-40 w-[211px] overflow-y-auto rounded-tr-md rounded-br-md bg-white py-4 pl-2 pr-4 pb-40 shadow-xl transition-all duration-300';

	if (isOpen) {
		containerClassName += ' translate-x-0';
	} else {
		containerClassName += ' -translate-x-full';
	}

	return (
		<div className={containerClassName}>
			{/* Categories */}
			<div>
				<p className="text-[13.27px] font-semibold">Catagories</p>
				<div className="h-[99.53px] overflow-auto rounded-md border-2 border-accent-primary-main p-4">
					{/* main Categories */}
					<div className="text-[]">
						<p>Agriculture Equipment</p>
						{/* category */}
						<div>
							<p>Agricultural Waste</p>
							<p>Animal Products</p>
							<p>Beans</p>
							<p>Fresh Fruit</p>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-6 space-y-4">
				{/* Customizable - checkbox */}
				<label className="flex items-center justify-between">
					<p className="text-[13.27px] font-semibold">Customizable</p>
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
				<label className="flex items-center justify-between">
					<p className="text-[13.27px] font-semibold">
						Live Buy/ Ready to ship
					</p>
					<input
						type="checkbox"
						checked={isReadyToShip}
						className="h-5 w-5"
						onChange={() => {
							setIsReadyToShip((prevState) => {
								const updatedValue = !prevState;
								getProductSearchURL(router, {
									isReadyToShip: updatedValue
								});
								return updatedValue;
							});
						}}
					/>
				</label>

				{/* Min order */}
				<div className="text-[13.27px] font-semibold">
					<p>Min. Order</p>
					<p className="flex h-7 items-center justify-center rounded-md border-2 border-accent-primary-main p-4">
						0 - 10
					</p>
				</div>
				{/* Min Price */}
				<div className="text-[13.27px] font-semibold">
					<p className="text-[13.27px] font-semibold">Min. Price</p>
					<p className="flex h-7 items-center justify-center rounded-md border-2  border-accent-primary-main p-4">
						$0 - $10 USD
					</p>
				</div>
				{/* Supplier Country / Region */}
				<div className="text-[13.27px] font-semibold">
					<p className="text-[13.27px] font-semibold">
						Supplier Country / Region
					</p>
					<CountrySearchDropdown
						countries={countries || []}
						onCountryChange={(id, name) =>
							getProductSearchURL(router, {
								country: `${id}_${name || ''}`
							})
						}
					/>
					<p className="flex h-7 items-center justify-center rounded-md border-2  border-accent-primary-main p-4">
						Uruguay
					</p>
				</div>
			</div>

			{/* actions */}
			<div className="mt-6 space-y-2">
				<Button
					variant="buyer"
					className="!w-full !text-[13.27px]"
					onClick={onClose}
				>
					Search
				</Button>
				<Button
					className="!w-full !text-[13.27px] !font-normal !text-accent-primary-main"
					onClick={() => getProductSearchURL(router, {}, true)}
				>
					Reset Filters
				</Button>
			</div>
		</div>
	);
}; // End of ProductFilterSlider

export default ProductFilterSlider;
