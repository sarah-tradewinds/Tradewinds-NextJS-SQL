// Third party packages
import { AiOutlineShoppingCart } from 'react-icons/ai';

interface CartIconProps {
	count: number;
	onClick?: () => any;
	iconClassName?: string;
}

const CartIcon: React.FC<CartIconProps> = ({
	count,
	onClick,
	iconClassName
}) => {
	return (
		<div
			onClick={onClick}
			className="relative flex cursor-pointer items-center justify-center"
		>
			<AiOutlineShoppingCart
				className={`text-[40px] text-white ${iconClassName}`}
			/>
			<span className="absolute -top-[14px] left-1/2 font-semibold text-white">
				{count}
			</span>
		</div>
	);
};

export default CartIcon;
