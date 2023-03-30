import { addProductToCart, updateCart } from 'lib/cart.lib';
import {
	createConversation,
	sendMessageToSeller
} from 'lib/common.lib';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuthStore } from 'store/auth';
import { useCartStore } from 'store/cart-store';
import { getDefaultProductAndProductVariants } from 'utils/common.util';
import { getDisplayBulkPrice } from 'utils/get-bulk-price';
import { getLocaleText } from 'utils/get_locale_text';
import Button from '../common/form/button';
import ErrorPopup from '../common/popup/error-popup';
import MessageVendorPopup from '../common/popup/message-vendor.popup';
import ProductTile from './product-tile';
import MobileProductTile from './product-tile/mobile-product-tile';
import RFQCard from './rfq-card.components';

interface ProductListProps {
	products: any[];
	onCompareClick: (payload: any) => any;
}

const ProductList: React.FC<ProductListProps> = ({
	products,
	onCompareClick
}) => {
	const { locale } = useRouter();

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

	const { isAuth, setIsLoginOpen, customerData } = useAuthStore(
		(state) => ({
			isAuth: state.isAuth,
			setIsLoginOpen: state.setIsLoginOpen,
			customerData: state.customerData,
			autoLogin: state.autoLogin
		})
	);

	const [isMessageVendorPopupOpen, setIsMessageVendorPopupOpen] =
		useState(false);

	const [selectedSellerId, setSelectedSellerId] = useState('');
	const [minimumProductOrderQuantity, setMinimumProductOrderQuantity] =
		useState<number>(0);
	const [selectedProduct, setSelectedProduct] = useState<any>({});

	const addToCartDefaultProductVariantHandler = async (
		product: any
	) => {
		const { defaultVariant } = getDefaultProductAndProductVariants(
			product?.edges?.product_variants || []
		);
		const productVariantId = defaultVariant?.id;
		await addToCart(productVariantId, 1, product);

		// Sending request when buyer Id is available
		if (!totalCartProductQuantity) {
			const minimumOrderQuantity =
				product?.inventory?.minimum_order_quantity || 0;
			console.log(product);

			// Taking first variant, because first variant is always created for main product.
			if (isAuth) {
				const cartId = await addProductToCart(
					productVariantId,
					minimumOrderQuantity || 1
				);
				setCartId(cartId);
			}
		} else {
			updateCart(
				cartProducts.map((cartProduct) => ({
					product_variant_id: productVariantId,
					quantity: cartProduct.quantity
				}))
			);
		}
	}; // End of addToCartDefaultProductVariantHandler

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
						selectedSellerId
					);
					if (!conversationId) {
						return;
					}

					await sendMessageToSeller(conversationId, message);
					setIsMessageVendorPopupOpen(false);

					setSelectedSellerId('');
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

			<div className="grid grid-cols-1 gap-y-1 md:gap-y-[15px] lg:gap-[27px]">
				{products.map((product, index) => {
					// const [firstVariantData = {}] =
					//   product?.edges?.product_variants || [];

					const { defaultVariant, totalVariantCount } =
						getDefaultProductAndProductVariants(
							product?.edges?.product_variants || []
						);

					const {
						// product_price,
						// is_bulk_pricing,
						// bulk_pricing = [],
						country_of_region = [],
						seller_country = []
					} = product || {};

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

					const country = seller_country ? seller_country[0] || {} : {};

					const productData = {
						key: product.id,
						name: getLocaleText(product.name || {}, locale),
						slug: product?.id,
						description: getLocaleText(product.description, locale),
						imageUrl: defaultVariant?.images?.[0],
						countryOfOrigin: country_of_region
							? country_of_region[0]
							: '',
						country: {
							name: getLocaleText(country?.name || '', locale),
							imageUrl: country?.url || '/coming-soon.png'
						},
						isEco: product.is_eco,
						keywords: product.tags || [],
						productPrice: product_price,
						salePrice: sales_price,
						isSaleOn: is_on_sale || 0,
						isBulkPricing: is_bulk_pricing,
						displayPrice: displayPrice,
						alt: product.alt || product.name,
						minOrderQuantity: inventory?.minimum_order_quantity || 0,
						totalReviewCount: product.total_review_count || 0,
						totalRateCount: product.total_rate_count || 0,
						onCompareClick: () => onCompareClick(product),
						onCartClick: async () => {
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
						isVerified: product.is_verified,
						isLive: product.is_live,
						isReadyToShip: product.is_live,
						// isReadyToShip: product.is_ready_to_ship,
						isCustomizable: product.is_customizable,
						variantCount: totalVariantCount || 0,
						onMessageVendorClick: () => {
							setSelectedSellerId(product?.seller_id);
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

							<div className="w-full md:hidden">
								<MobileProductTile {...productData} />
							</div>

							<div className="hidden md:block">
								<ProductTile {...productData} />
							</div>
						</>
					);
				})}
			</div>
		</>
	);
}; // End of ProductList component

export default ProductList;
