import { useEffect, useState } from 'react';
import { generateListByCount } from 'utils/common.util';
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

	const { products, onClearAllClick, onRemoveCompareProduct } = props;

	useEffect(() => {
		if (products.length === 1) {
			setIsOpen(true);
		}
	}, [products.length]);

	return (
		<div className="relative">
			<CompareProductBottomOverlay
				isOpen={isOpen}
				onClose={() => setIsOpen((prevState) => !prevState)}
			>
				<div className="flex flex-wrap items-center justify-center space-x-6 py-4 px-4 md:flex-nowrap 2xl:px-16">
					{products.map((product) => (
						<CompareProductTile
							key={product.id}
							imageUrl={product?.images ? product?.images[0].url : ''}
							minPrice={0}
							maxPrice={0}
							title={product.name}
							onRemoveCompareProduct={() => {
								if (onRemoveCompareProduct) {
									onRemoveCompareProduct(product.id);
								}
							}}
						/>
					))}

					{/* Show when we have less than 4 products */}
					{generateListByCount(3 - products.length).map(
						(placeHolder) => (
							<div
								key={placeHolder}
								className="h-[65px] w-[65px]  overflow-hidden bg-black lg:h-[108px] lg:w-[180px] xl:h-[80px] xl:w-[240px] 2xl:h-[76px] 2xl:w-[240px]"
							></div>
						)
					)}

					{/* Action button */}
					<div className="mt-4 flex w-full space-x-6 md:w-auto md:flex-col md:space-x-0 md:space-y-4">
						<Button
							className="w-full border !py-0 !px-2 font-normal md:w-[116px]"
							onClick={onClearAllClick}
						>
							CLEAR ALL
						</Button>
						<Button
							href="/compare"
							variant="buyer"
							className="w-full !px-2 font-normal md:w-[116px]"
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
