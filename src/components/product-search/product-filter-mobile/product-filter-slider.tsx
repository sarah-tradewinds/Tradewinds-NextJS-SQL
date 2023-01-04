import Button from 'components/common/form/button';

interface ProductFilterSliderProps {
	isOpen?: boolean;
	onClose?: () => void;
}

const ProductFilterSlider: React.FC<ProductFilterSliderProps> = (
	props
) => {
	const { isOpen, onClose } = props;

	let containerClassName =
		'fixed bottom-[80px] top-[98px] z-40 w-[211px] overflow-y-auto rounded-tr-md rounded-br-md bg-white py-4 pl-2 pr-4 pb-40 shadow-xl transition-all duration-300';

	if (isOpen) {
		containerClassName += ' translate-x-0';
	} else {
		containerClassName += ' -translate-x-full';
	}

	return (
		<div className={containerClassName}>
			{/* Categories */}
			<div>
				<p className="text-[13.27px] font-semibold">Catagories</p>
				<div className="h-[99.53px] overflow-auto rounded-md border-2 border-accent-primary-main p-4">
					{/* main Categories */}
					<div className="text-[]">
						<p>Agriculture Equipment</p>
						{/* category */}
						<div>
							<p>Agricultural Waste</p>
							<p>Animal Products</p>
							<p>Beans</p>
							<p>Fresh Fruit</p>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-6 space-y-4">
				{/* Customizable - checkbox */}
				<label className="flex items-center justify-between">
					<p className="text-[13.27px] font-semibold">Customizable</p>
					<input
						type="checkbox"
						className="h-5 w-5"
						onChange={() => {}}
					/>
				</label>
				{/* Live Buy/ Ready to ship - checkbox */}
				<label className="flex items-center justify-between">
					<p className="text-[13.27px] font-semibold">
						Live Buy/ Ready to ship
					</p>
					<input
						type="checkbox"
						className="h-5 w-5"
						onChange={() => {}}
					/>
				</label>

				{/* Min order */}
				<div className="text-[13.27px] font-semibold">
					<p>Min. Order</p>
					<p className="flex h-7 items-center justify-center rounded-md border-2 border-accent-primary-main p-4">
						0 - 10
					</p>
				</div>
				{/* Min Price */}
				<div className="text-[13.27px] font-semibold">
					<p className="text-[13.27px] font-semibold">Min. Price</p>
					<p className="flex h-7 items-center justify-center rounded-md border-2  border-accent-primary-main p-4">
						$0 - $10 USD
					</p>
				</div>
				{/* Supplier Country / Region */}
				<div className="text-[13.27px] font-semibold">
					<p className="text-[13.27px] font-semibold">
						Supplier Country / Region
					</p>
					<p className="flex h-7 items-center justify-center rounded-md border-2  border-accent-primary-main p-4">
						Uruguay
					</p>
				</div>
			</div>

			{/* actions */}
			<div className="mt-6 space-y-2">
				<Button
					variant="buyer"
					className="!w-full !text-[13.27px]"
					onClick={onClose}
				>
					Search
				</Button>
				<Button className="!w-full !text-[13.27px] !font-normal !text-accent-primary-main">
					Reset Filters
				</Button>
			</div>
		</div>
	);
}; // End of ProductFilterSlider

export default ProductFilterSlider;
