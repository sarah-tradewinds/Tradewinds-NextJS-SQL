import { useRouter } from 'next/router';

// components
import SubCategorySlider from 'components/website/home/sub-category-slider';

interface ProductCollectionTileProps {
	name: string;
	products: any[];
}

const ProductCollectionTile: React.FC<ProductCollectionTileProps> = (
	props
) => {
	const { name, products } = props;

	const { push } = useRouter();

	return (
		<div className="mt-4 flex border-gray/40 pb-8 last:border-none sm:border-b">
			{/* Collection card */}
			<div className="hidden lg:block">
				<div>
					<h2 className="bg-secondary font-mont font-semibold text-primary-main dark:text-accent-secondary-eco lg:text-[25px]">
						{name}
					</h2>
					<div className="h-[249px] w-[227px] bg-primary-main text-white dark:text-accent-secondary-eco">
						<p className="p-4">
							<span className="font-semibold">
								{name} {` `}
							</span>
							<span>
								lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
								ipsum lorem ipsum
							</span>
						</p>
					</div>
				</div>
			</div>

			<div className="w-full bg-primary-eco">
				<p className="text-[13px] font-semibold text-primary-main sm:text-[18px] lg:hidden">
					{name}
				</p>
				<div className="hidden sm:block">
					<SubCategorySlider
						key={name}
						rows={products?.length <= 7 ? 1 : 2}
						className="!mx-0"
						leftButtonClassName="lg:!left-8"
						rightButtonClassName="lg:!right-10"
						categories={products}
						slidesToShow={products?.length <= 7 ? 4 : 8}
						onTileClick={(_, data) => push(`/product/${data.id}`)}
					/>
				</div>

				{/* For mobile only */}
				{/* <div className="grid grid-cols-2 gap-4 sm:hidden">
					{products?.map((product: any) => {
						return (
							<SubCategoryCard
								key={product.id}
								subCat={product}
								className="!h-[88px]"
							/>
						);
					})}
				</div> */}
			</div>
		</div>
	);
}; // End of ProductCollectionTile

export default ProductCollectionTile;
