import { useRouter } from 'next/router';

// components
import Button from 'components/website/common/form/button';
import Input from 'components/website/common/form/input';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { applyFiltersByUrl } from 'utils/nav-actions.utils';
import CategoriesFilter from './categories-filter';
import CategoriesFilterCopy from './categories-filter-copy';
import CountrySearchFilter from './country-filter';
import CountrySearchFilterCopy from './country-filter copy';

interface ProductFilterProps {
	onMinPriceChange: (minPrice: string) => any;
	onMinOrderChange: (minOrder: string) => any;
	onCountryChange?: (countyCodes: string) => any;
	// TODO:TMP Remove this once url state is done
	url?: boolean;
}

const ProductFilter: React.FC<ProductFilterProps> = (props) => {
	const { onMinOrderChange, url } = props;

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
				{url ? <CategoriesFilterCopy /> : <CategoriesFilter />}
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
						value={minPrice || query?.price_start}
						placeholder="0"
						onChange={({ target }) => setMinPrice(target.value)}
					/>
					<Button
						variant="buyer"
						className="rounded-none rounded-r-md px-2"
						onClick={() => {
							push(
								`/product-search-copy?${applyFiltersByUrl({
									...query,
									price_start: minPrice ? +minPrice : 0
								})}`
							);
						}}
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

				{url ? <CountrySearchFilterCopy /> : <CountrySearchFilter />}
			</div>
		</div>
	);
};

export default ProductFilter;
