import CartList from 'components/website/cart/cart-list';
import Button from 'components/website/common/form/button';
import { NextPage } from 'next';
import Image from 'next/image';
import { MdClose } from 'react-icons/md';

// store
import { useCartStore } from 'store/cart-store';

const CartPage: NextPage = () => {
	const { totalCartCount, carts } = useCartStore();

	return (
		<div className="">
			<h1>Cart page</h1>

			<div className="fixed right-0 top-0 z-[8000000000000] h-screen w-[480px] bg-white">
				<div className="flex justify-end pt-4">
					<Button className="text-black">
						<MdClose size={40} />
					</Button>
				</div>

				<h4 className="px-4 pt-8 text-[32px] font-semibold">
					{totalCartCount === 0 ? (
						<span className="block text-center">
							{' '}
							Your cart is Empty
						</span>
					) : (
						<span> Shopping Cart</span>
					)}
				</h4>

				{/* Cart product list */}
				<CartList carts={carts} />
			</div>

			<div className="p-8">
				{carts.map((cartProduct: any) => {
					const { images = [] } = cartProduct;

					return (
						<div
							key={cartProduct.id}
							className="flex items-center space-x-4 rounded-md bg-white p-4 shadow-md"
						>
							<div className="relative h-[80px] w-[80px]">
								<Image
									src={
										images[0]
											? images[0].url
											: '/vehicles/green-tractor.png'
									}
									alt={cartProduct.product_name}
									layout="fill"
								/>
							</div>

							<div className="flex w-full justify-between">
								{/* Product name and properties */}
								<div>
									<p className="font-semibold text-gray/80">
										{cartProduct.product_name}
									</p>
									<p>Size: </p>
								</div>

								{/* Product quantity action */}
								<div className="flex">
									<button className="h-[40px] w-[40px] rounded-full bg-gray text-black">
										+
									</button>
									<span>{cartProduct.quantity}</span>
									<button className="h-[40px] w-[40px] rounded-full bg-gray text-black">
										-
									</button>
								</div>

								{/* Price and quantity */}
								<div>
									<p className="font-bold">
										${cartProduct.product_price}
									</p>
									<p className="text-gray/80">
										Quantity: {cartProduct.quantity}
									</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default CartPage;
