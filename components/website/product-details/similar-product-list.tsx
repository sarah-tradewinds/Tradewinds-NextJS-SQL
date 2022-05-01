import Image from 'next/image';

interface SimilarProductListProps {
	title: string;
	similarProducts: any[];
	className?: string;
}

const SimilarProductList: React.FC<SimilarProductListProps> = (
	props
) => {
	const { title, similarProducts, className } = props;

	return (
		<div className="mx-4 rounded bg-white p-4">
			<h3 className="text-[25px] font-semibold text-primary-main">
				{title}
			</h3>

			{/* Similar Products */}
			<div className={`flex justify-between 2xl:px-8 ${className}`}>
				{similarProducts.map((similarProduct, index) => (
					<div
						key={similarProduct.id}
						className={index === 3 ? 'hidden xl:block' : ''}
					>
						<div className="relative h-[205px] w-[240px]">
							<Image
								src="/vehicles/green-tractor.png"
								alt=""
								layout="fill"
							/>
						</div>
						<p className="f ont-bold flex justify-between space-x-8 text-[18px] text-primary-main">
							Green Tractor 1
						</p>
						<p className="text-[15px] text-gray/40">
							Nicee green color
						</p>
					</div>
				))}
			</div>
		</div>
	);
}; // End of SimilarProductList

export default SimilarProductList;
