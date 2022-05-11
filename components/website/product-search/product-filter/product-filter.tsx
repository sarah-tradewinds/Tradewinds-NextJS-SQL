// components
import Button from 'components/website/common/form/button';
import Input from 'components/website/common/form/input';
import CategoriesFilter from 'components/website/product-search/product-filter/categories-filter';
import React from 'react';
import CountrySearchFilter from './country-filter';

const ProductFilter: React.FC = (props) => {
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
					<Input className="w-full rounded-none rounded-l-md !px-2 2xl:w-auto" />
					<Button
						variant="buyer"
						className="rounded-none rounded-r-md px-2"
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
					<Input className="w-full rounded-none rounded-l-md !px-2 2xl:w-auto" />
					<Button
						variant="buyer"
						className="rounded-none rounded-r-md px-2"
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
