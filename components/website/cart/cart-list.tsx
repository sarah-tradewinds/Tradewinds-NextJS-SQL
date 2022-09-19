// components
import CartItem from './cart-item';

// store
import { useRouter } from 'next/router';
import { CartProduct } from 'store/cart-store';
import { getLocaleText } from 'utils/get_locale_text';
import { getProductPrice } from 'utils/pricing.utils';

interface CartListProps {
	carts: CartProduct[];
	updateQuantityByProductId: (
		quantity: number,
		productId: string,
		payload?: any
	) => any;
	removeProductByIdFromCart: (productId: string) => any;
}

const CartList: React.FC<CartListProps> = (props) => {
	const {
		carts,
		updateQuantityByProductId,
		removeProductByIdFromCart
	} = props;

	const { locale } = useRouter();

	return (
		<div className="grid grid-cols-1 gap-4">
			{carts?.map((cartProduct: any) => {
				const { id, product } = cartProduct;

				return (
					<div key={id} className="border-b-gray/40 pb-4 odd:border-b">
						<CartItem
							id={product.id}
							slug={product.id}
							productName={getLocaleText(
								product.product_name || {},
								locale
							)}
							description={getLocaleText(
								product.product_description || {},
								locale
							)}
							productPrice={getProductPrice({
								bulkPrices:
									product?.bulk_pricing?.length < 1
										? undefined
										: product?.bulk_pricing,
								salePrice: product?.sale_price,
								price: product?.product_price,
								quantity: cartProduct?.quantity
							})}
							imageUrl={product?.images[0] ? product.images[0].url : ''}
							quantity={cartProduct.quantity}
							total={cartProduct.total}
							displayPrice=""
							minOrderQuantity={
								product?.inventory?.minimum_order_quantity
							}
							totalReviewCount={10}
							onUpdate={(quantity, productId) =>
								updateQuantityByProductId(
									quantity,
									productId,
									cartProduct
								)
							}
							onRemove={() => removeProductByIdFromCart(product.id)}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default CartList;
