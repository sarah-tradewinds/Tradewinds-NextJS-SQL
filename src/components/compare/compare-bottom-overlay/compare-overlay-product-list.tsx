import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import {
	generateListByCount,
	getDefaultProductAndProductVariants
} from 'utils/common.util';
import { getDisplayBulkPrice } from 'utils/get-bulk-price';
import { getLocaleText } from 'utils/get_locale_text';
import Button from '../../common/form/button';
import CompareProductTile from './compare-overlay-product-tile';
import CompareProductBottomOverlay from './compare-product-bootom-overlay';

interface CompareProductListProps {
	products: any[];
	onClearAllClick?: () => any;
	onRemoveCompareProduct?: (id: string) => any;
}

const CompareProductList: React.FC<CompareProductListProps> = (
	props
) => {
	const [isOpen, setIsOpen] = useState(false);
	const { locale } = useRouter();

	const { products, onClearAllClick, onRemoveCompareProduct } = props;

	useEffect(() => {
		if (products.length === 1) {
			setIsOpen(true);
		}
	}, [products.length]);

	const actionButtons = (
		<div className="mt-4 flex w-full justify-center space-x-6 sm:space-x-6 md:w-auto md:flex-col md:space-x-0 md:space-y-4">
			<Button
				className="w-[116px] border !py-0 !px-2 font-normal"
				onClick={onClearAllClick}
			>
				CLEAR ALL
			</Button>
			<Button
				href="/compare"
				variant="buyer"
				className="!w-[116px] !px-2 font-normal"
			>
				COMPARE
			</Button>
		</div>
	);

	return (
		<div className="relative">
			<CompareProductBottomOverlay
				isOpen={isOpen}
				onClose={() => setIsOpen((prevState) => !prevState)}
			>
				{/* <div className="2xl:px-16 flex flex-wrap items-center justify-center space-x-6 py-4 px-4 md:flex-nowrap"> */}
				<div className="py-4 2xl:px-16">
					<div className="grid grid-cols-4 gap-x-2 px-4 md:grid-cols-5 md:gap-x-6">
						{products?.map((product) => {
							const { defaultVariant } =
								getDefaultProductAndProductVariants(
									product?.edges?.product_variants || []
								);

							const { id } = product;

							const {
								retail_price = 0,
								sales_price = 0,
								is_on_sale,
								is_bulk_pricing,
								bulk_pricing = [],
								inventory = {}
							} = defaultVariant || {};

							const displayPrice = getDisplayBulkPrice({
								product_price: is_on_sale ? sales_price : retail_price,
								is_bulk_pricing,
								bulk_pricing
							});

							return (
								<CompareProductTile
									key={id}
									imageUrl={defaultVariant?.images?.[0] || ''}
									displayPrice={displayPrice}
									title={getLocaleText(product.name || {}, locale)}
									onRemoveCompareProduct={() => {
										if (onRemoveCompareProduct) {
											onRemoveCompareProduct(product.id);
										}
									}}
									className="h-[65px] md:h-[128px] lg:h-[108px] xl:h-[80px] desktop:h-[76px]"
								/>
							);
						})}

						{/* Show when we have less than 4 products */}
						{generateListByCount(3 - products.length).map(
							(placeHolder) => (
								<div
									key={placeHolder}
									className="h-[65px] overflow-hidden bg-black md:h-[128px] lg:h-[108px] xl:h-[80px] desktop:h-[76px]"
								></div>
							)
						)}

						<div className="hidden md:block">{actionButtons}</div>
					</div>

					{/* Action button */}
					<div className="mt-4 flex w-full justify-center space-x-6 sm:space-x-6 md:hidden md:w-auto md:flex-col md:space-x-0 md:space-y-4">
						<Button
							className="w-[116px] border !py-0 !px-2 font-normal"
							onClick={onClearAllClick}
						>
							CLEAR ALL
						</Button>
						<Button
							href="/compare"
							variant="buyer"
							className="!w-[116px] !px-2 font-normal"
						>
							COMPARE
						</Button>
					</div>
				</div>
			</CompareProductBottomOverlay>
		</div>
	);
}; // End of CompareProductList component

export default CompareProductList;
