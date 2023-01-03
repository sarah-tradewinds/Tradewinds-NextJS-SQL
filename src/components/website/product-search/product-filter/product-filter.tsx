import { useRouter } from 'next/router';

// components
import Button from 'components/website/common/form/button';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import CategoriesFilter from './categories-filter';

interface ProductFilterProps {
	onCountryChange?: (countyCodes: string) => any;
}

const ProductFilter: React.FC<ProductFilterProps> = (props) => {
	const [minOrder, setMinOrder] = useState('0');
	const [minPrice, setMinPrice] = useState('');

	const { t } = useTranslation();

	const { query, push } = useRouter();

	return (
		<div className="bg-whites h-screen space-y-6 overflow-y-auto rounded-xl bg-white p-4 pb-40 shadow-md">
			{/* Categories filter */}
			<div>
				<h4 className="font-semibold text-gray md:text-[14px] lg:text-[18px]">
					{t('navigation:categories_text')}
				</h4>
				<CategoriesFilter />

				<div className="mt-6 space-y-2">
					<Button
						className={`
          
          'flex lg:max-h-6' w-full items-center bg-primary-main !px-2 !text-white
          `}
					>
						Search
					</Button>
					<Button
						className={`
          
          'flex lg:max-h-6' w-full items-center bg-transparent !px-2 !text-primary-main
          `}
					>
						Reset Filters
					</Button>
				</div>
			</div>

			{/* min order filter */}
			{/* <div>
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
						onClick={() => {
							push(
								`/product-search?${applyFiltersByUrl({
									...query,
									min_order: minOrder ? +minOrder : 0
								})}`
							);
						}}
					>
						Go
					</Button>
				</div>
			</div> */}

			{/* price filter */}
			{/* <div>
				<h4 className="text-[18px] font-semibold text-gray">
					Min. Price
				</h4>
				<div className="flex">
					<Input
						type="number"
						className="w-full rounded-none rounded-l-md !px-2 2xl:w-auto"
						value={minPrice || query?.price_start}
						placeholder="0"
						onChange={({ target }) => setMinPrice(target.value)}
					/>
					<Button
						variant="buyer"
						className="rounded-none rounded-r-md px-2"
						onClick={() => {
							push(
								`/product-search?${applyFiltersByUrl({
									...query,
									price_start: minPrice ? +minPrice : 0
								})}`
							);
						}}
					>
						Go
					</Button>
				</div>
			</div> */}

			{/* country search filter */}
			{/* <div className="space-y-4">
				<h4 className="text-[18px] font-semibold text-gray">
					Supplier Country/ Region
				</h4>

				<CountrySearchFilter />
			</div> */}
		</div>
	);
};

export default ProductFilter;