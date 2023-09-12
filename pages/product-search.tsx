import {
	GetServerSideProps,
	InferGetServerSidePropsType,
	NextPage
} from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Third party packages
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// components
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import Seo from 'components/common/seo';
import ProductFilter from 'components/product-search/product-filter/product-filter';
import ProductList from 'components/product-search/product-list';
import ProductSearchFilterBar from 'components/product-search/product-search-filter-bar';
import MiniRFQCard from 'components/product-search/rfq-mini-card.components';

const MainCategoryAndCategoriesTile = dynamic(
	() =>
		import(
			'components/product-search/main-category-and-categories-tile'
		)
);
const TrendingCategorySlider = dynamic(
	() => import('components/product-search/trending-category-slider')
);
const TrendingSectionTile = dynamic(
	() => import('components/product-search/trending-section-tile')
);
const CompareProductList = dynamic(
	() =>
		import(
			'components/compare/compare-bottom-overlay/compare-overlay-product-list'
		)
);
const ProductSearchTopBanner = dynamic(
	() => import('components/product-search/product-search-top-banner')
);

// stores
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

import RFQCard from 'components/product-search/rfq-card.components';
import {
	getProducts,
	getSelectedMainCategoryAndCategories
} from 'lib/product-search.lib';
import { useTranslation } from 'next-i18next';
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
	const [selectedCategories, setSelectedCategories] = useState([]);

	const [selectedCountry, setSelectedCountry] = useState<any>({
		banner_image: props.countryBannerImageUrl || ''
	});

	console.log('selectedMainCategory-selectedCountry', {
		selectedMainCategory,
		selectedCountry
	});
	console.log(props);
	const [isInitialFilterSet, setIsInitialFilterSet] = useState(false);

	const router = useRouter();
	const { push, query } = router;
	console.log('Quearyparameter', query);
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
			onLiveBuyReadyToShipChange={(isLiveBuy) => {
				getProductSearchURL(router, { is_live_buy: isLiveBuy });
			}}
			ProductSortType={(priceOrMoq) => {
				getProductSearchURL(router, { sort_type: priceOrMoq });
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
			<div className="top-[68px] z-10 hidden md:sticky md:ml-[9px] md:mr-[10px] md:block md:pt-[14.01px] lg:hidden desktop:top-[121px] desktop:ml-[26px] desktop:mr-[23px] desktop:pt-[18.14px]">
				{productSearchFilerComponent}
			</div>

			<div className="lg:container">
				<div className="relative mx-auto flex md:mt-[9px] md:ml-[10px] lg:mt-[19px] xl:ml-[24px] xl:mr-[24px]">
					{/* Side container */}
					<section className="top-[97px] hidden md:sticky md:block md:w-[159px] xl:mr-[17px] xl:!w-[297px] 900px:w-[203px] desktop:top-[121px]">
						{/* filters */}
						<div className="md:mb-[14px] md:h-[383px] md:w-full lg:h-[361px] xl:h-[475px] xl:w-[297px]">
							<ProductFilter />
						</div>

						{/* RFQ CARD */}
						<div className="hidden md:block  xl:w-[297px]">
							<div className="w-full space-y-2 bg-gradient-to-r from-[#E7CA00] via-[#E8A30E] to-[#E8A30E] md:h-[321px] md:rounded-lg md:pt-2 lg:pl-[12.97px] xl:h-[475px] xl:pl-[19x]">
								{/* Image */}
								<div className="lg:mt-[16.86px] lg:flex desktop:items-center ">
									<div className="flex justify-center">
										<div className="relative md:h-[66.02px] md:w-[61.72px] lg:h-[45.06px] lg:w-[42.12px] xl:h-[66.02px] xl:w-[61.72px]">
											<ImageWithErrorHandler
												src="/static/rfq-box.png"
												alt="rfq box"
												fill={true}
											/>
										</div>
									</div>

									<p className="hidden text-white md:px-[6px] md:text-[18px] md:font-bold md:leading-[22px] lg:block lg:text-[16.86px] lg:leading-[20.55px] xl:text-[25px] xl:leading-[30.48px]">
										{t('submit_an_RFQ_for_anything!')}
									</p>
								</div>

								<ul className="list-disc text-white md:ml-6 md:pt-[35.98px] md:text-[15px] md:font-semibold md:leading-[18px] lg:pt-[22px] xl:pt-[34px] xl:text-[25px] xl:leading-[30.48px]">
									<li> {t('one_request')} </li>
									<li>{t('receive_multiple_quotes')} </li>
									<li>{t('responed')} </li>
									<li>{t('close_the_deal')} </li>
								</ul>

								<div className="flex justify-center md:pt-[34px] xl:pt-[48px] desktop:justify-start desktop:pl-2">
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
										className="flex items-center border-none bg-white px-1 py-1 outline-none md:w-[125px] md:rounded-md  lg:w-[167.36px]  desktop:w-[245.2px] desktop:pl-1"
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
					<div className="md:ml-[14px] md:mr-[11px] lg:ml-[8px] lg:w-[779px] xl:w-full">
						<div className="top-[97px] z-10 mb-[13px] hidden md:sticky lg:block desktop:top-[121px]">
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
									imageUrl:
										selectedMainCategory?.category_search_image ||
										selectedCountry?.image,
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
								<div className="w-full rounded-md bg-white md:mb-[10.87px] md:flex md:h-[101.13px] md:py-2 md:pl-[8.06px] lg:h-[142px] xl:mt-[17px] xl:h-[209px] desktop:mb-[23px] desktop:py-[17px] desktop:pl-[17px]">
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
											style={{
												backgroundColor: selectedMainCategory?.color,
												border: selectedMainCategory?.color
													? ''
													: '2px solid gray'
											}}
										>
											<div className="absolute bottom-0 right-0">
												<div className="relative overflow-hidden md:h-[30px] md:w-[30px] lg:h-[40.77px] lg:w-[40.93px] xl:h-[60px] xl:w-[60px]">
													<ImageWithErrorHandler
														key={
															selectedMainCategory?.category_search_image ||
															selectedCountry?.image
														}
														src={
															selectedMainCategory?.category_search_image ||
															selectedCountry?.image
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
									</div>

									{/* Category Slider for tablet and desktop  */}
									{selectedCategories?.length > 0 ? (
										<div className="hidden md:mt-[4px] md:ml-[13px] md:block md:w-[384px] lg:mr-2 lg:!w-[72%] xl:mt-[12px] xl:!w-[624px] xl:pr-2 840px:w-[424px] 900px:w-[500px] 980px:!w-[640px] desktop:mt-[8px] desktop:mb-[8px] desktop:mr-1 desktop:!w-[840px] 3xl:!w-[1000px]">
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
												className="md:mr-6 lg:mr-7 desktop:mr-8"
											/>
										</div>
									) : (
										<p className="flex w-full items-center justify-center text-lg">
											{t('no_categories_available')}
										</p>
									)}
								</div>
							)}
						</div>

						{/*If no any product in the product list - Speed your search up!! RFQ Card  */}
						{products?.length <= 0 && (
							<div className="my-5 md:my-0">
								<div className="hidden md:block">
									<RFQCard size="lg" />
								</div>
								<div className="px-4 md:hidden">
									<MiniRFQCard size="xs" />
								</div>
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
	console.log('ALLLfilterValue', filterValue);
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
