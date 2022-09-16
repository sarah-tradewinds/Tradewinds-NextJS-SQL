import {
	GetServerSideProps,
	InferGetServerSidePropsType,
	NextPage
} from 'next';
import { useEffect, useState } from 'react';

// Third party packages
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// components
import ProductDetailsTile from 'components/website/product-details/product-details-tile';

import Button from 'components/website/common/form/button';
import CompanyProfileTab from 'components/website/product-details/product-details-tab/company-profile-tab';
import ProductReviewsDetailsTab from 'components/website/product-details/product-details-tab/product-reviews-details-tab';
import SimilarProductList from 'components/website/product-details/similar-product-list';

// lib
import ProductDetailsTabContainer from 'components/website/product-details/product-details-tab/product-details-tab-container';
import {
	getProductById,
	getProductReviewsByProductId,
	getSellerDetailsBySellerId,
	getSimilarProducts,
	submitProductRatingAndReview
} from 'lib/product-details.lib';
import { useRouter } from 'next/router';
import { useAuthStore } from 'store/auth';
import { getLocaleText } from 'utils/get_locale_text';

const ProductDetailsPage: NextPage<
	InferGetServerSidePropsType<GetServerSideProps>
> = ({ slug, product, productReviews, seller, similarProducts }) => {
	const [productData, setProductData] = useState(product);
	const [productReviewList, setProductReviewList] =
		useState(productReviews);
	const [isReviewLoading, setIsReviewLoading] = useState(false);
	const [selectedVariantId, setSelectedVariantId] = useState('');

	const { customerData } = useAuthStore((state) => ({
		customerData: state.customerData
	}));

	const { locale } = useRouter();

	useEffect(() => {
		setProductData(product);
	}, [slug]);

	useEffect(() => {
		if (selectedVariantId) {
			const updatedProductData = { ...productData };
			if (!updatedProductData.has_variants) {
				updatedProductData.variants?.forEach((variant: any) => {
					updatedProductData.product_name = variant.variants_option;
					if (typeof variant.variants_option === 'string') {
						updatedProductData.product_name = {
							en: variant.variants_option
						};
					}
					updatedProductData.images = variant.variants_images;
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

	const submitReviewHandler = async (
		rating: number,
		review: string,
		reviewId?: string
	) => {
		try {
			setIsReviewLoading(true);
			const ratingAndReviewData = {
				rating,
				comments: review,
				product_id: productData.id,
				order_id: '6287507801163604d44c74b6',
				user_id: customerData.id
			};

			await submitProductRatingAndReview(ratingAndReviewData, reviewId);
			const productReviews = await getProductReviewsByProductId(
				productData.id
			);
			setProductReviewList(productReviews);
			setIsReviewLoading(false);
		} catch (error) {
			setIsReviewLoading(false);
		}
	}; // End of submitReviewHandler function

	return (
		<div className="container mx-auto pb-16 md:space-y-8">
			<ProductDetailsTile
				product={productData}
				onVariantClick={setSelectedVariantId}
				selectedVariantId={selectedVariantId}
				totalReviewCount={productReviewList.length}
			/>

			{/* Tabs */}
			<div>
				<ProductDetailsTabContainer
					className="hidden md:block"
					product={productData}
					reviews={productReviewList}
					seller={seller}
					onReviewSubmit={submitReviewHandler}
					isReviewLoading={isReviewLoading}
				/>

				<div className="bg-white md:hidden">
					<ProductReviewsDetailsTab
						reviews={productReviewList}
						onReviewSubmit={submitReviewHandler}
						isLoading={isReviewLoading}
						productName={getLocaleText(
							productData.product_name || {},
							locale
						)}
						productId={productData.id}
					/>
					<CompanyProfileTab seller={seller} />
				</div>
			</div>

			{/* Similar Product */}
			{similarProducts?.length > 0 && (
				<div className="hidden md:block">
					<SimilarProductList
						title="Similar Product"
						similarProducts={similarProducts}
						className="px-8"
					/>
				</div>
			)}

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
	params,
	locale
}) => {
	console.log('Product details getting called...');
	const notFound = {
		props: {},
		notFound: true
	};
	try {
		const productId = (params as any).slug;
		const product = (await getProductById(productId)) || {};

		if (!product || !product?.id) {
			return notFound;
		}

		// Fetch product reviews
		const productReviews =
			(await getProductReviewsByProductId(productId)) || [];

		// Fetch seller company Data
		const sellerId = product.seller_id.id;
		const seller = (await getSellerDetailsBySellerId(sellerId)) || {};
		seller.id = sellerId;

		const similarProducts = await getSimilarProducts(productId);

		const seo = product.seo;

		return {
			props: {
				product,
				productReviews,
				seller,
				similarProducts,
				slug: productId,
				seo: {
					title: getLocaleText(seo.title || {}),
					description: getLocaleText(seo.description || {})
				},
				...(await serverSideTranslations(locale || 'en'))
			}
		};
	} catch (error) {
		return notFound;
	}
}; //End og getServerSideProps

export default ProductDetailsPage;
