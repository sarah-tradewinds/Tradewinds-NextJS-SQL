import {
	GetServerSideProps,
	InferGetServerSidePropsType,
	NextPage
} from 'next';
import Image from 'next/image';

// Third party packages
import { useKeenSlider } from 'keen-slider/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// components
import CompareProductList from 'components/website/compare/compare-bottom-overlay/compare-overlay-product-list';
import ProductList from 'components/website/product-search/product-list';
import SubCategoryList from 'components/website/product-search/sub-category-list';

// stores
import ImageWithErrorHandler from 'components/website/common/elements/image-with-error-handler';
import Seo from 'components/website/common/seo';
import MainCategoryCard from 'components/website/product-search/main-category-card';
import CategoriesFilterCopy from 'components/website/product-search/product-filter/categories-filter-copy';
import SubCategoryTile from 'components/website/product-search/sub-category-tile';
import TrendingSectionTile from 'components/website/product-search/trending-section-tile';
import { getMainCategories } from 'lib/common.lib';
import {
	getProducts,
	getSelectedMainCategoryAndCategories
} from 'lib/product-search.lib';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useProductCompareStore } from 'store/product-compare-store';
import useSWR from 'swr';
import { getLocaleText } from 'utils/get_locale_text';

const ProductSearchPage: NextPage<
	InferGetServerSidePropsType<GetServerSideProps>
> = (props) => {
	const [products, setProducts] = useState(props.products?.data || []);
	const [minOrder, setMinOrder] = useState('0');
	const [minPrice, setMinPrice] = useState('0');
	const [maxPrice, setMaxPrice] = useState('0');
	const [filterBuyEco, setFilterBuyEco] = useState(false);

	const [
		isSelectedMainCategoryAndCategoriesLoading,
		setIsSelectedMainCategoryAndCategoriesLoading
	] = useState(false);
	const [selectedMainCategory, setSelectedMainCategory] =
		useState<any>();
	const [selectedCategories, setSelectedCategories] = useState([]);

	const { push, locale, query } = useRouter();

	const {
		main_category_id,
		category_id,
		sub_category_id,
		sub_sub_category_id
	} = query;

	const [
		localSelectedSpecificCategoryId,
		setLocalSelectedSpecificCategoryId
	] = useState('');

	const {
		compareProducts,
		addProductToCompareList,
		removeProductFromCompareList,
		removeAllProductFromCompareList
	} = useProductCompareStore();

	const router = useRouter();

	// swr
	// Fetching mainCategories
	const {} = useSWR('main_category', getMainCategories);

	// Fetching selectedMainCategory and selectedCategories
	useEffect(() => {
		if (main_category_id) {
			setIsSelectedMainCategoryAndCategoriesLoading(true);
			getSelectedMainCategoryAndCategories(
				main_category_id as string
			).then((data) => {
				setSelectedMainCategory(data.main_category || {});
				setSelectedCategories(data.categories || []);
				setIsSelectedMainCategoryAndCategoriesLoading(false);
			});
		}
	}, [main_category_id]);

	// Fetching products
	useEffect(() => {
		getProducts({
			...query
		}).then((data: any) => {
			const productList = data.data || [];
			setProducts(productList);
			console.log(' ');
			console.log('Calling only products');
			console.log(' ');
		});
	}, [query]);

	const [options, setOptions] = useState({});
	const [ref] = useKeenSlider<HTMLDivElement>(options);

	useEffect(() => {
		if (selectedCategories && selectedCategories?.length > 0) {
			setOptions({
				loop: true,
				slides: {
					perView: 2,
					spacing: 8
				}
			});
		}
	}, [selectedCategories]);

	useEffect(() => {
		const updatedProductList = products?.map((product: any) => {
			const isExist = compareProducts.find(
				(compareProduct) => compareProduct.id === product.id
			);
			product.isInCompareList = isExist || false;

			return product;
		});
		setProducts(updatedProductList);
	}, [compareProducts.length]);

	return (
		<div className="container mx-auto">
			<Seo title="Product search page" description="" />

			{/* Main Category Banner */}
			{main_category_id && (
				<div className="relative h-[103px] md:h-[234px]">
					{/* <Image */}
					<ImageWithErrorHandler
						key={selectedMainCategory?.banner_image?.url}
						src={selectedMainCategory?.banner_image?.url}
						alt={getLocaleText(
							selectedMainCategory?.title || {},
							router.locale
						)}
						layout="fill"
					/>
				</div>
			)}

			<div className="relative grid grid-cols-12 gap-4 md:p-4 lg:gap-6 lg:p-6">
				{/* Side container */}
				<section className="col-span-4 hidden space-y-8 md:block lg:col-span-3">
					{/* filters */}
					<CategoriesFilterCopy />
					{/* <ProductFilter
						onMinOrderChange={(minOrderQuantity) =>
							setMinOrder(minOrderQuantity)
						}
						onMinPriceChange={(minPriceQuantity) =>
							setMinPrice(minPriceQuantity)
						}
					/> */}

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
					{router.query.is_trending && (
						<TrendingSectionTile
							minPrice={+minPrice}
							maxPrice={+maxPrice}
							filterByEco={filterBuyEco}
							onMinPriceClick={() => {
								if (+minPrice === 100) {
									setMinPrice('0');
								} else {
									setMinPrice('100');
									setMaxPrice('0');
									setFilterBuyEco(false);
								}
							}}
							onMaxPriceClick={() => {
								if (+maxPrice === 100) {
									setMaxPrice('0');
								} else {
									setMaxPrice('100');
									setMinPrice('0');
									setFilterBuyEco(false);
								}
							}}
							onEcoClick={() => {
								setMaxPrice('0');
								setMinPrice('0');
								setFilterBuyEco((prevState) => !prevState);
							}}
						/>
					)}

					{/* Category and categories list */}
					{!router.query.is_trending && main_category_id && (
						<div className="grid grid-cols-12 md:gap-0 md:rounded-md md:bg-white md:p-4 md:shadow-md lg:gap-2">
							{/* Main category Card */}
							<div className="col-span-12 md:col-span-3">
								{isSelectedMainCategoryAndCategoriesLoading ? (
									<div>
										<Skeleton />
										<Skeleton height="180px" />
									</div>
								) : (
									<MainCategoryCard
										title={getLocaleText(
											selectedMainCategory?.title || {},
											router.locale
										)}
										subtitle={getLocaleText(
											selectedMainCategory?.description || {},
											router.locale
										)}
										imageUrl={selectedMainCategory?.icon?.url}
										className="w-screen md:w-auto"
									/>
								)}
							</div>
							{/* Categories */}
							<div className="col-span-12 border-gray/20 md:col-span-9 md:ml-4 md:border-l-2 md:pl-4">
								<SubCategoryList
									subCategories={selectedCategories || []}
									className="hidden md:grid"
									// onTilePressed={main_category_id || ''}
									// selectedSubCategoryIds={[main_category_id ]}
									onTilePressed={() => {}}
									onClick={() => {}}
									isLoading={isSelectedMainCategoryAndCategoriesLoading}
								/>

								{/* For small screen only */}
								<div className="px-2 py-4 md:hidden">
									<div ref={ref} className="keen-slider">
										{selectedCategories?.map((subCategory: any) => {
											return (
												<div
													key={subCategory.id}
													className="keen-slider__slide"
												>
													<SubCategoryTile
														className="pb-4"
														imageUrl={
															subCategory.image?.url ||
															'/vehicles/green-tractor.png'
														}
														title={getLocaleText(
															subCategory.title || {},
															router.locale
														)}
														showBorder={subCategory.id === category_id}
														onTilePressed={() => {}}
													/>
												</div>
											);
										})}
									</div>
								</div>
							</div>
						</div>
					)}

					{/* Product List */}
					<div className="space-y-4 md:space-y-8">
						{products?.length <= 0 ? (
							<p className="text-center text-[32px] font-semibold">
								No product found
							</p>
						) : (
							<ProductList
								products={products}
								onCompareClick={addProductToCompareList}
							/>
						)}
					</div>

					{/* Pagination */}
					{/* <div className="col-span-12 hidden justify-center md:flex ">
						<div className="flex space-x-3 font-semibold text-gray md:text-[20px] lg:text-[25px]">
							<p>{`<`}</p>
							<p>1</p>
							<p>of</p>
							<p>46</p>
							<p>{`>`}</p>
						</div>
					</div> */}
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
		</div>
	);
}; // End of ProductSearchPage

export const getServerSideProps: GetServerSideProps = async ({
	locale
}) => {
	const products = await getProducts({
		price_start: 0
	});

	return {
		props: {
			...(await serverSideTranslations(locale || 'en')),
			products
		}
	};
}; // End of getServerSideProps function

export default ProductSearchPage;
