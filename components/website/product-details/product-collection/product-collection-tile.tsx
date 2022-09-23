import SubCategoryCard from 'components/website/home/common/sub-category-card';
import { useRouter } from 'next/router';

// components
import CollectionSlider from './collection-slider';

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
		<div className="mt-4 grid grid-cols-12 border-gray/40 pb-8 last:border-none sm:gap-x-16 sm:border-b">
			{/* Collection card */}
			<div className="col-span-2 hidden lg:block">
				<h2 className="font-mont font-semibold text-primary-main dark:text-accent-secondary-eco lg:text-[25px]">
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

			<div className="col-span-12 lg:col-span-10">
				<p className="text-[13px] font-semibold text-primary-main sm:text-[18px] lg:hidden">
					{name}
				</p>
				<div className="hidden h-full w-full sm:block">
					<CollectionSlider
						key={name}
						rows={products?.length <= 7 ? 1 : 2}
						className="!mx-0"
						leftButtonClassName="lg:!left-8"
						rightButtonClassName="lg:!right-10"
						categories={products}
						onTileClick={(_, data) => push(`/product/${data.id}`)}
					/>
				</div>

				{/* For mobile only */}
				<div>
					<div className="grid grid-cols-2 gap-4 sm:hidden">
						{products?.map((product: any) => {
							return (
								<div key={product.id}>
									<SubCategoryCard
										key={product.id}
										subCat={product}
										className="!h-[88px]"
										containerClassName="!border-2 !border-gray/40"
									/>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}; // End of ProductCollectionTile

export default ProductCollectionTile;
