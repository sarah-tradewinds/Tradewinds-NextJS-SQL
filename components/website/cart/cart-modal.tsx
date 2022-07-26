// Third party packages
import { MdClose } from 'react-icons/md';

// components
import Button from 'components/website/common/form/button';

// stores
import { useCartStore } from 'store/cart-store';

interface CartModalProps {
	isOpen?: boolean;
	onClose?: () => any;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
	const { totalCartCount, carts } = useCartStore();

	let cartModalClassName = `fixed right-0 top-0 z-[8000000000000] h-screen w-[480px] bg-white transform transition-all delay-100`;
	if (!isOpen) {
		cartModalClassName = `${cartModalClassName} translate-x-[580px]`;
	}

	if (isOpen) {
		cartModalClassName = `${cartModalClassName} translate-x-0`;
	}

	return (
		<>
			{/* Overlay */}
			{isOpen && (
				<div
					onClick={onClose}
					className="fixed inset-0 z-[8000000000000] cursor-pointer bg-gray/80"
				></div>
			)}

			<div className={cartModalClassName}>
				<div className="flex justify-end pt-4">
					<Button className="text-black" onClick={onClose}>
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
				{/* <CartList carts={carts} /> */}
			</div>
		</>
	);
};

export default CartModal;
