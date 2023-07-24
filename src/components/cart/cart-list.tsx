// components

// store
import MessageVendorPopup from 'components/common/popup/message-vendor.popup';
import {
	createConversation,
	sendMessageToSeller
} from 'lib/common.lib';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuthStore } from 'store/auth';
import { ICartItem } from 'store/cart-store-v2';
import { getDisplayBulkPrice } from 'utils/get-bulk-price';
import { getLocaleText } from 'utils/get_locale_text';
import { getProductPrice } from 'utils/pricing.utils';
import CartItem from './cart-item';

interface CartListProps {
	carts: ICartItem[];
	updateQuantityByProductVariantId: (
		productVariantId: string,
		quantity: number,
		payload?: any
	) => any;
	removeProductByProductVariantIdFromCart: (
		productVariantId: string
	) => any;
}

const CartList: React.FC<CartListProps> = (props) => {
	const {
		carts,
		updateQuantityByProductVariantId,
		removeProductByProductVariantIdFromCart
	} = props;

	const [isMessageVendorPopupOpen, setIsMessageVendorPopupOpen] =
		useState(false);
	const [selectedSellerUserId, setSelectedSellerUserId] = useState('');

	const { locale } = useRouter();

	const { isAuth, setIsLoginOpen, customerData } = useAuthStore(
		(state) => ({
			isAuth: state.isAuth,
			setIsLoginOpen: state.setIsLoginOpen,
			customerData: state.customerData,
			autoLogin: state.autoLogin
		})
	);

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

			<div className="grid grid-cols-1 gap-4">
				{carts?.map((cartProduct) => {
					const { product } = cartProduct;
					console.log('cartProductproduct', product);
					const addedProductVariant =
						product?.edges?.product_variants?.find(
							(productVariant: any) =>
								productVariant?.id === product?.variant_id
						) || product;

					const {
						retail_price: product_price = 0,
						sales_price = 0,
						is_on_sale,
						is_bulk_pricing,
						bulk_pricing = []
					} = addedProductVariant || {};

					const displayPrice = getDisplayBulkPrice({
						product_price,
						is_bulk_pricing,
						bulk_pricing
					});

					const productDescription = getLocaleText(
						product?.description || {},
						locale
					);

					const productVariantId = cartProduct.productVariantId;

					const sellerCountry =
						product?.edges?.product?.edges?.sellers?.edges?.country
							?.edges?.region_country?.[0] || {};

					return (
						<div
							key={productVariantId}
							className="border-b-gray/40 pb-4 odd:border-b"
						>
							<CartItem
								id={product.id}
								slug={product.id}
								productName={getLocaleText(product?.name || {}, locale)}
								description={
									productDescription?.length > 180
										? productDescription?.substring(0, 180) + ' ...'
										: productDescription
								}
								productPrice={getProductPrice({
									bulkPrices:
										product?.bulk_pricing?.length < 1
											? undefined
											: product?.bulk_pricing,
									salePrice: product?.sale_price,
									price: product_price,
									quantity: cartProduct?.quantity
								})}
								salePrice={sales_price}
								isSaleOn={is_on_sale}
								isBulkPricing={product?.is_bulk_pricing}
								imageUrl={product?.images?.[0]}
								countryName={
									getLocaleText(sellerCountry?.name || {}, locale) || ''
								}
								countryImageUrl={sellerCountry?.image || ''}
								quantity={cartProduct.quantity}
								total={cartProduct.total}
								displayPrice={displayPrice}
								minOrderQuantity={
									product?.inventory?.minimum_order_quantity
								}
								minOrderQuantityUnit={(
									product?.inventory?.minimum_order_quantity_unit || ''
								)?.toLowerCase()}
								totalReviewCount={product?.totalReviewCount || 0}
								variantCount={
									product?.edges?.product_variants?.length - 1 || 0
								}
								onUpdate={(quantity) => {
									console.log(
										'carrrrrrt',
										productVariantId,
										quantity,
										cartProduct
									);
									updateQuantityByProductVariantId(
										productVariantId,
										quantity,
										cartProduct
									);
								}}
								onRemove={() =>
									removeProductByProductVariantIdFromCart(
										productVariantId
									)
								}
								onMessageVendorClick={() => {
									console.log('product---product', product);
									setSelectedSellerUserId(
										product?.edges?.sellers?.edges?.user?.id
									);
									setIsMessageVendorPopupOpen(true);
								}}
							/>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default CartList;
