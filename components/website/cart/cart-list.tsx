// components
import CartItem from './cart-item';

// store
import { CartProduct } from 'store/cart-store';

interface CartListProps {
	carts: CartProduct[];
}

const CartList: React.FC<CartListProps> = (props) => {
	const { carts } = props;

	return (
		<div>
			{carts.map((cartProduct: any) => {
				const { id, images = [] } = cartProduct;

				return (
					<CartItem
						key={id}
						id={id}
						productName={cartProduct.product_name}
						productPrice={cartProduct.product_price}
						imageUrl={
							images[0] ? images[0].url : '/vehicles/green-tractor.png'
						}
						quantity={cartProduct.quantity}
					/>
				);
			})}
		</div>
	);
};

export default CartList;
