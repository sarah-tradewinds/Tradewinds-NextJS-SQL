// components
import CartItem from './cart-item';

// store
import { CartProduct } from 'store/cart-store';

interface CartListProps {
	carts: CartProduct[];
	updateQuantityByProductId: (
		quantity: number,
		productId: string
	) => any;
	removeProductByIdFromCart: (productId: string) => any;
}

const CartList: React.FC<CartListProps> = (props) => {
	const {
		carts,
		updateQuantityByProductId,
		removeProductByIdFromCart
	} = props;

	return (
		<div className="grid grid-cols-1 gap-4">
			{carts.map((cartProduct: any) => {
				const { id, images = [] } = cartProduct;

				return (
					<div key={id} className="border-b-gray/40 pb-4 odd:border-b">
						<CartItem
							id={id}
							productName={'Product name'}
							productPrice={cartProduct.product_price || 100}
							imageUrl={
								images[0]
									? images[0].url
									: '/vehicles/green-tractor.png'
							}
							quantity={cartProduct.quantity}
							displayPrice=""
							minOrderQuantity={10}
							totalReviewCount={10}
							description="product desciption  adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat"
							onUpdate={updateQuantityByProductId}
							onRemove={() => removeProductByIdFromCart(id)}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default CartList;
