// components
import Button from 'components/common/form/button';
import { useTranslation } from 'next-i18next';
import React from 'react';
import CategoriesFilter from './categories-filter';

interface ProductFilterProps {
	onCountryChange?: (countyCodes: string) => any;
}

const ProductFilter: React.FC<ProductFilterProps> = (props) => {
	const { t } = useTranslation();

	return (
		<div className="h-full space-y-6 overflow-y-auto rounded-xl bg-white px-4 pb-20 shadow-md">
			{/* Categories filter */}
			<div>
				<h4 className="font-semibold text-gray md:my-1 md:text-[14px] md:leading-4 lg:text-[18px] lg:leading-[33px]">
					{t('navigation:categories_text')}
				</h4>

				<CategoriesFilter />

				<div className="mt-9 space-y-2">
					<Button
						className={`

          'flex lg:max-h-6' w-full items-center bg-accent-primary-main !px-2 !text-white
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
		</div>
	);
};

export default ProductFilter;
