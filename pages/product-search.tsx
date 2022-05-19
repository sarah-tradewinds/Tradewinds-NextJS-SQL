import {
	GetStaticProps,
	InferGetStaticPropsType,
	NextPage
} from 'next';
import Image from 'next/image';

// Third party packages
import { useKeenSlider } from 'keen-slider/react';

// components

import CompareProductList from 'components/website/compare/compare-bottom-overlay/compare-overlay-product-list';
import MainCategoryCard from 'components/website/product-search/main-category-card';
import ProductFilter from 'components/website/product-search/product-filter/product-filter';
import ProductList from 'components/website/product-search/product-list';
import SubCategoryList from 'components/website/product-search/sub-category-list';

// data

// stores
import Seo from 'components/website/common/seo';
import SubCategoryTile from 'components/website/product-search/sub-category-tile';
import { getProducts } from 'lib/product-search.lib';
import { useEffect, useState } from 'react';
import {
	getMainCategoryById,
	useCategoryStore
} from 'store/category-store';
import { useProductStore } from 'store/product-store';

const ProductSearchPage: NextPage<
	InferGetStaticPropsType<GetStaticProps>
> = (props) => {
	const { products } = props;

	const {
		categories,
		fetchCategories,
		selectedMainCategoryId,
		selectedAndUnselectAllCategoryId
	} = useCategoryStore();

	const [selectedMainCategory, setSelectedMainCategory] = useState({});

	const {
		addProductToCompareList,
		removeProductFromCompareList,
		removeAllProductFromCompareList
	} = useProductStore();

	useEffect(() => {
		if (categories.length <= 0) {
			fetchCategories();
		}
	}, []);

	useEffect(() => {
		if (categories.length >= 0) {
			const mainCategory = categories.find(
				(category: any) => category.id === selectedMainCategoryId
			);
			if (mainCategory) {
				setSelectedMainCategory(mainCategory);
			}
		}

		if (!selectedMainCategoryId) {
			setSelectedMainCategory({});
		}
	}, [selectedMainCategoryId]);

	const [ref] = useKeenSlider<HTMLDivElement>({
		loop: true,
		slides: {
			perView: 2,
			spacing: 8
		}
	});

	const compareProducts = products.filter(
		(product: any) => product.isInCompareList
	);

	const mainCategory = getMainCategoryById(
		categories,
		selectedMainCategoryId
	);

	const subCategories = (mainCategory as any)?.category?.slice(0, 7);

	return (
		<>
			<Seo title="Product search page" description="" />

			{/* Banner */}
			<div className="relative h-[103px] md:h-[234px]">
				<Image src="/catagarie-seach-header.png" alt="" layout="fill" />
			</div>

			<div className="relative grid grid-cols-12 gap-4 md:p-4 lg:gap-6 lg:p-6">
				{/* Side container */}
				<section className="col-span-4 hidden space-y-8 md:block lg:col-span-3">
					{/* filters */}
					<ProductFilter categories={categories} />

					{/* ads */}
					<div>
						<h4 className="bg-accent-primary-main p-4 text-center text-[25px] font-semibold text-white">
							Buy My Smokes
						</h4>
						<div className="relative h-[471px] w-full">
							<Image src="/smoker.png" alt="" layout="fill" />
						</div>
					</div>
				</section>

				{/* product list and Category container*/}
				<div className="col-span-12 md:col-span-8 md:space-y-8 lg:col-span-9">
					{/* Category and categories list */}
					<div className="grid grid-cols-12 md:gap-0 md:rounded-md md:bg-white md:p-4 md:shadow-md lg:gap-2">
						{/* Main category Card */}
						<div className="col-span-12  md:col-span-3">
							<MainCategoryCard
								title={(mainCategory as any)?.title?.en}
								subtitle={(mainCategory as any)?.description?.en}
								imageUrl="/static/images/agriculture.png"
								className="w-screen md:w-auto"
							/>
						</div>
						{/* Categories */}
						<div className="col-span-12 border-gray/20 md:col-span-9 md:ml-4 md:border-l-2 md:pl-4">
							{mainCategory && (
								<SubCategoryList
									subCategories={subCategories || []}
									className="hidden md:grid"
									onClick={selectedAndUnselectAllCategoryId}
								/>
							)}

							{/* For small screen only */}
							<div className="px-2 py-4 md:hidden">
								<div ref={ref} className="keen-slider">
									{subCategories?.map((subCategory: any) => (
										<div
											key={subCategory.name}
											className="keen-slider__slide"
										>
											<SubCategoryTile
												imageUrl={subCategory.imageUrl}
												title={subCategory.name}
											/>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* Product List */}
					<div className="space-y-4 md:space-y-8">
						<ProductList
							products={products}
							onCompareClick={addProductToCompareList}
						/>
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

				{/* Compare */}
				{compareProducts.length > 0 && (
					<CompareProductList
						products={compareProducts}
						onClearAllClick={removeAllProductFromCompareList}
						onRemoveCompareProduct={removeProductFromCompareList}
					/>
				)}
			</div>
		</>
	);
}; // End of ProductSearchPage

export const getStaticProps: GetStaticProps = async () => {
	const products = await getProducts({
		price_start: 0
	});

	console.log(products);

	return {
		props: { products }
	};
}; // End of getStaticProps function

export default ProductSearchPage;
