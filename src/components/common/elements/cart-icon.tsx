// Third party packages
import { AiOutlineShoppingCart } from 'react-icons/ai';

interface CartIconProps {
	count: number;
	onClick?: () => any;
	iconClassName?: string;
	countClassName?: string;
}

const CartIcon: React.FC<CartIconProps> = ({
	count,
	onClick,
	iconClassName,
	countClassName
}) => {
	return (
		<div
			onClick={onClick}
			className="relative flex cursor-pointer items-center justify-center"
		>
			<AiOutlineShoppingCart
				className={`text-[40px] text-white ${iconClassName}`}
			/>
			<div
				className={`absolute -top-6 -right-2 flex h-[20px] w-[20px] items-center justify-center rounded-full bg-secondary text-center align-middle text-sm font-semibold text-white md:h-[24px] md:w-[24px] md:text-xs lg:-top-6 ${countClassName}`}
			>
				<span>({count})</span>
			</div>
		</div>
	);
};

export default CartIcon;
