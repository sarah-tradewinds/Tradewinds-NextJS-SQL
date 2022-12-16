import { addProductToCart, updateCart } from 'lib/cart.lib';
import { sendMessageToSeller } from 'lib/common.lib';
import { getSellerStorefrontDetailsSellerId } from 'lib/product-details.lib';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuthStore } from 'store/auth';
import { useCartStore } from 'store/cart-store';
import { getDisplayBulkPrice } from 'utils/get-bulk-price';
import { getLocaleText } from 'utils/get_locale_text';
import Button from '../common/form/button';
import ErrorPopup from '../common/popup/error-popup';
import MessageVendorPopup from '../common/popup/message-vendor.popup';
import ProductTile from './product-tile';
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

	const addToCartHandler = async (product: any) => {
		const buyerId = customerData.buyerId;
		product.buyer_id = buyerId;
		const productId = product.id;
		await addToCart(productId, product);
		const minimumOrderQuantity =
			product?.inventory?.minimum_order_quantity || 0;

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
	}; // End of addToCartHandler

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

					const { user_id } = await getSellerStorefrontDetailsSellerId(
						selectedSellerId
					);

					await sendMessageToSeller({
						buyerEmail: customerData.tradewinds_email || '',
						sellerEmail: user_id?.trade_winds_email || '',
						message,
						subject: `Message from ${customerData.name}`
					});

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
								await addToCartHandler(selectedProduct);
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

			<div className="grid grid-cols-1 gap-4 md:gap-5">
				{products.map((product, index) => {
					const {
						product_price,
						is_bulk_pricing,
						bulk_pricing = [],
						country_of_region = []
					} = product || {};

					const displayPrice = getDisplayBulkPrice({
						product_price,
						is_bulk_pricing,
						bulk_pricing
					});

					return (
						<>
							<ProductTile
								key={product.id}
								name={getLocaleText(product.product_name || {}, locale)}
								slug={product?.id}
								description={getLocaleText(
									product.product_description,
									locale
								)}
								imageUrl={product.images[0]?.url}
								countryOfOrigin={
									country_of_region ? country_of_region[0] : ''
								}
								isEco={product.is_eco}
								keywords={product.tags || []}
								productPrice={product_price}
								salePrice={product?.sale_price}
								isSaleOn={product?.is_on_sale || 0}
								isBulkPricing={product?.is_bulk_pricing}
								displayPrice={displayPrice}
								alt={product.alt || product.name}
								minOrderQuantity={
									product?.inventory?.minimum_order_quantity || 0
								}
								totalReviewCount={product.totalReviewCount}
								onCompareClick={() => onCompareClick(product)}
								onCartClick={async () => {
									const minimumOrderQuantity =
										product?.inventory?.minimum_order_quantity || 0;

									if (minimumOrderQuantity > 0) {
										setMinimumProductOrderQuantity(
											+minimumOrderQuantity
										);
										setSelectedProduct(product);
									} else {
										await addToCartHandler(product);
										setMinimumProductOrderQuantity(0);
										setSelectedProduct({});
									}
								}}
								isInCompareList={product.isInCompareList}
								isVerified={product.is_verified}
								isLive={product.is_live}
								isReadyToShip={product.is_live}
								// isReadyToShip={product.is_ready_to_ship}
								isCustomizable={product.is_customizable}
								variantCount={product?.variants?.length || 0}
								onMessageVendorClick={() => {
									setSelectedSellerId(product?.seller_id?.id);
									setIsMessageVendorPopupOpen(true);
								}}
							/>

							{index === 3 && (
								<div className="hidden md:block">
									<RFQCard size="sm" />
								</div>
							)}
						</>
					);
				})}
			</div>
		</>
	);
}; // End of ProductList component

export default ProductList;
