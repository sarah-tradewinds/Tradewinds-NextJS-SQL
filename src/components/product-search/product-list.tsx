import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState } from 'react';

// lib
import {
	createConversation,
	sendMessageToSeller
} from 'lib/common.lib';

// hooks
import useDeviceSize from 'hooks/use-device-size.hooks';

// store
import { useAuthStore } from 'store/auth';
import { useCartStore } from 'store/cart-store-v2';
import useNoLiveBuyPopupStore from 'store/no-live-buy-popup-store';

// utils
import {
	generateListByCount,
	getDefaultProductAndProductVariants
} from 'utils/common.util';
import { getDisplayBulkPrice } from 'utils/get-bulk-price';
import { getLocaleText } from 'utils/get_locale_text';

// components
import Button from '../common/form/button';

const ErrorPopup = dynamic(() => import('../common/popup/error-popup'));
const MessageVendorPopup = dynamic(
	() => import('../common/popup/message-vendor.popup')
);
const ProductTile = dynamic(() => import('./product-tile'));
const MobileProductTile = dynamic(
	() => import('./product-tile/mobile-product-tile')
);
const RFQCard = dynamic(() => import('./rfq-card.components'));
const SkeletonProductTile = dynamic(
	() => import('./skeleton-product-tile')
);

interface ProductListProps {
	isLoading?: boolean;
	products: any[];
	className?: string;
	onCompareClick: (payload: any) => any;
}

const ProductList: React.FC<ProductListProps> = ({
	isLoading,
	products,
	className,
	onCompareClick
}) => {
	const { locale, push } = useRouter();
	const { deviceWidth } = useDeviceSize();

	const { addProductVariantToCart } = useCartStore((state) => ({
		addProductVariantToCart: state.addProductVariantToCart
	}));

	const { isAuth, setIsLoginOpen } = useAuthStore((state) => ({
		isAuth: state.isAuth,
		setIsLoginOpen: state.setIsLoginOpen,
		autoLogin: state.autoLogin
	}));

	const [isMessageVendorPopupOpen, setIsMessageVendorPopupOpen] =
		useState(false);

	const [selectedSellerUserId, setSelectedSellerUserId] = useState('');
	const [minimumProductOrderQuantity, setMinimumProductOrderQuantity] =
		useState<number>(0);
	const [selectedProduct, setSelectedProduct] = useState<any>({});

	const { setIsNoLiveBuyPopupOpen } = useNoLiveBuyPopupStore();

	const addToCartDefaultProductVariantHandler = async (
		product: any
	) => {
		if (!product.is_live_buy) {
			setIsNoLiveBuyPopupOpen(true);
			return;
		}

		const { defaultVariant } = getDefaultProductAndProductVariants(
			product?.edges?.product_variants || []
		);
		const productVariantId = defaultVariant?.id;
		addProductVariantToCart(productVariantId, product);
	}; // End of addToCartDefaultProductVariantHandler

	if (isLoading) {
		return (
			<>
				{generateListByCount(
					5,
					undefined,
					undefined,
					<div className="mx-2 my-4">
						<SkeletonProductTile />
					</div>
				)}
			</>
		);
	}

	return (
		<>
			<MessageVendorPopup
				open={isMessageVendorPopupOpen}
				onClose={() => setIsMessageVendorPopupOpen(false)}
				onChange={() => {}}
				onSendClick={async (message) => {
					if (!isAuth) {
						setIsLoginOpen();
						return;
					}

					const conversationId = await createConversation(
						selectedSellerUserId
					);
					if (!conversationId) {
						return;
					}

					await sendMessageToSeller(conversationId, message);
					setIsMessageVendorPopupOpen(false);

					setSelectedSellerUserId('');
					setIsMessageVendorPopupOpen(false);
				}}
			/>

			{/* Minimum Quantity */}
			<ErrorPopup
				isOpen={minimumProductOrderQuantity >= 1}
				title={`You will add ${minimumProductOrderQuantity} product minimum`}
				titleClassName="!text-gray"
				description="This product have minimum quantity constraint"
				onClose={() => {}}
				actions={[
					<div key="action-button-container" className="space-x-4">
						<Button
							key="okay-button"
							variant="buyer"
							onClick={async () => {
								await addToCartDefaultProductVariantHandler(
									selectedProduct
								);
								setMinimumProductOrderQuantity(0);
								setSelectedProduct({});
							}}
						>
							Add to Cart
						</Button>
						<Button
							key="cancel-button"
							className="!text-error"
							onClick={() => setMinimumProductOrderQuantity(0)}
						>
							Cancel
						</Button>
					</div>
				]}
			/>

			<div
				className={`mx-[9px] grid grid-cols-1 gap-y-[14px] sm:mx-[10px] sm:mt-[19px] sm:gap-y-[20px] md:mx-0 md:mt-[10px] md:gap-y-[15px] xl:gap-[26px] ${className}`}
			>
				{products.map((product) => {
					const { defaultVariant } =
						getDefaultProductAndProductVariants(
							product?.edges?.product_variants || []
						);

					const sellerCountry =
						product?.edges?.sellers?.edges?.country?.edges
							?.region_country?.[0] || {};

					const {
						retail_price: product_price = 0,
						sales_price = 0,
						is_on_sale,
						is_bulk_pricing,
						bulk_pricing = [],
						inventory = {}
					} = defaultVariant || {};

					const displayPrice = getDisplayBulkPrice({
						product_price,
						is_bulk_pricing,
						bulk_pricing
					});

					const {
						main_categories,
						categories,
						sub_categories,
						specific_categories
					} = product?.edges || {};

					const hideCartButton = !product.is_live_buy;

					const navigateWithShallow = () => {
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
					}; // End of navigateWithShallow function

					const productData = {
						key: product.id,
						name: getLocaleText(product.name || {}, locale),
						slug: product?.id,
						description: getLocaleText(product.description, locale),
						imageUrl: defaultVariant?.images?.[0],
						country: {
							name: getLocaleText(sellerCountry?.name || '', locale),
							imageUrl: sellerCountry?.image || '/coming-soon.png'
						},
						isEco: product.is_eco,
						keywords: product.tags || [],
						productPrice: product_price,
						salePrice: sales_price,
						isSaleOn: is_on_sale || 0,
						isBulkPricing: is_bulk_pricing,
						displayPrice: displayPrice,
						alt: product.alt || product.name?.en,
						minOrderQuantity: inventory?.minimum_order_quantity || 0,
						minOrderQuantityUnit: (
							inventory?.minimum_order_quantity_unit || ''
						)?.toLowerCase(),
						totalReviewCount: product.total_review_count || 0,
						totalRateCount: product.total_rate_count || 0,
						hideCartButton,
						onCompareClick: () => onCompareClick(product),
						onCartClick: async () => {
							if (!product.is_live_buy) {
								setIsNoLiveBuyPopupOpen(true);
								return;
							}

							const minimumOrderQuantity =
								product?.inventory?.minimum_order_quantity || 0;

							if (minimumOrderQuantity > 0) {
								setMinimumProductOrderQuantity(+minimumOrderQuantity);
								setSelectedProduct(product);
							} else {
								await addToCartDefaultProductVariantHandler(product);
								setMinimumProductOrderQuantity(0);
								setSelectedProduct({});
							}
						},
						isInCompareList: product.isInCompareList,
						isLive: product.is_live,
						isLiveBuy: product?.is_live_buy,
						isReadyToShip: product.is_live_buy,
						isCustomizable: product.is_customizable,
						variantCount: product?.variant_count || 0,
						onMessageVendorClick: () => {
							setSelectedSellerUserId(
								product?.edges?.sellers?.edges?.user?.id
							);
							setIsMessageVendorPopupOpen(true);
						}
					};

					return (
						<>
							{products?.length <= 0 && (
								<div className="hidden md:block">
									<RFQCard size="sm" />
								</div>
							)}

							<div className="w-full sm:hidden">
								{deviceWidth < 640 && (
									<MobileProductTile
										{...productData}
										onClick={navigateWithShallow}
									/>
								)}
							</div>

							{deviceWidth >= 640 && (
								<ProductTile
									{...productData}
									onClick={navigateWithShallow}
								/>
							)}
						</>
					);
				})}
			</div>
		</>
	);
}; // End of ProductList component

export default ProductList;
