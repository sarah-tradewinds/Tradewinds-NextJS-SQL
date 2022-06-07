// components
import Button from 'components/website/common/form/button';
import Input from 'components/website/common/form/input';
import CategoriesFilter from 'components/website/product-search/product-filter/categories-filter';
import React, { useState } from 'react';
import CountrySearchFilter from './country-filter';

interface ProductFilterProps {
	onMinPriceChange: (minPrice: string) => any;
	onMinOrderChange: (minOrder: string) => any;
	onCountryChange?: (countyCodes: string) => any;
}

const ProductFilter: React.FC<ProductFilterProps> = (props) => {
	const { onMinPriceChange, onMinOrderChange, onCountryChange } = props;

	const [minOrder, setMinOrder] = useState('0');
	const [minPrice, setMinPrice] = useState('0');

	return (
		<div className="space-y-6 rounded-xl bg-white p-4 pb-40 shadow-md">
			{/* Categories filter */}
			<div>
				<h4 className="font-semibold text-gray md:text-[14px] lg:text-[18px]">
					Categories
				</h4>
				<CategoriesFilter />
			</div>

			{/* min order filter */}
			<div>
				<h4 className="text-[18px] font-semibold text-gray">
					Min. Order
				</h4>
				<div className="flex">
					<Input
						type="number"
						className="w-full rounded-none rounded-l-md !px-2 2xl:w-auto"
						value={minOrder}
						onChange={({ target }) => setMinOrder(target.value)}
					/>
					<Button
						variant="buyer"
						className="rounded-none rounded-r-md px-2"
						onClick={() => onMinOrderChange(minOrder)}
					>
						Go
					</Button>
				</div>
			</div>

			{/* price filter */}
			<div>
				<h4 className="text-[18px] font-semibold text-gray">
					Min. Price
				</h4>
				<div className="flex">
					<Input
						type="number"
						className="w-full rounded-none rounded-l-md !px-2 2xl:w-auto"
						value={minPrice}
						onChange={({ target }) => setMinPrice(target.value)}
					/>
					<Button
						variant="buyer"
						className="rounded-none rounded-r-md px-2"
						onClick={() => onMinPriceChange(minPrice)}
					>
						Go
					</Button>
				</div>
			</div>

			{/* country search filter */}
			<div className="space-y-4">
				<h4 className="text-[18px] font-semibold text-gray">
					Supplier Country/ Region
				</h4>

				<CountrySearchFilter />
			</div>
		</div>
	);
};

export default ProductFilter;
