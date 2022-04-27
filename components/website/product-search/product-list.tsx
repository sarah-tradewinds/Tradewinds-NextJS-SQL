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
						name={product.name}
						slug={product.slug}
						description={product.description}
						imageUrl={product.imageUrl}
						keywords={product.keywords}
						maxPrice={product.maxPrice}
						alt={product.alt || product.name}
						minOrderQuantity={product.minimumOrderQuantity}
						minPrice={product.minPrice}
						totalReviewCount={product.totalReviewCount}
						onCompareClick={() => onCompareClick(product)}
					/>
				);
			})}
		</div>
	);
}; // End of ProductList component

export default ProductList;
