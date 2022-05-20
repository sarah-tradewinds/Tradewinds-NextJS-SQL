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
				return (
					<ProductTile
						key={product.id}
						name={product.product_name}
						slug={product.slug}
						description={product.product_description}
						imageUrl={
							product.images[0]?.url
								? 'https://' + product.images[0]?.url
								: 'https://images.unsplash.com/photo-1505156868547-9b49f4df4e04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aXBob25lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
						}
						keywords={product.tags || []}
						minPrice={product.product_price}
						maxPrice={product.maxPrice}
						alt={product.alt || product.name}
						minOrderQuantity={product.minimumOrderQuantity}
						totalReviewCount={product.totalReviewCount}
						onCompareClick={() => onCompareClick(product)}
						isInCompareList={product.isInCompareList}
						isVerified={product.is_verified}
					/>
				);
			})}
		</div>
	);
}; // End of ProductList component

export default ProductList;
