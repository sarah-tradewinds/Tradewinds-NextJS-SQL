import { useState } from 'react';
import {
	MdOutlineKeyboardArrowDown,
	MdOutlineKeyboardArrowUp
} from 'react-icons/md';
import Button from '../common/form/button';
import CompareProductTile from './compare-product-tile';

interface CompareProductListProps {
	products: any[];
}

const CompareProductList: React.FC<CompareProductListProps> = (
	props
) => {
	const { products } = props;

	const [isOpen, setIsOpen] = useState(false);

	let overlayClassName = `fixed bottom-0 left-0 right-0 z-[5000000000] bg-black/60 p-4 transform transition-all duration-500`;
	if (!isOpen) {
		overlayClassName = `${overlayClassName} translate-y-full`;
	}
	if (isOpen) {
		overlayClassName = `${overlayClassName} translate-y-0`;
	}

	return (
		<div className={overlayClassName}>
			<div className="relative">
				{/* Show and Hide compare container */}
				<div className="absolute -top-14 left-1/2 z-[5000000000] flex w-[245px] -translate-x-1/2 justify-center rounded-tr rounded-tl bg-black/60 text-white">
					<Button onClick={() => setIsOpen((prevState) => !prevState)}>
						{isOpen ? (
							<MdOutlineKeyboardArrowDown className="text-[24px] " />
						) : (
							<MdOutlineKeyboardArrowUp className="text-[24px] " />
						)}
					</Button>
				</div>

				{/* Compare product list */}
				<div className="flex items-center justify-between 2xl:py-2 2xl:px-16">
					<CompareProductTile
						imageUrl={products[0].imageUrl}
						minPrice={10}
						maxPrice={50}
						title="Lorem ipsum dolor sit amet, consectetuer adipiscing"
					/>
					<CompareProductTile
						imageUrl={products[0].imageUrl}
						minPrice={10}
						maxPrice={50}
						title="Lorem ipsum dolor sit amet, consectetuer adipiscing"
					/>
					<CompareProductTile
						imageUrl={products[0].imageUrl}
						minPrice={10}
						maxPrice={50}
						title="Lorem ipsum dolor sit amet, consectetuer adipiscing"
					/>

					{/* Show when we have less than 4 products */}
					<div className="overflow-hidden bg-black lg:h-[108px] lg:w-[180px] xl:h-[80px] xl:w-[240px] 2xl:h-[96px] 2xl:w-[250px]"></div>

					<div className="flex flex-col space-y-4">
						<Button className="w-[116px] border !px-2 font-normal">
							CLEAR ALL
						</Button>
						<Button
							variant="buyer"
							className="w-[116px] !px-2 font-normal"
						>
							COMPARE
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}; // End of CompareProductList component

export default CompareProductList;
