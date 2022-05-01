import { NextPage } from 'next';

// components
import CategorySubCategoriesSection from 'components/website/home/category-sub-categories-section';
import ProductDetailsTile from 'components/website/product-details/product-details-tile';

// data
import ProductDetailsTabContainer from 'components/website/product-details/product-details-tab/product-details-tab-container';
import SimilarProductList from 'components/website/product-details/similar-product-list';
import { AgriData } from 'data/home';

const ProductDetailsPage: NextPage = (props) => {
	return (
		<div className=" space-y-8 pb-16">
			<ProductDetailsTile />

			<ProductDetailsTabContainer />

			{/* Similar Product */}
			<SimilarProductList
				title="Similar Product"
				similarProducts={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]}
			/>

			{/* Categories */}
			<div className="mx-4 rounded bg-white">
				<CategorySubCategoriesSection catSubCat={AgriData} />
			</div>
		</div>
	);
}; // End of ProductDetailsPage

export default ProductDetailsPage;
