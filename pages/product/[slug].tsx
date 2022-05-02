import { NextPage } from 'next';

// components
import ProductDetailsTile from 'components/website/product-details/product-details-tile';

// data
import Button from 'components/website/common/form/button';
import CompanyProfileTab from 'components/website/product-details/product-details-tab/company-profile-tab';
import ProductDetailsTab from 'components/website/product-details/product-details-tab/product-details-tab';
import ProductDetailsTabContainer from 'components/website/product-details/product-details-tab/product-details-tab-container';
import ProductReviewsDetailsTab from 'components/website/product-details/product-details-tab/product-reviews-details-tab';
import SimilarProductList from 'components/website/product-details/similar-product-list';

const ProductDetailsPage: NextPage = (props) => {
	return (
		<div className="pb-16 md:space-y-8">
			<ProductDetailsTile />

			<div>
				<ProductDetailsTabContainer className="hidden md:block" />

				<div className="bg-white md:hidden">
					<ProductDetailsTab />
					<ProductReviewsDetailsTab />
					<CompanyProfileTab />
				</div>
			</div>

			{/* Similar Product */}
			<div className="hidden md:block">
				<SimilarProductList
					title="Similar Product"
					similarProducts={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]}
				/>
			</div>

			{/* Categories */}
			<div className="mx-4 rounded bg-white">
				{/* <CategorySubCategoriesSection catSubCat={AgriData} /> */}
			</div>

			{/* Fixed container for small screen only */}
			<div className="fixed left-0 right-0 bottom-0 z-[2000] flex justify-around bg-primary-main py-6 md:hidden">
				<Button
					variant="special"
					className="rounded-full px-4 !text-[15px]"
				>
					Submit RFQ
				</Button>
				<Button
					variant="product"
					className="rounded-full px-4 !text-[15px]"
				>
					Message Seller
				</Button>
			</div>
		</div>
	);
}; // End of ProductDetailsPage

export default ProductDetailsPage;
