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
import ProductFilter from 'components/website/product-search/product-filter/product-filter';
import ProductList from 'components/website/product-search/product-list';
import SubCategoryList from 'components/website/product-search/sub-category-list';

// stores
import ImageWithErrorHandler from 'components/website/common/elements/image-with-error-handler';
import Seo from 'components/website/common/seo';
import MainCategoryCard from 'components/website/product-search/main-category-card';
import SubCategoryTile from 'components/website/product-search/sub-category-tile';
import {
	getProducts,
	getSelectedMainCategoryAndCategories
} from 'lib/product-search.lib';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useCategoryStore } from 'store/category-store';
import { useCountriesStore } from 'store/countries-store';
import { useHomeStore } from 'store/home';
import { useProductStore } from 'store/product-store';
import {
	getCountriesName,
	getDataById,
	getObjectKeys
} from 'utils/common.util';
import { getLocaleText } from 'utils/get_locale_text';

const ProductSearchPage: NextPage<
	InferGetServerSidePropsType<GetServerSideProps>
> = (props) => {
	const [products, setProducts] = useState(props.products?.data || []);
	const [minOrder, setMinOrder] = useState('0');
	const [minPrice, setMinPrice] = useState('0');
	const [selectedCountryCode, setSelectedCountryCode] = useState('');

	const [localSelectedCategoryId, setLocalSelectedCategoryId] =
		useState('');
	const [localSelectedSubCategoryId, setLocalSelectedSubCategoryId] =
		useState('');
	const [
		localSelectedSpecificCategoryId,
		setLocalSelectedSpecificCategoryId
	] = useState('');

	const [selectedMainCategory, setSelectedMainCategory] =
		useState<any>();
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [
		isSelectedMainCategoryAndCategoriesLoading,
		setIsSelectedMainCategoryAndCategoriesLoading
	] = useState(false);

	const isEco = useHomeStore((state) => state.isEco);

	const selectedCountries = useCountriesStore(
		(state) => state.selectedCountries
	);

	const {
		allCategories,
		selectedMainCategoryId,
		selectedCategoryIds,
		setSelectedMainCategoryId,
		setSelectedCategoryId,
		setSelectedSubCategoryId,
		setSelectedSpecificCategoryId,
		setSelectedAllCategoryId,
		selectedSubCategoryIds,
		selectedSpecificCategoryIds,
		selectedCategoryAndSubCategoryAndSpecificCategoryIds,

		fetchMainCategories,
		fetchCategoriesByMainCategoryId,
		fetchSubCategoriesByCategoryId,
		fetchSpecificCategoriesBySubCategoryId
	} = useCategoryStore();

	const {
		addProductToCompareList,
		removeProductFromCompareList,
		removeAllProductFromCompareList
	} = useProductStore();

	const router = useRouter();

	const mainCategory = getDataById(
		allCategories,
		selectedMainCategoryId.id
	);

	const categoryIdList: string[] = [];
	const subCategoryIdList: string[] = [];
	const specificCategoryIdList: string[] = [];
	for (let categoryId in selectedCategoryAndSubCategoryAndSpecificCategoryIds) {
		categoryIdList.push(categoryId);
		const subCategoryObject =
			selectedCategoryAndSubCategoryAndSpecificCategoryIds[categoryId];
		for (let subCategoryId in subCategoryObject) {
			subCategoryIdList.push(subCategoryId);
			const specificCategoryIds = subCategoryObject[subCategoryId];
			specificCategoryIdList.push(...specificCategoryIds);
		}
	}

	const subCategoryList = (mainCategory as any)?.categories || [];

	const subCategories = [...subCategoryList]
		?.slice(0, 7)
		.map((category: any) => {
			category.isSelected = selectedCategoryIds.includes(category.id);
			return category;
		});

	// Fetching mainCategories
	useEffect(() => {
		if (allCategories.length <= 0) {
			fetchMainCategories(isEco);
		}
	}, [allCategories.length, isEco]);

	// Fetching categories based on mainCategoryId
	useEffect(() => {
		if (selectedMainCategoryId.id) {
			fetchCategoriesByMainCategoryId(selectedMainCategoryId.id, isEco);
		}
	}, [selectedMainCategoryId.id]);

	// Fetching sub-categories based on selectedCategoryIds
	useEffect(() => {
		const categoriesIds = getObjectKeys(
			selectedCategoryAndSubCategoryAndSpecificCategoryIds
		);
		if (categoriesIds.length > 0) {
			fetchSubCategoriesByCategoryId(
				categoriesIds.toString(),
				isEco
			).then(() => {
				// setSelectedSubCategoryId(
				// 	localSelectedCategoryId,
				// 	localSelectedSubCategoryId
				// );
			});
		}
	}, [selectedCategoryIds.length]);

	// Fetching specific-categories based on selectedSubCategoryIds
	useEffect(() => {
		if (subCategoryIdList.length > 0) {
			fetchSpecificCategoriesBySubCategoryId(
				subCategoryIdList.toString(),
				isEco
			);
		}
	}, [selectedSubCategoryIds]);

	// Fetching selectedMainCategory and selectedCategories
	useEffect(() => {
		if (selectedMainCategoryId.id) {
			setIsSelectedMainCategoryAndCategoriesLoading(true);
			getSelectedMainCategoryAndCategories(
				selectedMainCategoryId.id
			).then((data) => {
				setSelectedMainCategory(data.main_category || {});
				setSelectedCategories(data.categories || []);
				setIsSelectedMainCategoryAndCategoriesLoading(false);
			});
		}
	}, [selectedMainCategoryId.id]);

	// Fetching products based on categoriess
	useEffect(() => {
		const { query: searchQuery, categories } = router.query;

		if (!selectedMainCategoryId.id && !searchQuery && categories) {
			getProducts({
				price_start: +(minPrice || 0),
				categories: (categories || '') as string,
				is_eco: isEco
			}).then((data: any) => {
				let categories = data.categories || {};
				const productList = data.data || [];
				const [firstProduct] = productList;

				if (!categories.main_category) {
					if (firstProduct) {
						categories = {
							main_category: firstProduct?.main_category?.id,
							category: firstProduct?.category?.id,
							sub_category: firstProduct?.sub_category?.id,
							sub_sub_category: firstProduct?.specific_category?.id
						};
					}
				}

				// Setting default category Ids
				const {
					main_category,
					category,
					sub_category,
					sub_sub_category
				} = categories || {};

				if (!selectedMainCategoryId.id) {
					setSelectedMainCategoryId(main_category, '');
					setSelectedCategoryId(category);
					setSelectedSubCategoryId(category, sub_category);
					setSelectedSpecificCategoryId(
						category,
						sub_category,
						sub_sub_category
					);
				}

				setProducts(productList);

				console.log(' ');
				console.log(
					'Calling only when some one click on categories in category page'
				);
				console.log(' ');
			});
		}
	}, [router.query?.categories]);

	// Fetching products based on search query
	useEffect(() => {
		const searchQuery = router.query?.query;
		if (searchQuery) {
			getProducts({
				price_start: +(minPrice || 0),
				all: (searchQuery || '') as string,
				is_eco: isEco
			}).then((data: any) => {
				const productList = data.data || [];
				setProducts(productList);
				console.log(' ');
				console.log(
					'Calling only when query changes or search someone'
				);
				console.log(' ');
			});
		}
	}, [router.query?.query]);

	// Fetching products
	useEffect(() => {
		const { query: searchText } = router.query;
		if (!selectedMainCategoryId.id && searchText) {
			return;
		}

		const selectedCategories = subCategoryList.filter(
			(subCategory: any) => {
				return categoryIdList.includes(subCategory.id);
			}
		);

		const categoryNames = selectedCategories.map((subCategory: any) => {
			return subCategory.title?.en;
		});

		const subCategoryNames = [];
		const specificCategoryNames = [];
		for (let category of selectedCategories) {
			const { subCategories = [] } = category || {};

			for (let subCategory of subCategories) {
				const { specificCategories = [] } = subCategory || {};

				if (subCategoryIdList.includes(subCategory.id)) {
					subCategoryNames.push(subCategory?.title?.en);
				}

				for (let specificCategory of specificCategories) {
					if (specificCategoryIdList.includes(specificCategory.id)) {
						specificCategoryNames.push(specificCategory?.title?.en);
					}
				}
			}
		}

		getProducts({
			price_start: +minPrice,
			main_category: mainCategory?.title?.en,
			category: categoryNames.toString(),
			sub_category: subCategoryNames.toString(),
			sub_sub_category: specificCategoryNames.toString(),
			country_of_region: getCountriesName(selectedCountries).toString(),
			is_eco: isEco
		}).then((data: any) => {
			const productList = data.data || [];
			setProducts(productList);
			console.log(' ');
			console.log('Calling only products');
			console.log(' ');
		});
	}, [
		selectedMainCategoryId.id,
		selectedCategoryIds.length,
		selectedSubCategoryIds.length,
		selectedSpecificCategoryIds.length,
		minPrice,
		selectedCountries,
		isEco
	]);

	const [ref] = useKeenSlider<HTMLDivElement>({
		loop: true,
		slides: {
			perView: 2,
			spacing: 8
		}
	});

	const compareProducts = products?.filter(
		(product: any) => product.isInCompareList
	);

	return (
		<div className="container mx-auto">
			<Seo title="Product search page" description="" />

			{/* Main Category Banner */}
			{selectedMainCategoryId.id && (
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
					<ProductFilter
						onMinOrderChange={(minOrderQuantity) =>
							setMinOrder(minOrderQuantity)
						}
						onMinPriceChange={(minPriceQuantity) =>
							setMinPrice(minPriceQuantity)
						}
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
					{/* Category and categories list */}
					{selectedMainCategoryId.id && (
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
										imageUrl={selectedMainCategory?.image?.url}
										className="w-screen md:w-auto"
									/>
								)}
							</div>
							{/* Categories */}
							<div className="col-span-12 border-gray/20 md:col-span-9 md:ml-4 md:border-l-2 md:pl-4">
								<SubCategoryList
									subCategories={selectedCategories || []}
									className="hidden md:grid"
									onTilePressed={setSelectedCategoryId}
									selectedSubCategoryIds={categoryIdList}
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
														imageUrl={
															subCategory.image?.url ||
															'/vehicles/green-tractor.png'
														}
														title={getLocaleText(subCategory.title)}
														showBorder={
															selectedCategoryIds
																? selectedCategoryIds?.includes(
																		subCategory.id
																  )
																: false
														}
														onTilePressed={() =>
															setSelectedCategoryId(subCategory.id)
														}
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
