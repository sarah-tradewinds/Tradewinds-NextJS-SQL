// components

// store
import { useRouter } from 'next/router';
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

	const { locale } = useRouter();

	return (
		<div className="grid grid-cols-1 gap-4">
			{carts?.map((cartProduct) => {
				const { product } = cartProduct;

				const {
					retail_price: product_price = 0,
					sales_price = 0,
					is_on_sale,
					is_bulk_pricing,
					bulk_pricing = []
				} = product || {};

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
					product?.edges?.product?.edges?.sellers?.edges?.country?.edges
						?.region_country?.[0] || {};

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
								price: product?.product_price,
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
						/>
					</div>
				);
			})}
		</div>
	);
};

export default CartList;
