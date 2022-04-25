import { NextPage } from 'next';
import Image from 'next/image';

// components
import ProductList from 'components/website/product-search/product-list';

// data
import MainCategoryCard from 'components/website/product-search/main-category-card';
import ProductFilter from 'components/website/product-search/product-filter/product-filter';
import SubCategoryList from 'components/website/product-search/sub-category-list';
import SubCategoryTile from 'components/website/product-search/sub-category-tile';
import { products } from 'data/product-search/products';
import { subCategories } from 'data/product-search/sub-category';
import Slider from 'react-slick';

const ProductSearchPage: NextPage = (props) => {
	return (
		<>
			{/* Banner */}
			<div className="relative h-[103px] md:h-[234px]">
				<Image src="/catagarie-seach-header.png" alt="" layout="fill" />
			</div>

			<div className="grid grid-cols-12 gap-4 md:p-4 lg:gap-6 lg:p-6">
				{/* Side container */}
				<div className="col-span-4 hidden space-y-8 md:block lg:col-span-3">
					{/* filters */}
					<ProductFilter />

					{/* ads */}
					<div>
						<h4 className="bg-accent-primary-main p-4 text-center text-[25px] font-semibold text-white">
							Buy My Smokes
						</h4>
						<div className="relative h-[471px] w-full">
							<Image src="/smoker.png" alt="" layout="fill" />
						</div>
					</div>
				</div>

				{/* product list */}
				<div className="col-span-12 md:col-span-8 md:space-y-8 lg:col-span-9">
					{/* Category and categories list */}
					<div className="grid grid-cols-12 md:gap-0 md:rounded-md md:bg-white md:p-4 md:shadow-md lg:gap-2">
						{/* Main category Card */}
						<div className="col-span-12  md:col-span-3">
							<MainCategoryCard
								title="Agriculture"
								subtitle="Lorem ipsum dolor sit amet, consecamet Lorem ipsum dolor sit amet"
								imageUrl="/static/images/agriculture.png"
								className="w-screen md:w-auto"
							/>
						</div>
						{/* Categories */}
						<div className="col-span-12 border-gray/20 md:col-span-9 md:ml-4 md:border-l-2 md:pl-4">
							<SubCategoryList
								subCategories={subCategories}
								className="hidden md:grid"
							/>

							{/* For small screen only */}
							<div className="px-2 py-4 md:hidden">
								<Slider
									{...{
										infinite: true,
										speed: 500,
										slidesToShow: 2,
										slidesToScroll: 1
									}}
								>
									{subCategories.map((subCategory) => (
										<div key={subCategory.name}>
											<SubCategoryTile
												imageUrl={subCategory.imageUrl}
												title={subCategory.name}
											/>
										</div>
									))}
								</Slider>
							</div>
						</div>
					</div>

					{/* Product List */}
					<div className="space-y-4 md:space-y-8">
						<ProductList products={products} />
						{/* TODO: TMP */}
						<ProductList products={products} />
					</div>

					{/* Pagination */}
					<div className="col-span-12 hidden justify-center md:flex ">
						<div className="flex space-x-3 font-semibold text-gray md:text-[20px] lg:text-[25px]">
							<p>{`<`}</p>
							<p>1</p>
							<p>of</p>
							<p>46</p>
							<p>{`>`}</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductSearchPage;
