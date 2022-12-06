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
	BUYER_DASHBOARD_ACTIONS,
	BUYER_DASHBOARD_PAGES,
	generateBuyerDashboardUrl
} from 'data/buyer/buyer-actions';
import { addProductToCart, updateCart } from 'lib/cart.lib';
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
import { useCartStore } from 'store/cart-store';
import { getLocaleText } from 'utils/get_locale_text';

const ProductDetailsPage: NextPage<
	InferGetServerSidePropsType<GetServerSideProps>
> = ({
	slug,
	product,
	productReviews,
	reviewAnalytics,
	seller,
	similarProducts
}) => {
	const [productData, setProductData] = useState(product);
	const [productReviewList, setProductReviewList] =
		useState(productReviews);
	const [productReviewAnalytics, setProductReviewAnalytics] =
		useState(reviewAnalytics);
	const [isReviewLoading, setIsReviewLoading] = useState(false);
	const [selectedVariantId, setSelectedVariantId] = useState('');

	const customerData = useAuthStore((state) => state.customerData);

	const {
		cartId,
		addToCart,
		setCartId,
		totalCartProductQuantity,
		cartProducts
	} = useCartStore((state) => ({
		cartId: state.id,
		addToCart: state.addToCart,
		setCartId: state.setCartId,
		totalCartProductQuantity: state.totalCartProductQuantity,
		cartProducts: state.cartProducts
	}));

	const { locale } = useRouter();

	useEffect(() => {
		setProductData(product);
	}, [slug]);

	useEffect(() => {
		if (selectedVariantId) {
			const updatedProductData = { ...productData };

			if (updatedProductData.has_variants) {
				const productVariant = updatedProductData.variants?.find(
					(variant: any) => variant.variant_id === selectedVariantId
				);
				if (!productVariant) {
					return;
				}

				updatedProductData.variant_id = productVariant?.variant_id;
				updatedProductData.product_name =
					productVariant?.variants_option;
				updatedProductData.images = productVariant?.variants_images;
				updatedProductData.product_price =
					productVariant?.variants_price;
				updatedProductData.inventory = productVariant?.inventory;
				updatedProductData.is_bulk_pricing =
					productVariant?.is_bulk_pricing || true;
				updatedProductData.bulk_pricing = productVariant?.bulk_pricing;
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
			const productId = productData.id;
			const ratingAndReviewData = {
				rating,
				comments: review,
				product_id: productId,
				// order_id: '6287507801163604d44c74b6',
				// TODO: Have to ask is this required
				order_id: '',
				user_id: customerData.id
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
		<div className="container mx-auto pb-16 md:space-y-8">
			<ProductDetailsTile
				product={productData}
				onVariantClick={setSelectedVariantId}
				selectedVariantId={selectedVariantId}
				totalReviewCount={productReviewList.length}
				onAddToCart={async () => {
					const productId = productData.id;
					productData.variant_id = selectedVariantId;
					const buyerId = customerData.buyerId;
					productData.buyerId = buyerId;
					await addToCart(productId, productData);

					// Sending request when buyer Id is available
					if (!totalCartProductQuantity) {
						const minimumOrderQuantity =
							product?.inventory?.minimum_order_quantity || 0;

						const cartId = await addProductToCart(buyerId, {
							product_id: productId,
							variant_id: product?.variant_id,
							quantity: minimumOrderQuantity || 1
						});
						setCartId(cartId);
					} else {
						updateCart(
							cartId,
							buyerId,
							cartProducts.map((cartProduct) => ({
								product_id: cartProduct.product?.id,
								variant_id: cartProduct.product?.variant_id,
								quantity: cartProduct.quantity
							}))
						);
					}
				}}
			/>

			{/* Tabs */}
			<div>
				<ProductDetailsTabContainer
					className="hidden md:block"
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
		const productReviews =
			(await getProductReviewsByProductId(productId)) || [];
		const reviewAnalytics =
			(await getProductReviewAnalyticsByProductId(productId)) || {};

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
				reviewAnalytics,
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
