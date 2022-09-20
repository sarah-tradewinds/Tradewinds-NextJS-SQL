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

// stores
import ImageWithErrorHandler from 'components/website/common/elements/image-with-error-handler';
import Seo from 'components/website/common/seo';
import SubCategorySlider from 'components/website/home/sub-category-slider';
import MainCategoryCard from 'components/website/product-search/main-category-card';
import ProductFilter from 'components/website/product-search/product-filter/product-filter';
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
import { getIdAndName, useCategoryStore } from 'store/category-store';
import { useProductCompareStore } from 'store/product-compare-store';
import useSWR from 'swr';
import { getAlignmentClassName } from 'utils/common.util';
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
	const [isInitialFilterSet, setIsInitialFilterSet] = useState(false);

	const { push, query } = useRouter();

	const { main_category, category } = query;
	const [categoryId] = getIdAndName((query.category || '') as string);

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

	const setCategory = useCategoryStore((state) => state.setCategory);

	const setInitialIds = useCategoryStore(
		(state) => state.setInitialIds
	);

	const router = useRouter();

	// swr
	// Fetching mainCategories
	const {} = useSWR('main_category', getMainCategories);

	useEffect(() => {
		const [mainCategoryId] =
			getIdAndName((query.main_category || '') as string) || [];

		if (!mainCategoryId && query.filters) {
			push('/product-search');
			return;
		}

		if (query && !isInitialFilterSet) {
			setInitialIds(query);
			setIsInitialFilterSet(true);
		}
	}, [isInitialFilterSet]);

	// Fetching selectedMainCategory and selectedCategories
	useEffect(() => {
		const [mainCategoryId] = getIdAndName(
			(main_category || '') as string
		);

		if (mainCategoryId) {
			setIsSelectedMainCategoryAndCategoriesLoading(true);
			getSelectedMainCategoryAndCategories(
				mainCategoryId as string
			).then((data) => {
				setSelectedMainCategory(data.main_category || {});
				setSelectedCategories(data.categories || []);
				setIsSelectedMainCategoryAndCategoriesLoading(false);
			});
		}
	}, [main_category]);

	// Fetching products
	useEffect(() => {
		const [_, main_category] = getIdAndName(
			(query.main_category || '') as string
		);
		const [__, category] = getIdAndName(
			(query.category || '') as string
		);

		const [___, sub_category] = getIdAndName(
			(query.sub_category || '') as string
		);

		const [____, sub_sub_category] = getIdAndName(
			(query.sub_sub_category || '') as string
		);

		const [countryId, countryName] = getIdAndName(
			(query.country || '') as string
		);

		const { price_start, searchQuery } = query;

		getProducts({
			main_category,
			category,
			sub_category,
			sub_sub_category,
			country_of_region: countryName,
			price_start: price_start ? +(price_start || 0) : 0,
			all: (searchQuery || '') as string
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

	const selectedCategoryList = categoryId?.split(',') || [];

	return (
		<div className="container mx-auto">
			<Seo title="Product search page" description="" />

			{/* Main Category Banner */}
			{main_category && (
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

					{selectedMainCategory?.banner_image_text && (
						<h4
							className={`${getAlignmentClassName(
								selectedMainCategory?.horizontal,
								selectedMainCategory?.vertical
							)} absolute text-[40px] font-semibold text-white md:w-[480px]`}
							style={{
								color: selectedMainCategory?.banner_image_font_color
							}}
						>
							{selectedMainCategory?.banner_image_text}
						</h4>
					)}
				</div>
			)}

			<div className="relative grid grid-cols-12 gap-4 md:p-4 lg:gap-6 lg:p-6">
				{/* Side container */}
				<section className="col-span-4 hidden space-y-8 md:block lg:col-span-3">
					{/* filters */}
					<ProductFilter
						onMinOrderChange={(minOrderQuantity) =>
							setMinOrder(minOrderQuantity)
						}
						onMinPriceChange={(minPriceQuantity) =>
							setMinPrice(minPriceQuantity)
						}
						url={true}
					/>

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
					{!router.query.is_trending && main_category && (
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
								<div className="hidden md:block">
									<SubCategorySlider
										categories={[...selectedCategories]}
										onTileClick={(categoryId, data) => {
											const params = setCategory(
												categoryId,
												data?.title?.en
											);
											router.push(`/product-search?${params}`);
										}}
									/>
								</div>

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
														showBorder={selectedCategoryList?.includes(
															subCategory.id
														)}
														onTilePressed={() => {
															const params = setCategory(
																subCategory.id,
																subCategory?.title?.en
															);
															router.push(`/product-search?${params}`);
														}}
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
