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
			<span
				className={`absolute -top-6 -right-2 flex h-[24px] w-[24px] items-center justify-center rounded-full bg-secondary font-semibold text-white md:h-[24px] md:w-[24px] md:text-xs lg:-top-6 ${countClassName}`}
			>
				{count}
			</span>
		</div>
	);
};

export default CartIcon;
