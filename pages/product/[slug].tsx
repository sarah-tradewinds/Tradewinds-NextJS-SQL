import {
	GetServerSideProps,
	InferGetServerSidePropsType,
	NextPage
} from 'next';

// components
import ProductDetailsTile from 'components/website/product-details/product-details-tile';

// data
import Button from 'components/website/common/form/button';
import CompanyProfileTab from 'components/website/product-details/product-details-tab/company-profile-tab';
import ProductDetailsTab from 'components/website/product-details/product-details-tab/product-details-tab';
import ProductDetailsTabContainer from 'components/website/product-details/product-details-tab/product-details-tab-container';
import ProductReviewsDetailsTab from 'components/website/product-details/product-details-tab/product-reviews-details-tab';
import SimilarProductList from 'components/website/product-details/similar-product-list';
import {
	getProductById,
	getProductReviewsByProductId,
	getSellerDetailsSellerId
} from 'lib/product-details';
import { useEffect, useState } from 'react';

const ProductDetailsPage: NextPage<
	InferGetServerSidePropsType<GetServerSideProps>
> = ({ product, productReviews, seller }) => {
	const [productData, setProductData] = useState(product);
	const [selectedVariantId, setSelectedVariantId] = useState('');

	useEffect(() => {
		if (selectedVariantId) {
			const updatedProductData = { ...productData };
			if (!updatedProductData.has_variants) {
				updatedProductData.variants?.forEach((variant: any) => {
					updatedProductData.product_name = variant.variants_option;
					// updatedProductData.images = variant.variants_images;
					updatedProductData.product_price = variant.variants_price;
					updatedProductData.inventory = variant.inventory;

					updatedProductData.is_bulk_pricing =
						variant.is_bulk_pricing || true;
					updatedProductData.bulk_pricing = variant.bulk_pricing;
				});
				setProductData(updatedProductData);
			}
		} else {
			setProductData(product);
		}
	}, [selectedVariantId]);

	return (
		<div className="pb-16 md:space-y-8">
			<ProductDetailsTile
				product={productData}
				onVariantClick={setSelectedVariantId}
				selectedVariantId={selectedVariantId}
			/>
			<div>
				<ProductDetailsTabContainer
					className="hidden md:block"
					product={productData}
					reviews={productReviews}
					seller={seller}
				/>

				<div className="bg-white md:hidden">
					<ProductDetailsTab
						productDetailItem={productData.product_detail_item}
						shipping={productData.shipping}
					/>
					<ProductReviewsDetailsTab
						reviews={productReviews}
						productId={productData?.id}
						orderId={'6287507801163604d44c74b6'}
					/>
					<CompanyProfileTab seller={seller} />
				</div>
			</div>
			{/* Similar Product */}
			<div className="hidden md:block">
				<SimilarProductList
					title="Similar Product"
					similarProducts={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]}
					className="px-8"
				/>
			</div>
			{/* Categories */}
			<div className="mx-4 rounded bg-white">
				{/* <CategorySubCategoriesSection
					catSubCat={{
						...beauty,
						category: {
							...beauty.category,
							id: '1',
							title: 'Deals of the Month',
							slug: { en: '/' },
							image: { url: '/logo.png' }
						}
					}}
				/> */}
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

export const getServerSideProps: GetServerSideProps = async ({
	params
}) => {
	const notFound = {
		props: {},
		notFound: true
	};
	try {
		const productId = (params as any).slug;
		// '628f6b4885f3bc541ff3ab6d' || (params as any).slug;
		const product = (await getProductById(productId)) || {};

		if (!product) {
			return notFound;
		}

		// Fetch product reviews
		const productReviews =
			(await getProductReviewsByProductId(productId)) || [];

		// const productReviews: any[] = [];

		// Fetch seller company Data
		const seller =
			(await getSellerDetailsSellerId(
				// product.seller_id
				'6290d6eb0eb8951e0540d641' || product.seller_id
			)) || {};

		return {
			props: {
				product,
				productReviews,
				seller
			}
		};
	} catch (error) {
		return notFound;
	}
}; //End og getServerSideProps

export default ProductDetailsPage;
