import CategoryTileAccordion from 'components/categories/category-tile-accordion';
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import { NextPage } from 'next';
import Image from 'next/image';

const Categories: NextPage = () => {
	const categories: any[] = [];
	for (let i = 1; i <= 40; i++) {
		categories.push(i);
	}

	return (
		<div className="pb-40">
			{/* Banner */}
			<div className="relative h-[106px] w-full sm:h-[235px]">
				<Image
					src="/images/category-search.png"
					alt="category-search"
					fill={true}
				/>
				<p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-[21px] font-semibold leading-[25.6px] text-[#BBD3DD]">
					Categories
				</p>
			</div>

			{/* Main Categories */}
			<div className="flex h-[79px] items-center justify-between bg-white px-2 sm:h-[109px]">
				{[1, 2, 3]?.map((mainCategory) => (
					<div
						key={mainCategory}
						className="flex flex-col items-center space-y-[5px]"
					>
						{/* Image */}
						<div className="relative h-[24px] w-[24px] sm:h-[55px] sm:w-[55px]">
							<ImageWithErrorHandler
								src={'/images/category-search.png'}
								alt="category-search"
								fill={true}
							/>
						</div>
						<p className="text-[10px] leading-[12.19px] text-gray sm:text-[14px] sm:font-semibold sm:leading-[17.07px]">
							Agriculture
						</p>
					</div>
				))}
			</div>

			{/* Category Tiles */}
			<div className="mx-[10px] mt-[10px] space-y-[9px] lg:grid lg:grid-cols-2">
				{categories?.map((category) => (
					<CategoryTileAccordion
						key={category}
						title="Agriculture"
						imageUrl="/images/category-search.png"
						backgroundColor="black"
					>
						<div className="my-[15px] ml-[27px] space-y-2 sm:grid sm:grid-cols-2 sm:pb-[25px]">
							{categories?.map((cat) => (
								<p
									key={cat}
									className="text-[14px] leading-[17.07px] text-gray sm:text-[15px] sm:leading-[18.29px]"
								>
									Category Name - {cat}
								</p>
							))}
						</div>
					</CategoryTileAccordion>
				))}
			</div>
		</div>
	);
}; // End of Categories

export default Categories;
