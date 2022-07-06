import Button from 'components/website/common/form/button';
import Image from 'next/image';
import { MdOutlineDeleteOutline } from 'react-icons/md';

// store

interface CartItemProps {
	id: string;
	productName: string;
	productPrice: number;
	imageUrl: string;
	quantity: number;
}

const CartItem: React.FC<CartItemProps> = (props) => {
	const { id, productName, productPrice, imageUrl, quantity } = props;

	return (
		<div className="m-4 flex items-center space-x-4 rounded-lg bg-bg-main/30 p-4">
			{/* Image */}
			<div className="relative h-[80px] w-[80px]">
				<Image
					src={imageUrl || '/vehicles/green-tractor.png'}
					alt={productName}
					layout="fill"
				/>
			</div>

			<div className="w-full">
				{/* Product name and properties */}
				<div>
					<p className="font-semibold">{productName}</p>
					<p>Size: </p>
				</div>

				<div className="flex items-center justify-between">
					{/* Product quantity action */}
					<div className="flex items-center justify-between rounded-full border-2 border-gray/40 py-1">
						<button className="px-4">-</button>
						<span>{quantity}</span>
						<button className="px-4">+</button>
					</div>

					{/* Price */}
					<p className="font-bold">${productPrice}</p>

					{/* Remove action */}
					<Button className="text-gray/80">
						<MdOutlineDeleteOutline size={32} />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
