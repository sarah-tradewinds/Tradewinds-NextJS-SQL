import {
	GetServerSideProps,
	InferGetServerSidePropsType,
	NextPage
} from 'next';
import { useEffect, useState } from 'react';

// Third party packages
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// components
import ProductDetailsTile from 'components/product-details/product-details-tile';

import Button from 'components/common/form/button';
import SimilarProductList from 'components/product-details/similar-product-list';

// lib
import CompanyProfileTab from 'components/product-details/product-details-tab/company-profile-tab';
import ProductDetailsTabContainer from 'components/product-details/product-details-tab/product-details-tab-container';
import ProductReviewsDetailsTab from 'components/product-details/product-details-tab/product-reviews-details-tab';
import {
	BUYER_DASHBOARD_ACTIONS,
	BUYER_DASHBOARD_PAGES,
	generateBuyerDashboardUrl
} from 'data/buyer/buyer-actions';
import {
	getProductById,
	getProductReviewAnalyticsByProductId,
	getProductReviewsByProductId,
	getSellerDetailsBySellerId,
	getSimilarProducts,
	submitProductRatingAndReview
} from 'lib/product-details.lib';
import { useRouter } from 'next/router';
import { useAuthStore } from 'store/auth';
import { useCartStore } from 'store/cart-store-v2';
import { getDefaultProductAndProductVariants } from 'utils/common.util';
import { getLocaleText } from 'utils/get_locale_text';

const ProductDetailsPage: NextPage<
	InferGetServerSidePropsType<GetServerSideProps>
> = ({
	slug,
	product,
	productReviews = [],
	reviewAnalytics,
	seller = {},
	similarProducts = []
}) => {
	const router = useRouter();
	const { pathname, query } = router;

	const [productData, setProductData] = useState(product);
	const [productReviewList, setProductReviewList] =
		useState(productReviews);
	const [productReviewAnalytics, setProductReviewAnalytics] =
		useState(reviewAnalytics);
	const [isReviewLoading, setIsReviewLoading] = useState(false);
	const [selectedVariantId, setSelectedVariantId] = useState('');

	const { customerData, isAuth } = useAuthStore((state) => ({
		isAuth: state.isAuth,
		customerData: state.customerData
	}));

	const { addProductVariantToCart } = useCartStore((state) => ({
		addProductVariantToCart: state.addProductVariantToCart
	}));

	const { locale } = useRouter();

	useEffect(() => {
		setProductData(product);
	}, [slug]);

	useEffect(() => {
		if (selectedVariantId) {
			const updatedProductData = { ...productData };
			console.log('updatedProductData', updatedProductData);

			const productVariants =
				updatedProductData?.edges?.product_variants || [];

			if (productVariants?.length > 0) {
				const productVariant = productVariants?.find(
					(variant: any) => variant.id === selectedVariantId
				);
				if (!productVariant) {
					return;
				}

				updatedProductData.variant_id = productVariant?.id;
				updatedProductData.product_dimension =
					productVariant?.product_dimension || {};
				updatedProductData.name = productVariant?.name;
				updatedProductData.images = productVariant?.images || [];
				updatedProductData.product_price = productVariant?.retail_price;
				updatedProductData.inventory = productVariant?.inventory;
				updatedProductData.is_bulk_pricing =
					productVariant?.is_bulk_pricing || false;
				updatedProductData.bulk_pricing = productVariant?.bulk_pricing;
				console.log('updatedProductData', updatedProductData);
				setProductData(updatedProductData);
			}
		} else {
			const { defaultVariant } = getDefaultProductAndProductVariants(
				product?.edges?.product_variants || []
			);

			product.product_dimension = defaultVariant?.product_dimension;
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
			const productId = productData.id;
			const ratingAndReviewData = {
				rating,
				comments: review,
				product_id: productId,
				// order_id: '6287507801163604d44c74b6',
				// TODO: Have to ask is this required
				order_id: '',
				user_id: customerData.userId
			};

			await submitProductRatingAndReview(ratingAndReviewData, reviewId);
			const productReviews = await getProductReviewsByProductId(
				productData.id
			);
			const updatedProductReviewAnalytics =
				await getProductReviewAnalyticsByProductId(productData.id);

			setProductReviewList(productReviews);
			setProductReviewAnalytics(updatedProductReviewAnalytics);
			setIsReviewLoading(false);
		} catch (error) {
			setIsReviewLoading(false);
		}
	}; // End of submitReviewHandler function

	return (
		<div className="pb-16 md:container md:space-y-8">
			<ProductDetailsTile
				product={productData}
				onVariantClick={(variantId) => {
					console.log(
						'[setSelectedVariantId] = [setSelectedVariantId]',
						variantId
					);
					setSelectedVariantId(variantId);
				}}
				selectedVariantId={selectedVariantId}
				totalReviewCount={productReviewList.length}
				onAddToCart={async () => {
					const { defaultVariant } =
						getDefaultProductAndProductVariants(
							productData?.edges?.product_variants || []
						);
					console.log(
						'productDataproductDataproductData =',
						productData
					);
					addProductVariantToCart(defaultVariant.id, productData);
				}}
			/>

			{/* Tabs */}
			<div className="md:-ml-[33px]">
				<ProductDetailsTabContainer
					product={productData}
					reviews={productReviewList || []}
					reviewAnalytics={productReviewAnalytics || {}}
					seller={seller}
					onReviewSubmit={submitReviewHandler}
					isReviewLoading={isReviewLoading}
				/>

				<div className="bg-white md:hidden">
					<ProductReviewsDetailsTab
						reviews={productReviewList}
						reviewAnalytics={productReviewAnalytics || {}}
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
				<div className="lg:h-[334.09px]s hidden md:block">
					<SimilarProductList
						title="Similar Product"
						similarProducts={similarProducts || []}
						className="px-8"
					/>
				</div>
			)}

			{/* Fixed container for small screen only */}
			<div className="flexs fixed left-0 right-0 bottom-0 z-[2000] hidden justify-around bg-primary-main py-6 md:hidden">
				<Button
					variant="special"
					href={generateBuyerDashboardUrl({
						redirect_to: BUYER_DASHBOARD_PAGES.buyer_rfq,
						action: BUYER_DASHBOARD_ACTIONS.create_rfq,
						access_key: customerData.access.token,
						refresh_key: customerData.refresh.token
					})}
					className="rounded-full px-4 !text-[15px]"
				>
					Submit RFQ
				</Button>
				<Button
					variant="product"
					href={generateBuyerDashboardUrl({
						redirect_to: BUYER_DASHBOARD_PAGES.buyer_rfq,
						action: BUYER_DASHBOARD_ACTIONS.create_rfq,
						access_key: customerData.access.token,
						refresh_key: customerData.refresh.token
					})}
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
		// const productReviews =
		// 	(await getProductReviewsByProductId(productId)) || [];
		// const reviewAnalytics =
		// 	(await getProductReviewAnalyticsByProductId(productId)) || {};

		// // Fetch seller company Data
		const sellerId = product?.seller_id || '';
		const seller = (await getSellerDetailsBySellerId(sellerId)) || {};
		seller.id = sellerId;

		const similarProducts = (await getSimilarProducts(productId)) || [];

		const seo = product.product_seo || {};
		const productName = product?.name?.en;

		return {
			props: {
				product,
				productname: productName,
				// productReviews,
				// reviewAnalytics,
				seller,
				similarProducts,
				slug: productId,
				seo: seo,

				// seo: {
				// 	title: getLocaleText(seo?.title || {}),
				// 	description: getLocaleText(seo?.description || {})
				// },
				...(await serverSideTranslations(locale || 'en'))
			}
		};
	} catch (error) {
		console.log('Error occurred', error);
		return notFound;
	}
}; //End og getServerSideProps

export default ProductDetailsPage;
