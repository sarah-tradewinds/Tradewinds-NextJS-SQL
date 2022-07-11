import { useRouter } from 'next/router';
import { getDisplayBulkPrice } from 'utils/get-bulk-price';
import { getLocaleText } from 'utils/get_locale_text';
import ProductTile from './product-tile';

interface ProductListProps {
	products: any[];
	onCompareClick: (payload: any) => any;
}

const ProductList: React.FC<ProductListProps> = ({
	products,
	onCompareClick
}) => {
	const { locale } = useRouter();

	return (
		<div className="grid grid-cols-1 gap-4 md:gap-8">
			{products.map((product) => {
				const {
					product_price,
					is_bulk_pricing,
					bulk_pricing = [],
					country_of_region = []
				} = product || {};

				const displayPrice = getDisplayBulkPrice({
					product_price,
					is_bulk_pricing,
					bulk_pricing
				});

				return (
					<ProductTile
						key={product.id}
						name={getLocaleText(product.product_name || {}, locale)}
						slug={product?.id}
						description={getLocaleText(
							product.product_description,
							locale
						)}
						imageUrl={product.images[0]?.url}
						countryOfOrigin={
							country_of_region ? country_of_region[0] : ''
						}
						keywords={product.tags || []}
						productPrice={product_price}
						displayPrice={displayPrice}
						// minPrice={minPrice}
						// maxPrice={maxPrice}
						alt={product.alt || product.name}
						minOrderQuantity={
							product?.inventory?.minimum_order_quantity || 0
						}
						totalReviewCount={product.totalReviewCount}
						onCompareClick={() => onCompareClick(product)}
						isInCompareList={product.isInCompareList}
						isVerified={product.is_verified}
						isReadyToShip={product.is_ready_to_ship}
						isCustomizable={product.is_customizable}
						variantCount={product?.variants?.length || 0}
					/>
				);
			})}
		</div>
	);
}; // End of ProductList component

export default ProductList;
