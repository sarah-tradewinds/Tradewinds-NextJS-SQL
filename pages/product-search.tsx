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
import Seo from 'components/website/common/seo';
import MainCategoryCard from 'components/website/product-search/main-category-card';
import SubCategoryTile from 'components/website/product-search/sub-category-tile';
import {
	getProducts,
	getSelectedMainCategoryAndCategories
} from 'lib/product-search.lib';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCategoryStore } from 'store/category-store';
import { useCountriesStore } from 'store/countries-store';
import { useHomeStore } from 'store/home';
import { useProductStore } from 'store/product-store';
import { getDataById, getObjectKeys } from 'utils/common.util';
import { getLocaleText } from 'utils/get_locale_text';

const ProductSearchPage: NextPage<
	InferGetServerSidePropsType<GetServerSideProps>
> = (props) => {
	const [products, setProducts] = useState(props.products || []);
	const [minOrder, setMinOrder] = useState('0');
	const [minPrice, setMinPrice] = useState('0');
	const [selectedCountryCode, setSelectedCountryCode] = useState('');
	const [selectedMainCategory, setSelectedMainCategory] =
		useState<any>();
	const [selectedCategories, setSelectedCategories] = useState([]);

	const isEco = useHomeStore((state) => state.isEco);

	const { selectedCountryIds } = useCountriesStore((state) => ({
		selectedCountryIds: state.selectedCountryIds
	}));

	const {
		allCategories,
		selectedMainCategoryId,
		selectedCategoryIds,
		setSelectedCategoryId,
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
		selectedMainCategoryId
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
		if (selectedMainCategoryId) {
			fetchCategoriesByMainCategoryId(selectedMainCategoryId, isEco);
		}
	}, [selectedMainCategoryId]);

	// Fetching sub-categories based on selectedCategoryIds
	useEffect(() => {
		const categoriesIds = getObjectKeys(
			selectedCategoryAndSubCategoryAndSpecificCategoryIds
		);
		if (categoriesIds.length > 0) {
			fetchSubCategoriesByCategoryId(categoriesIds.toString(), isEco);
		}
	}, [selectedCategoryIds]);

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
		if (selectedMainCategoryId) {
			getSelectedMainCategoryAndCategories(selectedMainCategoryId).then(
				(data) => {
					setSelectedMainCategory(data.main_category || {});
					setSelectedCategories(data.categories || []);
				}
			);
		}
	}, [selectedMainCategoryId]);

	// Fetching products
	useEffect(() => {
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
			categories: (router.query?.categories || '') as string,
			main_category: mainCategory?.title?.en,
			category: categoryNames.toString(),
			sub_category: subCategoryNames.toString(),
			sub_sub_category: specificCategoryNames.toString(),
			country_of_region: selectedCountryIds.toString(),
			is_eco: isEco
		}).then((data) => setProducts(data));
	}, [
		router.query?.categories,
		selectedMainCategoryId,
		selectedCategoryIds,
		selectedSubCategoryIds,
		selectedSpecificCategoryIds,
		minPrice,
		selectedCountryIds,
		isEco
	]);

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

	return (
		<>
			<Seo title="Product search page" description="" />

			{/* Main Category Banner */}
			<div className="relative h-[103px] md:h-[234px]">
				<Image
					src={
						selectedMainCategory?.banner_image ||
						'/catagarie-seach-header.png'
					}
					alt=""
					layout="fill"
				/>
			</div>

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
					<div className="grid grid-cols-12 md:gap-0 md:rounded-md md:bg-white md:p-4 md:shadow-md lg:gap-2">
						{/* Main category Card */}
						<div className="col-span-12  md:col-span-3">
							<MainCategoryCard
								title={getLocaleText(selectedMainCategory?.title || {})}
								subtitle={getLocaleText(
									selectedMainCategory?.description || {}
								)}
								imageUrl={
									selectedMainCategory?.image?.url ||
									'/static/images/agriculture.png'
								}
								className="w-screen md:w-auto"
							/>
						</div>
						{/* Categories */}
						<div className="col-span-12 border-gray/20 md:col-span-9 md:ml-4 md:border-l-2 md:pl-4">
							{mainCategory && (
								<SubCategoryList
									subCategories={selectedCategories || []}
									className="hidden md:grid"
									onTilePressed={setSelectedCategoryId}
									selectedSubCategoryIds={categoryIdList}
									onClick={() => {}}
								/>
							)}

							{/* For small screen only */}
							<div className="px-2 py-4 md:hidden">
								<div ref={ref} className="keen-slider">
									{subCategories?.map((subCategory: any) => (
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
												showBorder={subCategory?.isSelected}
												onTilePressed={() =>
													setSelectedCategoryId(subCategory.id)
												}
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
