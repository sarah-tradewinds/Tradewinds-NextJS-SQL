import {
	GetServerSideProps,
	InferGetServerSidePropsType,
	NextPage
} from 'next';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Third party packages
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useSWR from 'swr';

// components
import Button from 'components/common/form/button';
import ProductDetailsTile from 'components/product-details/product-details-tile';

const ProductDetailsTabContainer = dynamic(
	() =>
		import(
			'components/product-details/product-details-tab/product-details-tab-container'
		)
);

const ProductReviewsDetailsTab = dynamic(
	() =>
		import(
			'components/product-details/product-details-tab/product-reviews-details-tab'
		)
);
const CompanyProfileTab = dynamic(
	() =>
		import(
			'components/product-details/product-details-tab/company-profile-tab'
		)
);
const SimilarProductList = dynamic(
	() => import('components/product-details/similar-product-list')
);

// lib
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
import useNoLiveBuyPopupStore from 'store/no-live-buy-popup-store';
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
	const { t } = useTranslation();
	const router = useRouter();
	const { push } = router;

	const [productData, setProductData] = useState(product);

	const { data: productReviewList = [], mutate: mutateReviews } =
		useSWR(`/product/reviews/${productData?.id}`, () =>
			getProductReviewsByProductId(productData?.id || '')
		);

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

	const { setIsNoLiveBuyPopupOpen } = useNoLiveBuyPopupStore();

	const { locale } = useRouter();

	useEffect(() => {
		setProductData(product);
	}, [slug]);

	useEffect(() => {
		const {
			main_categories,
			categories,
			sub_categories,
			specific_categories
		} = product?.edges || {};
		push(
			{
				pathname: `/product/${product?.id}`,
				query: {
					main_category: `${main_categories?.id || ''}_${
						main_categories?.title?.en || ''
					}`,
					category: `${categories?.id || ''}_${
						categories?.title?.en || ''
					}`,
					sub_category: `${sub_categories?.id || ''}_${
						sub_categories?.title?.en || ''
					}`,
					sub_sub_category: `${specific_categories?.id || ''}_${
						specific_categories?.title?.en || ''
					}`
				}
			},
			undefined,
			{
				shallow: true
			}
		);
	}, [selectedVariantId]);

	useEffect(() => {
		if (selectedVariantId) {
			const updatedProductData = { ...productData };
			console.log('[updatedProductData]', {
				updatedProductData,
				selectedVariantId
			});

			const productVariants =
				updatedProductData?.edges?.product_variants || [];

			if (productVariants?.length > 0) {
				const productVariant = productVariants?.find(
					(variant: any) => variant.id === selectedVariantId
				);
				if (!productVariant) {
					return;
				}

				console.log('[productVariant]-[productVariant] =', {
					productVariant,
					selectedVariantId
				});

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
				product_id: productId
			};

			await submitProductRatingAndReview(ratingAndReviewData);
			const productReviews = await getProductReviewsByProductId(
				productData.id
			);
			const updatedProductReviewAnalytics =
				await getProductReviewAnalyticsByProductId(productData.id);

			mutateReviews(productReviews);
			setProductReviewAnalytics(updatedProductReviewAnalytics);
			setIsReviewLoading(false);
		} catch (error) {
			setIsReviewLoading(false);
		}
	}; // End of submitReviewHandler function

	return (
		<div className="lg::space-y-[51px] pb-16 md:space-y-[18px] lg:container desktop:w-[1512px] desktop:space-y-[32px]">
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
				totalReviewCount={productReviewList?.length}
				hideCartButton={!product.is_live_buy}
				onAddToCart={async () => {
					if (!productData?.is_live_buy) {
						setIsNoLiveBuyPopupOpen(true);
						return;
					}
					const { defaultVariant } =
						getDefaultProductAndProductVariants(
							productData?.edges?.product_variants || []
						);
					addProductVariantToCart(
						selectedVariantId || defaultVariant.id,
						productData
					);
				}}
			/>

			{/* Tabs */}
			<div className="tablet:-ml-[33px]s">
				<ProductDetailsTabContainer
					product={productData}
					reviews={productReviewList || []}
					reviewAnalytics={productReviewAnalytics || {}}
					seller={seller}
					onReviewSubmit={submitReviewHandler}
					isReviewLoading={isReviewLoading}
				/>

				{/* For Mobile screen only */}
				<div className="bg-white tablet:hidden">
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
				<div className="hidden md:mx-[8.6px] md:block desktop:mx-[24px]">
					<SimilarProductList
						title={t('similar_product')}
						similarProducts={similarProducts || []}
						className="px-8"
					/>
				</div>
			)}

			{/* Fixed container for small screen only */}
			<div className="fixed left-0 right-0 bottom-0 z-[2000] hidden justify-around bg-primary-main py-6 tablet:hidden">
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
					{t('common:submit_rfq')}
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
					{t('message_seller')}
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

		const reviewAnalytics =
			(await getProductReviewAnalyticsByProductId(productId)) || {};

		// Fetch seller company Data
		const sellerId = product?.seller_id || '';
		const seller = (await getSellerDetailsBySellerId(sellerId)) || {};
		seller.id = sellerId;

		const similarProducts = (await getSimilarProducts(productId)) || [];

		const seo = product.product_seo || {};
		const productName = product?.name?.[locale || 'en'] || '';

		return {
			props: {
				product,
				productName,
				reviewAnalytics,
				seller,
				similarProducts,
				slug: productId,
				seo: seo,

				...(await serverSideTranslations(locale || 'en'))
			}
		};
	} catch (error) {
		console.log('Error occurred', error);
		return notFound;
	}
}; //End og getServerSideProps

export default ProductDetailsPage;
