import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage
} from 'next';

// Third party packages
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// components
import CompareProductList from 'components/compare/compare-bottom-overlay/compare-overlay-product-list';
import ProductList from 'components/product-search/product-list';

// stores
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import Seo from 'components/common/seo';
import MainCategoryAndCategoriesTile from 'components/product-search/main-category-and-categores-tile';
import ProductFilter from 'components/product-search/product-filter/product-filter';
import ProductSearchFilterBar from 'components/product-search/product-search-filter-bar';
import ProductSearchTopBanner from 'components/product-search/product-search-top-banner';
import RFQCard from 'components/product-search/rfq-card.components';
import MiniRFQCard from 'components/product-search/rfq-mini-card.components';
import TrendingCategorySlider from 'components/product-search/trending-category-slider';
import TrendingSectionTile from 'components/product-search/trending-section-tile';
import useDeviceSize from 'hooks/use-device-size.hooks';
import {
  getCountryById,
  getTrendingCategoriesByCountry
} from 'lib/common.lib';

import {
	BUYER_DASHBOARD_ACTIONS,
	BUYER_DASHBOARD_PAGES,
	generateBuyerDashboardUrl
} from 'data/buyer/buyer-actions';

import {
  getProducts,
  getSelectedMainCategoryAndCategories
} from 'lib/product-search.lib';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useAuthStore } from 'store/auth';
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

	console.log('products =', products);

	const [
		isSelectedMainCategoryAndCategoriesLoading,
		setIsSelectedMainCategoryAndCategoriesLoading
	] = useState(false);
	const [selectedMainCategory, setSelectedMainCategory] =
		useState<any>();
	console.log('selectedMainCategory', selectedMainCategory);
	const [selectedCategories, setSelectedCategories] = useState([]);

	const [selectedCountry, setSelectedCountry] = useState<any>({
		banner_image: props.countryBannerImageUrl || ''
	});

	console.log(props);
	const [isInitialFilterSet, setIsInitialFilterSet] = useState(false);

	const router = useRouter();
	const { push, query } = router;

	const { main_category } = query;
	const [categoryId] = getIdAndName((query.category || '') as string);

	const { customerData, isAuth, setIsLoginOpen } = useAuthStore(
		(state) => ({
			isAuth: state.isAuth,
			customerData: state.customerData,
			setIsLoginOpen: state.setIsLoginOpen
		})
	);

	const {
		compareProducts,
		addProductToCompareList,
		removeProductFromCompareList,
		removeAllProductFromCompareList
	} = useProductCompareStore();

	const isEco = useHomeStore((state) => state.isEco);
	const { setMainCategory, setCategory } = useCategoryStore(
		(state) => ({
			setMainCategory: state.setMainCategory,
			setCategory: state.setCategory
		})
	);

	const setInitialIds = useCategoryStore(
		(state) => state.setInitialIds
	);

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
			const [_, urlParams] = router.asPath.split('&filters=');

			// const filters = urlParams.get('filters');

			console.log('router =', urlParams);

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
			getCountryById(countryId).then(async (data) => {
				console.log('data-data = data', data);
				setSelectedCountry(data);
				const categories = await getTrendingCategoriesByCountry(
					data?.name?.en
				);
				setSelectedCategories(categories || []);
			});
		}
	}, [query.country]);

	// Fetching products
	useEffect(() => {
		const filterValue = getFilterValueFromQuery(query);

		getProducts({
			...filterValue,
			is_eco: isEco || (main_category ? false : filterBuyEco)
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
	}, [query, isEco]);

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

	const navigateWithShallow = (query: { [key: string]: any }) => {
		const region = router.query.region;
		const country = router.query.country;
		if (region) {
			query.region = region;
		}

		if (country) {
			query.country = country;
		}

		router.push({ pathname: '/product-search', query }, undefined, {
			shallow: true
		});
	}; // End of navigateWithShallow function

	const isTrending = router.query.is_trending;

	const productSearchFilerComponent = (
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
	);

	return (
		<div className="3xl:container 3xl:w-[1700px]">
			<Seo title="Product search page" description="" />

			{/* Main Category Banner and Category banner */}
			<div>
				{/* Main Category Banner */}
				{main_category && (
					<ProductSearchTopBanner
						key={selectedMainCategory?.banner_image}
						imageUrl={selectedMainCategory?.banner_image}
						text={getLocaleText(
							selectedMainCategory?.banner_text || {},
							router.locale
						)}
						textColor={selectedMainCategory?.banner_text_color}
						horizontal={selectedMainCategory?.horizontal}
						vertical={selectedMainCategory?.vertical}
					/>
				)}

				{/* Country Banner */}
				{!main_category && selectedCountry?.banner_image && (
					<ProductSearchTopBanner
						key={selectedCountry?.banner_image}
						imageUrl={selectedCountry?.banner_image}
					/>
				)}
			</div>

			{/* ProductSearchFilterBar */}
			<div className="top-[97px] z-20 hidden md:sticky md:ml-[9px] md:mr-[10px] md:block md:pt-[14.01px] lg:hidden desktop:top-[121px] desktop:ml-[26px] desktop:mr-[23px] desktop:pt-[18.14px]">
				{productSearchFilerComponent}
			</div>

			<div className="lg:container bg-priary-main">
				<div className="relative mx-auto flex md:mt-[9px] md:ml-[10px] lg:mt-[19px] xl:ml-[24px] xl:mr-[24px]">
					{/* Side container */}
					<section className="xl:!w-[297px] mr-[14px] hidden md:block md:w-[159px] 900px:w-[203px] xl:mr-[17px]">
						{/* filters */}
						<div className="md:mb-[14px] md:h-[383px] md:w-full lg:h-[361px] xl:h-[475px] xl:w-[297px]">
							<ProductFilter />
						</div>

						{/* RFQ CARD */}
						<div className="hidden md:block  xl:w-[297px]">
							<div className="w-full space-y-2 bg-gradient-to-r from-[#E7CA00] via-[#E8A30E] to-[#E8A30E] md:h-[321px] md:rounded-lg md:pt-2 lg:pl-[12.97px] xl:pl-[19x] xl:h-[475px]">
								{/* Image */}
								<div className="lg:mt-[16.86px] lg:flex desktop:items-center ">
									<div className="flex justify-center">
										<div className="relative md:h-[66.02px] md:w-[61.72px] lg:h-[45.06px] lg:w-[42.12px] xl:w-[61.72px] xl:h-[66.02px]">
											<ImageWithErrorHandler
												src="/static/rfq-box.png"
												alt="rfq box"
												fill={true}
											/>
										</div>
									</div>

									<p className="hidden text-white md:px-[6px] md:text-[18px] md:font-bold md:leading-[22px] lg:block lg:text-[16.86px] lg:leading-[20.55px] xl:text-[25px] xl:leading-[30.48px]">
										Submit an RFQ for anything!
									</p>
								</div>

								<ul className="list-disc text-white md:ml-6 md:pt-[65.98px] md:text-[15px] md:font-semibold md:leading-[18px] lg:pt-[22px] xl:text-[25px] xl:leading-[30.48px] xl:pt-[34px]">
									<li>One request</li>
									<li>Receive multiple quotes</li>
									<li>Responed</li>
									<li>Close the deal</li>
								</ul>

								<div className="flex justify-center md:pt-[34px] desktop:justify-start desktop:pl-2 xl:pt-[68px]">
									<button
										onClick={() => {
											if (!isAuth) {
												setIsLoginOpen();
											} else {
												router.push(
													`${generateBuyerDashboardUrl({
														redirect_to:
															BUYER_DASHBOARD_PAGES.buyer_rfq,
														action: BUYER_DASHBOARD_ACTIONS.create_rfq,
														access_key: customerData.access.token,
														refresh_key: customerData.refresh.token
													})}`
												);
											}
										}}
										className="flex items-center border-none bg-white outline-none md:h-[19.88px] md:w-[125px] md:rounded-md lg:h-[26.62px] lg:w-[167.36px] desktop:h-[39px] desktop:w-[245.2px] desktop:pl-1"
									>
										<div className="relative h-[15.8px] w-[18.35px] lg:ml-[4.72px] lg:h-[21.16px] lg:w-[24.57px] desktop:h-[31px] desktop:w-[36px]">
											<ImageWithErrorHandler
												src="/static/rfq-orange.png"
												alt="rfq orange icon"
												fill={true}
											/>
										</div>
										<p className="text-center text-secondary md:ml-[9.69px] md:text-[10.7054px] md:font-semibold md:leading-[13px] lg:text-[14.16px] lg:leading-[17.26px] desktop:ml-0 desktop:w-full desktop:text-[21px] desktop:leading-[26px]">
											{t('common:submit_rfq')}
										</p>
									</button>
								</div>
							</div>
						</div>
					</section>

					{/* Category container and Product list */}
					<div className="lg:ml-[8px] lg:w-[779px] xl:w-[1008px]s xl:w-full">
						<div className="mb-[13px] hidden lg:block">
							{productSearchFilerComponent}
						</div>

						{isTrending && (
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

              {/* For Mobile only */}
						<div className="md:hidden">
							<MainCategoryAndCategoriesTile
								key={selectedMainCategory?.category_search_image}
								mainCategory={{
									title: getLocaleText(
										selectedMainCategory?.title ||
											selectedCountry?.name ||
											{},
										router.locale
									),
									imageUrl: selectedMainCategory?.category_search_image,
									backgroundColor: selectedMainCategory?.color
								}}
								selectedCategories={selectedCategories || []}
								selectedCategoryList={selectedCategoryList}
							/>
						</div>

						<div className="hidden md:block">
							{/* MainCategory and categories list */}
							{((!isTrending && selectedCategories.length > 0) ||
								selectedCountry?.banner_image) && (
								<div className="w-full rounded-md bg-white md:mb-[10.87px] md:flex md:h-[101.13px] md:py-2 md:pl-[8.06px] lg:h-[142px] xl:h-[209px] desktop:mb-[23px] desktop:py-[17px] desktop:pl-[17px] xl:mt-[17px]">
									{/* Main category Card */}

									<div className="relative flex flex-col md:h-[84.78px] md:w-[160.69px] lg:h-[118.9px] lg:w-[181.45px] xl:h-[175px] xl:w-[266px]">
										<h3 className="font-semibold text-gray md:text-[10px] lg:text-[15.16px] xl:text-[21px] xl:leading-[25.1px]">
											{getLocaleText(
												selectedMainCategory?.title ||
													selectedCountry?.name ||
													{},
												router.locale
											)}
										</h3>
										{/*Category Image */}
										<div
											className="relative flex h-full items-end md:w-full xl:mt-[8px]"
											// style={{ backgroundColor }}
											style={{
												backgroundColor: selectedMainCategory?.color,
												border: selectedMainCategory?.color
													? ''
													: '2px solid gray'
											}}
										>
											<div className="absolute bottom-0 right-0">
												<div className="relative overflow-hidden md:h-[30px] md:w-[30px] lg:h-[40.77px] lg:w-[40.93px] xl:h-[60px] xl:w-[60px]">
													<div className="absolute bottom-0 right-0">
														<img
															src={
																selectedMainCategory?.category_search_image
															}
															alt={''}
															className="h-auto w-auto object-contain"
														/>
														{/* <ImageWithErrorHandler
															key={
																selectedMainCategory?.category_search_image
															}
															src={
																selectedMainCategory?.category_search_image
															}
															alt={getLocaleText(
																selectedMainCategory?.title || {},
																router.locale
															)}
															fill={true}
														/> */}
													</div>
												</div>
											</div>
										</div>
									</div>

									<div
										className="bg-errors hidden h-[42px] w-full md:h-auto md:w-[122px] lg:w-[181.45px] desktop:w-[266px]"
										style={{
											backgroundColor:
												deviceWidth >= 744
													? ''
													: selectedMainCategory?.color
										}}
									>
										{isSelectedMainCategoryAndCategoriesLoading ? (
											<div className="hidden md:block">
												<Skeleton />
												<Skeleton height="84px" />
											</div>
										) : (
											<div className="flex h-[42px] items-center justify-between p-2 md:h-full md:flex-col md:items-start md:space-x-0 md:p-0">
												<p className="text-[16px] font-semibold leading-5 text-gray md:text-[10px] md:leading-3 desktop:text-[21px] desktop:leading-[26px]">
													{getLocaleText(
														selectedMainCategory?.title ||
															selectedCountry?.name ||
															{},
														router.locale
													)}
												</p>

												{/* Country Image */}
												{selectedCountry?.id &&
													!selectedMainCategory?.id && (
														<div className="relative h-[38px] w-[38px] md:h-full md:w-full">
															<ImageWithErrorHandler
																key={selectedCountry?.image}
																src={selectedCountry?.image}
																alt={getLocaleText(
																	selectedCountry?.name || {},
																	router.locale
																)}
																fill={true}
																className="object-cover"
															/>
														</div>
													)}

												{selectedMainCategory?.id && (
													<div
														className="relative h-[38px] w-[38px] md:mt-1 md:block md:h-[70px] md:w-[122px] lg:w-full desktop:mt-2 desktop:h-full desktop:w-[266px]"
														style={{
															backgroundColor:
																selectedMainCategory?.color,
															border: selectedMainCategory?.color
																? ''
																: '2px solid gray'
														}}
													>
														<div className="md:absolute md:bottom-0 md:right-0">
															<div className="relative h-[38px] w-[38px] md:h-[30px] md:w-[30px] desktop:h-[60px] desktop:w-[60px]">
																<ImageWithErrorHandler
																	key={
																		selectedMainCategory?.category_search_image
																	}
																	src={
																		selectedMainCategory?.category_search_image
																	}
																	alt={getLocaleText(
																		selectedMainCategory?.title || {},
																		router.locale
																	)}
																	fill={true}
																/>
															</div>
														</div>
													</div>
												)}
											</div>
										)}
									</div>

									{/* Category Slider for tablet and desktop  */}
									{selectedCategories?.length > 0 ? (
										<div className="hidden md:mt-[9px] md:ml-[13px] md:block md:w-[400px] 900px:w-[500px] lg!:w-[72%] desktop:mt-[35px] desktop:mb-[25px] desktop:w-[840px] xl:!w-[624px] xl:pr-2 3xl:w-[980px] xl:w-[50%]s">
											<TrendingCategorySlider
												categories={[...selectedCategories]}
												selectedCategoryIds={selectedCategoryList || []}
												onTileClick={(categoryId, data) => {
													const { id: mainCategoryId, title } =
														data?.edges?.main_category;
													setMainCategory(
														mainCategoryId || '',
														title?.en || ''
													);

													const params = setCategory(
														categoryId,
														data?.title?.en
													);

													navigateWithShallow(params?.payload);
												}}
											/>
										</div>
									) : (
										<p className="flex w-full items-center justify-center text-lg">
											No categories available
										</p>
									)}

									{/* For small screen only */}
									{/* <div className="bg-[#E5E5E5] py-1 md:hidden">
									<TrendingCategorySliderMobile
										categories={selectedCategories || []}
										selectedCategoryList={selectedCategoryList}
										onTilePressed={(subCategory) => {
											const { id: mainCategoryId, title } =
												subCategory?.edges?.main_category;
											setMainCategory(
												mainCategoryId || '',
												title?.en || ''
											);

											const params = setCategory(
												subCategory.id,
												subCategory?.title?.en
											);
											navigateWithShallow(params?.payload);
										}}
									/>
								</div> */}
								</div>
							)}
						</div>

						{/*If no any product in the product list - Speed your search up!! RFQ Card  */}
						{products?.length <= 0 && (
							<div className="hidden md:block">
								<RFQCard size="lg" />
							</div>
						)}

						{/* Product List */}
						<div className="mt-[12px]">
							<ProductList
								products={products}
								onCompareClick={addProductToCompareList}
							/>
						</div>

						{/* If product are available in the product list - Submit RFQ Card */}
						<div className="mt-4 hidden md:mt-4 desktop:block">
							{products?.length > 0 && <MiniRFQCard size="xs" />}
						</div>

						{/* Pagination */}
						{/* <div className="col-span-12 hidden justify-center md:flex ">
						<div className="flex space-x-3 font-semibold text-gray md:text-[20px] desktop:text-[25px]">
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
		</div>
	);
}; // End of ProductSearchPage

export const getServerSideProps: GetServerSideProps = async ({
	locale,
	query
}) => {
	const dateS = new Date();
	console.log(
		'Product Search page = [getServerSideProps] started data fetching',
		dateS.toLocaleTimeString()
	);

	const filterValue = getFilterValueFromQuery(query);

	const products = await getProducts({
		...filterValue
	});

	let countryBannerImageUrl = '';
	const [countryIds] = getIdAndName((query.country || '') as string);
	if (countryIds) {
		const [countryId] = countryIds?.split(',');
		getCountryById(countryId)
			.then((data) => {
				countryBannerImageUrl =
					data?.banner_image?.url || '/coming-soon.png';
			})
			.finally(() => {
				if (!countryBannerImageUrl) {
					countryBannerImageUrl = '/coming-soon.png';
				}
			});
	}

	const dateE = new Date();
	console.log(
		'Product Search page = [getServerSideProps] data fetching ends',
		dateE.toLocaleTimeString()
	);

	return {
		props: {
			...(await serverSideTranslations(locale || 'en')),
			products,
			countryBannerImageUrl
		}
	};
}; // End of getServerSideProps function

export default ProductSearchPage;
