const ProductDetailsTab: React.FC = (props) => {
	return (
		<div className="space-y-16 bg-white p-8">
			<div>
				<p className="border-b-2 border-gray/40 text-[21px] font-semibold text-gray">
					PRODUCT DETAILS
				</p>
				<div className="flex justify-between p-4">
					<div className="space-y-2">
						<p className="flex justify-between  space-x-8 text-[18px] text-gray">
							<span className="font-semibold">Model Number:</span>
							<span>XXXXXXX</span>
						</p>
						<p className="flex justify-between  space-x-8 text-[18px] text-gray">
							<span className="font-semibold">SKU:</span>
							<span>XXXXXXX</span>
						</p>
						<p className="flex justify-between  space-x-8 text-[18px] text-gray">
							<span className="font-semibold">Place of Origin:</span>
							<span>XXXXXXX</span>
						</p>
						<p className="flex justify-between space-x-8 text-[18px]  text-gray">
							<span className="font-semibold">Ready to ship:</span>
							<span>Yes/ No</span>
						</p>
						<p className="flex justify-between space-x-8 text-[18px]  text-gray">
							<span className="font-semibold">Lead time:</span>
							<span>XXXXXXX</span>
						</p>
						<p className="flex justify-between space-x-8 text-[18px]  text-gray">
							<span className="font-semibold">MOQ:</span>
							<span>XXXXXXX</span>
						</p>
					</div>
					<div className="space-y-2">
						<p className="flex justify-between  space-x-8 text-[18px] text-gray">
							<span className="font-semibold">CERTIFICATION:</span>
							<span> CE / EU</span>
						</p>
						<p className="flex justify-between  space-x-8 text-[18px] text-gray">
							<span className="font-semibold">Variants:</span>
							<div>
								<span>Variants 1</span>
								<span>Variants 2</span>
								<span>Variants 3</span>
							</div>
						</p>
					</div>
				</div>
			</div>

			{/* SUPPLY ABILITY */}
			<div>
				<p className="border-b-2 border-gray/40 text-[21px] font-semibold text-gray">
					SUPPLY ABILITY
				</p>
				<div className="flex justify-between p-4">
					<div className="space-y-2">
						<p className="flex justify-between space-x-8 text-[18px]  text-gray">
							<span className="font-semibold">DRINKWARE TYPE:</span>
							<span>Water Bottles</span>
						</p>
					</div>
				</div>
			</div>

			{/* Shipping Details */}
			<div>
				<p className="border-b-2 border-gray/40 text-[21px] font-semibold text-gray">
					Shipping Details
				</p>
				<div className="flex justify-between p-4">
					<div className="space-y-2">
						<p className="flex justify-between space-x-8 text-[18px]  text-gray">
							<span className="font-semibold">Shipping Dimension:</span>
							<span>000x000x000xxxx</span>
						</p>
						<p className="flex justify-between space-x-8 text-[18px]  text-gray">
							<span className="font-semibold">Product Dimension:</span>
							<span>000x000x000xxxx</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetailsTab;
