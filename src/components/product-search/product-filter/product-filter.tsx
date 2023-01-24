// components
import Button from 'components/common/form/button';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';
import { getProductSearchURL } from 'utils/common.util';
import CategoriesFilter from './categories-filter';

interface ProductFilterProps {
	onCountryChange?: (countyCodes: string) => any;
}

const ProductFilter: React.FC<ProductFilterProps> = (props) => {
	const { t } = useTranslation();
	const router = useRouter();

	return (
		<div className="h-full space-y-6 overflow-y-auto rounded-xl bg-white px-4 pb-20 shadow-md md:pb-6">
			{/* Categories filter */}
			<div>
				<h4 className="font-semibold text-gray md:mb-1 md:mt-2 md:text-[14px] md:leading-4 lg:text-[18px] lg:leading-[33px]">
					{t('navigation:categories_text')}
				</h4>

				<CategoriesFilter />

				<div className="mt-8 space-y-2">
					<Button className="flex w-full items-center justify-center !bg-cyan !px-2 !text-white">
						Search
					</Button>

					<button
						onClick={() => getProductSearchURL(router, {})}
						className="w-full items-center bg-transparent !px-2 text-center text-[10px] leading-[22px] !text-cyan"
					>
						Reset Filters
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductFilter;
