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
import ProductFilter from 'components/product-search/product-filter/product-filter';
import ProductSearchFilterBar from 'components/product-search/product-search-filter-bar';
import ProductSearchTopBanner from 'components/product-search/product-search-top-banner';
import RFQCard from 'components/product-search/rfq-card.components';
import MiniRFQCard from 'components/product-search/rfq-mini-card.components';
import TrendingCategorySlider from 'components/product-search/trending-category-slider';
import TrendingCategorySliderMobile from 'components/product-search/trending-category-slider-mobile';
import TrendingSectionTile from 'components/product-search/trending-section-tile';
import useDeviceSize from 'hooks/use-device-size.hooks';
import {
	getCountryById,
	getTrendingCategoriesByCountry
} from 'lib/common.lib';
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

	return (
		<div className="tablet:containers">
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
			<div className="top-[97px] z-20 hidden tablet:sticky tablet:ml-[9px] tablet:mr-[10px] tablet:block tablet:pt-[14.01px] desktop:top-[121px] desktop:ml-[26px] desktop:mr-[23px] desktop:pt-[18.14px]">
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

			<div className="relative flex md:grid md:grid-cols-12 tablet:mt-[9px] tablet:mr-[10px] tablet:pl-[9px] desktop:mt-[19px] desktop:pl-6">
				{/* Side container */}
				<section className="hidden md:col-span-3 md:!w-auto tablet:mr-[13px] tablet:block tablet:w-[159px] desktop:mr-[25px] desktop:w-[297px]">
					{/* filters */}
					<div className="md:w-auto tablet:mb-[14px] tablet:h-[383px] desktop:mb-[17px] desktop:h-[475px]">
						<ProductFilter />
					</div>

					{/* RFQ CARD */}
					<div className="hidden tablet:block">
						<div className="w-full space-y-2 bg-gradient-to-r from-[#E7CA00] via-[#E8A30E] to-[#E8A30E] tablet:h-[321px] tablet:rounded-lg tablet:pt-2 desktop:h-[475px] desktop:pl-5 desktop:pt-6">
							{/* Image */}
							<div className="desktop:flex desktop:items-center">
								<div className="flex justify-center">
									<div className="relative tablet:h-[66.02px] tablet:w-[61.72px]">
										<ImageWithErrorHandler
											src="/static/rfq-box.png"
											alt="rfq box"
											fill={true}
										/>
									</div>
								</div>

								<p className="text-white tablet:px-[6px] tablet:text-[18px] tablet:font-bold tablet:leading-[22px] desktop:text-[25px] desktop:leading-[30px]">
									Submit an RFQ for anything!
								</p>
							</div>

							<ul className="list-disc text-white tablet:ml-6 tablet:text-[15px] tablet:font-semibold tablet:leading-[18px] desktop:ml-7 desktop:pt-[34px] desktop:text-[25px] desktop:leading-[30px]">
								<li>One request</li>
								<li>Receive multiple quotes</li>
								<li>Responed</li>
								<li>Close the deal</li>
							</ul>

							<div className="flex justify-center tablet:pt-[34px] desktop:justify-start desktop:pl-2">
								<button
									onClick={() => {
										// if (!isAuth) {
										// 	setIsLoginOpen();
										// } else {
										// 	router.push(
										// 		`${generateBuyerDashboardUrl({
										// 			redirect_to: BUYER_DASHBOARD_PAGES.buyer_rfq,
										// 			action: BUYER_DASHBOARD_ACTIONS.create_rfq,
										// 			access_key: customerData.access.token,
										// 			refresh_key: customerData.refresh.token
										// 		})}`
										// 	);
										// }
									}}
									className="flex items-center border-none bg-white outline-none tablet:h-[19.88px] tablet:w-[125px] tablet:rounded-md desktop:h-[39px] desktop:w-[245.2px] desktop:pl-1"
								>
									<div className="relative h-[15.8px] w-[18.35px] desktop:h-[31px] desktop:w-[36px]">
										<ImageWithErrorHandler
											src="/static/rfq-orange.png"
											alt="rfq orange icon"
											fill={true}
										/>
									</div>
									<p className="text-center text-secondary tablet:ml-[9.69px] tablet:text-[10.7054px] tablet:font-semibold tablet:leading-[13px] desktop:ml-0 desktop:w-full desktop:text-[21px] desktop:leading-[26px]">
										{t('common:submit_rfq')}
									</p>
								</button>
							</div>
						</div>
					</div>
				</section>

				{/* Category container and Product list */}
				<div className=" md:col-span-9 md:!w-auto 2xl:!w-auto tablet:w-[552.06px] desktop:w-[1142px]">
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
					{((!router.query.is_trending &&
						selectedCategories.length > 0) ||
						selectedCountry?.banner_image) && (
						<div className="rounded-md bg-white tablet:mb-[10.87px] tablet:flex tablet:h-[101.13px] tablet:py-2 tablet:pl-[8.06px] desktop:mb-[23px] desktop:h-[209px] desktop:py-[17px] desktop:pl-[17px]">
							{/* Main category Card */}
							<div
								className="h-[42px] w-full 2xl:col-span-2 tablet:h-auto tablet:w-[122px]  desktop:w-[266px]"
								style={{
									backgroundColor:
										deviceWidth >= 744
											? ''
											: selectedMainCategory?.color
								}}
							>
								{isSelectedMainCategoryAndCategoriesLoading ? (
									<div className="hidden tablet:block">
										<Skeleton />
										<Skeleton height="84px" />
									</div>
								) : (
									<div className="flex h-[42px] items-center justify-between p-2 tablet:h-full tablet:flex-col tablet:items-start tablet:space-x-0 tablet:p-0">
										<p className="text-[16px] font-semibold leading-5 text-gray tablet:text-[10px] tablet:leading-3 desktop:text-[21px] desktop:leading-[26px]">
											{getLocaleText(
												selectedMainCategory?.title ||
													selectedCountry?.name ||
													{},
												router.locale
											)}
										</p>

										{/* Country Image */}
										{selectedCountry?.id && !selectedMainCategory?.id && (
											<div className="relative h-[38px] w-[38px] tablet:h-full tablet:w-full">
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
												className="relative h-[38px] w-[38px] tablet:mt-1 tablet:block tablet:h-[70px] tablet:w-[99px] desktop:mt-2 desktop:h-full desktop:w-[266px]"
												style={{
													backgroundColor: selectedMainCategory?.color,
													border: selectedMainCategory?.color
														? ''
														: '2px solid gray'
												}}
											>
												<div className="tablet:absolute tablet:bottom-0 tablet:right-0">
													<div className="relative h-[38px] w-[38px] tablet:h-[30px] tablet:w-[30px] desktop:h-[60px] desktop:w-[60px]">
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
								<div className="hidden 2xl:col-span-9 2xl:!w-full tablet:mt-[9px] tablet:block tablet:w-[402px] 900px:!w-[532px] desktop:ml-[13px] desktop:mt-[35px] desktop:mb-[25px] desktop:h-[150px] desktop:!w-[808px]">
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
							<div className="bg-[#E5E5E5] py-1 tablet:hidden">
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
							</div>
						</div>
					)}

					{/*If no any product in the product list - Speed your search up!! RFQ Card  */}
					{products?.length <= 0 && (
						<div className="hidden tablet:block">
							<RFQCard size="lg" />
						</div>
					)}

					{/* Product List */}
					<div className="space-y-4 tablet:space-y-8">
						{products?.length > 0 && (
							<ProductList
								products={products}
								onCompareClick={addProductToCompareList}
							/>
						)}
					</div>

					{/* If product are available in the product list - Submit RFQ Card */}
					<div className="mt-4 tablet:mt-4">
						{products?.length > 0 && <MiniRFQCard size="xs" />}
					</div>

					{/* Pagination */}
					{/* <div className="col-span-12 hidden justify-center tablet:flex ">
						<div className="flex space-x-3 font-semibold text-gray tablet:text-[20px] desktop:text-[25px]">
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
