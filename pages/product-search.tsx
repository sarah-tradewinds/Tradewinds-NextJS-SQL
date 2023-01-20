import {
	GetServerSideProps,
	InferGetServerSidePropsType,
	NextPage
} from 'next';

// Third party packages
import { useKeenSlider } from 'keen-slider/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// components
import CompareProductList from 'components/compare/compare-bottom-overlay/compare-overlay-product-list';
import ProductList from 'components/product-search/product-list';

// stores
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import Seo from 'components/common/seo';
import ProductFilter from 'components/product-search/product-filter/product-filter';
import ProductSearchFilterBar from 'components/product-search/product-search-filter-bar';
import ProductSearchTopBanner from 'components/product-search/product-search-top-banner';
import RFQCard from 'components/product-search/rfq-card.components';
import MiniRFQCard from 'components/product-search/rfq-mini-card.components';
import SubCategoryTile from 'components/product-search/sub-category-tile';
import TrendingCategorySlider from 'components/product-search/trending-category-slider';
import TrendingSectionTile from 'components/product-search/trending-section-tile';
import useDeviceSize from 'hooks/use-device-size.hooks';
import { getCountryById } from 'lib/common.lib';
import {
	getProducts,
	getSelectedMainCategoryAndCategories
} from 'lib/product-search.lib';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { getIdAndName, useCategoryStore } from 'store/category-store';
import { useHomeStore } from 'store/home';
import { useProductCompareStore } from 'store/product-compare-store';
import {
	getFilterValueFromQuery,
	getProductSearchURL
} from 'utils/common.util';
import { getLocaleText } from 'utils/get_locale_text';

const ProductSearchPage: NextPage<
	InferGetServerSidePropsType<GetServerSideProps>
> = (props) => {
	const [products, setProducts] = useState(props.products?.data || []);
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
	const [
		selectedCountryBannerImageUrl,
		setSelectedCountryBannerImageUrl
	] = useState('');
	const [isInitialFilterSet, setIsInitialFilterSet] = useState(false);

	const { push, query } = useRouter();

	const { main_category } = query;
	const [categoryId] = getIdAndName((query.category || '') as string);

	const {
		compareProducts,
		addProductToCompareList,
		removeProductFromCompareList,
		removeAllProductFromCompareList
	} = useProductCompareStore();

	const isEco = useHomeStore((state) => state.isEco);
	const setCategory = useCategoryStore((state) => state.setCategory);

	const setInitialIds = useCategoryStore(
		(state) => state.setInitialIds
	);

	const router = useRouter();
	const { t } = useTranslation();
	const { deviceWidth } = useDeviceSize();

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
		const [rawMainCategoryId] = getIdAndName(
			(main_category || '') as string
		);

		const [mainCategoryId] = rawMainCategoryId?.split(',') || [];

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

	// Fetching country by id
	useEffect(() => {
		const [countryIds] = getIdAndName((query.country || '') as string);

		if (countryIds) {
			const [countryId] = countryIds?.split(',');
			getCountryById(countryId).then((data) => {
				setSelectedCountryBannerImageUrl(data?.banner_image?.url || '');
			});
		}
	}, [query.country]);

	// Fetching products
	useEffect(() => {
		const filterValue = getFilterValueFromQuery(query);
		console.log('filterValue =', filterValue);

		getProducts({
			...filterValue,
			is_eco: isEco || main_category ? false : filterBuyEco
			// is_customizable: isCustomizable,
			// is_ready_to_ship: isReadyToShip,
			// is_live: isLive,
			// minimum_order: minOrder,
			// maximum_order: maxOrder
		}).then((data: any) => {
			const productList = data.data || [];
			setProducts(productList);
			console.log(' ');
			console.log('Calling only products', query, productList);
			console.log(' ');
			const { main_category } = data.categories || {};
			if (main_category) {
				setIsSelectedMainCategoryAndCategoriesLoading(true);
				getSelectedMainCategoryAndCategories(
					main_category as string
				).then((data) => {
					setSelectedMainCategory(data.main_category || {});
					setSelectedCategories(data.categories || []);
					setIsSelectedMainCategoryAndCategoriesLoading(false);
				});
			}
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
					spacing: 4
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

	const [countryId] = getIdAndName((query.country || '') as string);

	return (
		<div className="md:container">
			<Seo title="Product search page" description="" />

			<div>
				{/* Main Category Banner */}
				{main_category && !countryId && (
					<ProductSearchTopBanner
						key={selectedMainCategory?.banner_image?.url}
						imageUrl={selectedMainCategory?.banner_image?.url}
						text={getLocaleText(
							selectedMainCategory?.banner_image_text || {},
							router.locale
						)}
						horizontal={selectedMainCategory?.horizontal}
						vertical={selectedMainCategory?.vertical}
					/>
				)}

				{/* Country Banner */}
				{selectedCountryBannerImageUrl && (
					<ProductSearchTopBanner
						key={selectedCountryBannerImageUrl}
						imageUrl={selectedCountryBannerImageUrl}
					/>
				)}
			</div>

			<div className="top-[104px] z-20 md:sticky md:ml-[9px] md:mr-[10px] md:pt-[14.01px] lg:top-[120px] lg:ml-[26px] lg:mr-[23px] lg:pt-[18.14px]">
				<ProductSearchFilterBar
					onCountryChange={(id = '', name = '') => {
						const country = id && name ? `${id}_${name || ''}` : '';

						getProductSearchURL(router, { country });
					}}
					onOrderChange={(minOrder, maxOrder) => {
						getProductSearchURL(router, { minOrder, maxOrder });
					}}
					onPriceChange={(minPrice, maxPrice) => {
						getProductSearchURL(router, {
							price_start: minPrice,
							price_end: maxPrice
						});
					}}
					onCustomizableChange={(isCustomizable) => {
						getProductSearchURL(router, { isCustomizable });
					}}
					onLiveBuyReadyToShipChange={(isReadyToShip) => {
						getProductSearchURL(router, { isReadyToShip });
					}}
				/>
			</div>

			<div className="relative flex md:mt-[9px] md:mr-[10px] md:pl-[9px] lg:mt-[19px] lg:pl-6">
				{/* Side container */}
				<section className="hidden md:mr-[13px] md:block md:w-[159px] lg:mr-[25px] lg:w-[297px]">
					{/* filters */}
					<div className="md:mb-[14px] md:h-[383px] lg:mb-[17px] lg:h-[475px]">
						<ProductFilter />
					</div>

					<div className="hidden md:block">
						<MiniRFQCard size="xl" />
					</div>
				</section>

				{/* Category container and Product list */}
				<div className="md:w-[552.06px] lg:w-[1142px]">
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

					{/* MainCategory and categories list */}
					{!router.query.is_trending && selectedCategories.length > 0 && (
						<div className="rounded-md bg-white md:mb-[10.87px] md:flex md:h-[101.13px] md:py-2 md:pl-[8.06px] lg:mb-[23px] lg:h-[209px] lg:py-[17px] lg:pl-[17px]">
							{/* Main category Card */}
							<div
								className="h-[42px] w-full md:h-auto md:w-[122px] lg:w-[266px]"
								style={{
									backgroundColor:
										deviceWidth < 744 ? selectedMainCategory?.color : ''
								}}
							>
								{isSelectedMainCategoryAndCategoriesLoading ? (
									<div>
										<Skeleton />
										<Skeleton height="84px" />
									</div>
								) : (
									<div className="md:justify-betweens flex h-full items-center p-2 md:flex-col md:items-start md:space-x-0 md:p-0">
										<p className="text-[16px] font-semibold leading-5 md:text-[10px] md:leading-3 md:text-gray/80 lg:text-[21px] lg:leading-[26px]">
											{getLocaleText(
												selectedMainCategory?.title || {},
												router.locale
											)}
										</p>
										<div
											className="relative hidden h-[38px] w-[38px] md:mt-1 md:block md:h-[70px] md:w-[99px] lg:mt-2 lg:h-full lg:w-[266px]"
											style={{
												backgroundColor: selectedMainCategory?.color,
												border: selectedMainCategory?.color
													? ''
													: '2px solid gray'
											}}
										>
											<div className="md:absolute md:bottom-0 md:right-0">
												<div className="relative h-[38px] w-[38px] md:h-[30px] md:w-[30px] lg:h-[60px] lg:w-[60px]">
													<ImageWithErrorHandler
														src={selectedMainCategory?.icon?.url}
														alt={getLocaleText(
															selectedMainCategory?.title || {},
															router.locale
														)}
														fill={true}
													/>
												</div>
											</div>
										</div>
									</div>
								)}
							</div>

							<div className="hidden md:mt-[9px] md:block md:w-[402px] lg:ml-[13px] lg:mt-[35px] lg:mb-[25px] lg:h-[150px] lg:w-[838px]">
								<TrendingCategorySlider
									categories={[...selectedCategories]}
									selectedCategoryIds={selectedCategoryList || []}
									onTileClick={(categoryId, data) => {
										const params = setCategory(
											categoryId,
											data?.title?.en
										);
										router.push(
											`/product-search?${params}`,
											undefined,
											{ shallow: true }
										);
									}}
								/>
							</div>

							{/* For small screen only */}
							<div
								className="flex overflow-x-auto bg-[#E5E5E5] md:hidden"
								style={{ width: `${deviceWidth}px` }}
							>
								<div ref={ref} className="keen-slider h-[44px]">
									{selectedCategories?.map((subCategory: any) => {
										return (
											<div
												key={subCategory.id}
												className="keen-slider__slide"
											>
												<div>
													<SubCategoryTile
														className="!w-[148px] pb-4"
														imageClassName="!w-[51px] !h-[44px]"
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
											</div>
										);
									})}
								</div>
							</div>
						</div>
					)}

					{/*If no any product in the product list - Speed your search up!! RFQ Card  */}
					{products?.length <= 0 && (
						<div className="hidden md:block">
							<RFQCard size="lg" />
						</div>
					)}

					{/* Product List */}
					<div className="space-y-4 md:space-y-8">
						{products?.length > 0 && (
							<ProductList
								products={products}
								onCompareClick={addProductToCompareList}
							/>
						)}
					</div>

					{/* If product are available in the product list - Submit RFQ Card */}
					<div className="mt-4 md:mt-2">
						{products?.length > 0 && <MiniRFQCard size="xs" />}
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
	console.log('[getServerSideProps] running');
	const products = await getProducts({
		price_start: 0
	});

	return {
		props: {
			...(await serverSideTranslations(locale || 'en'))
			// products
		}
	};
}; // End of getServerSideProps function

export default ProductSearchPage;
