import ProductTile from './product-tile';

interface ProductListProps {
	products: any[];
	onCompareClick: (payload: any) => any;
}

const ProductList: React.FC<ProductListProps> = ({
	products,
	onCompareClick
}) => {
	return (
		<div className="grid grid-cols-1 gap-4 md:gap-8">
			{products.map((product) => {
				const { is_bulk_pricing, bulk_pricing = [] } = product || {};
				let minPrice = 0;
				let maxPrice = 0;
				if (is_bulk_pricing) {
					const startRange = bulk_pricing[0]?.range?.split('-')[0];
					const endRange =
						bulk_pricing[bulk_pricing?.length - 1]?.range?.split(
							'-'
						)[0];
					minPrice = startRange;
					maxPrice = endRange;
				}

				return (
					<ProductTile
						key={product.id}
						name={product.product_name}
						slug={product.slug}
						description={product.product_description}
						imageUrl={
							product.images[0]?.url ||
							'https://images.unsplash.com/photo-1505156868547-9b49f4df4e04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aXBob25lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
						}
						keywords={product.tags || []}
						productPrice={product.product_price}
						minPrice={minPrice}
						maxPrice={maxPrice}
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
