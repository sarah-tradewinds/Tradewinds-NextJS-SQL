// components
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
		<div className="h-full space-y-6 overflow-y-auto rounded-xl bg-white pb-20 shadow-md md:pr-[9px] md:pl-[15px] md:pb-6">
			{/* Categories filter */}
			<div>
				<h4 className="font-semibold text-gray md:mb-1 md:mt-2 md:text-[14px] md:leading-4 lg:text-[16px] xl:text-[18px] xl:leading-[33px]">
					{t('navigation:categories_text')}
				</h4>

				<CategoriesFilter />

				<div className="mt-2 space-y-2">
					<button className="flex w-full lg:w-[154px] xl:w-[225.12px] xl:h-[36.96] items-center justify-center rounded-md bg-cyan text-[10px] font-semibold text-white outline-none md:h-[22px] lg:h-[25px] lg:text-[11.33px] lg:leading-[24.92px] xl:text-[16.8px] xl:leading-[37px]">
						Search
					</button>

					<button
						onClick={() => getProductSearchURL(router, {}, true)}
						className="w-full items-center bg-transparent px-2 text-center text-[10px] leading-[22px] text-cyan lg:text-[11.33px] lg:leading-[24.92px] xl:text-[16.8px] xl:leading-[37px]"
					>
						Reset Filters
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductFilter;
