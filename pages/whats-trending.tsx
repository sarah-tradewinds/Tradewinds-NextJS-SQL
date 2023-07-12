import { Tab } from '@headlessui/react';
import {
	GetServerSideProps,
	InferGetServerSidePropsType,
	NextPage
} from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Third party packages
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// components
import { HiMinusCircle, HiPlusCircle } from 'react-icons/hi';
import TrendingCatagories from '../src/components/common/trending_page/trending-catagories';

// stores
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import Seo from 'components/common/seo';
import ProductFilter from 'components/product-search/product-filter/product-filter';
import ProductList from 'components/product-search/product-list';
import ProductSearchFilterBar from 'components/product-search/product-search-filter-bar';

const CompareProductList = dynamic(
	() =>
		import(
			'components/compare/compare-bottom-overlay/compare-overlay-product-list'
		)
);
const TrendingCategorySlider = dynamic(
	() => import('components/product-search/trending-category-slider')
);
const ProductSearchTopBanner = dynamic(
	() => import('components/product-search/product-search-top-banner')
);

import TrendingCategoryTile from 'components/what-is-trending/trending-category-tile';
import {
	BUYER_DASHBOARD_ACTIONS,
	BUYER_DASHBOARD_PAGES,
	generateBuyerDashboardUrl
} from 'data/buyer/buyer-actions';
import useDeviceSize from 'hooks/use-device-size.hooks';
import {
	getCountryById,
	getTrendingCategories,
	getTrendingCategoriesByCountry
} from 'lib/common.lib';
import {
	getProducts,
	getSelectedMainCategoryAndCategories
} from 'lib/product-search.lib';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthStore } from 'store/auth';
import { getIdAndName, useCategoryStore } from 'store/category-store';
import { useHomeStore } from 'store/home';
import { useProductCompareStore } from 'store/product-compare-store';
import {
	getFilterValueFromQuery,
	getProductSearchURL
} from 'utils/common.util';
import { getLocaleText } from 'utils/get_locale_text';

const Trending_page: NextPage<
	InferGetServerSidePropsType<GetServerSideProps>
> = (props) => {
	const [products, setProducts] = useState(props.products?.data || []);
	const trendingCategories = props.categories;
	console.log('props.categories', props.categories);
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
	const [
		isTrendingCategoriesExpanded,
		setIsTrendingCategoriesExpanded
	] = useState(false);
	const [isTrendingProductsExpanded, setIsTrendingProductsExpanded] =
		useState(false);

	const [isExpanded1, setIsExpanded1] = useState(false);
	const [isExpanded2, setIsExpanded2] = useState(false);

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
		getTrendingCategoriesByCountry('').then((categories) =>
			setSelectedCategories(categories || [])
		);
	}, []);

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
				console.log('catagories', categories);
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
	const trendingcategories = getTrendingCategories();
	console.log('trendingcategories', trendingcategories);

	const [countryId] = getIdAndName((query.country || '') as string);
	console.log('selectedMainCategory =', selectedMainCategory);

	const navigateToProductSearchPageBasedOnSelectedCategory = (
		selectedCategory: any
	) => {
		const { id: mainCategoryId, title } =
			selectedCategory?.edges?.main_category;
		setMainCategory(mainCategoryId || '', title?.en || '');

		const params = setCategory(
			selectedCategory?.id || '',
			selectedCategory?.title?.en || ''
		);

		router.push(
			{
				pathname: '/product-search',
				query: params?.payload || {}
			},
			undefined,
			{
				shallow: true
			}
		);
	};

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
		<div>
			<Seo title="What's trending" description="" />

			{/* Banner image for trending only */}
			<div className="3xl:container 3xl:w-[1512px]">
				<div className="relative h-[241px] w-full md:h-[234px] lg:h-[228px] xl:h-[192.67px] desktop:h-[234px]">
					<ImageWithErrorHandler
						src="/images/what-is-trending.svg"
						alt="what is trending banner"
						fill={true}
						className="bg-left object-cover"
					/>

					<p className="absolute bottom-[26px] right-5 w-[117px] text-[25px] font-semibold leading-[30.48px] text-white md:hidden lg:bottom-1/2 lg:right-8 lg:block lg:w-auto lg:translate-y-1/2 lg:text-[48px] lg:leading-[58.51px] xl:text-[40.63px] xl:leading-[49.53px] desktop:text-[48px] desktop:leading-[58.51px]">
						What’s Trending
					</p>
				</div>
			</div>

			{/* For mobiles only - Trending categories and products */}
			<div className="sm:mt-2] mt-[6px] md:hidden">
				{/* This is Trending Catagories */}
				<div>
					{/* Trending Accordion Tile */}
					<div className="h-[99px] bg-primary-main sm:mx-[15px]">
						{/* action */}
						<div
							className="flex cursor-pointer justify-end p-2"
							onClick={() =>
								setIsTrendingCategoriesExpanded(
									(prevState) => !prevState
								)
							}
						>
							{isTrendingCategoriesExpanded ? (
								<HiMinusCircle className="text-[20px] text-secondary" />
							) : (
								<HiPlusCircle className="text-[20px] text-secondary" />
							)}
						</div>
						<h2 className="text-center text-[20px] font-semibold leading-[24.38px] text-white">
							Trending Categories
						</h2>
					</div>

					{/* Trending Categories */}
					{isTrendingCategoriesExpanded && (
						<div className="mx-[10px] my-[12px] grid grid-cols-1 gap-y-[11px] sm:mx-[17px] sm:grid-cols-2 sm:gap-x-2">
							{trendingCategories
								?.slice(0, 9)
								?.map((category: any, index: number) => {
									return (
										<TrendingCategoryTile
											key={category?.id}
											index={(index + 1)?.toString()}
											title={getLocaleText(
												category?.title || {},
												router?.locale
											)}
											imageUrl={category?.image}
											backgroundColor={
												category?.edges?.main_category?.color
											}
											onTileClick={() =>
												navigateToProductSearchPageBasedOnSelectedCategory?.(
													category
												)
											}
										/>
									);
								})}
							<div className="sm:hidden">
								<TrendingCategoryTile
									key={'more'}
									index=""
									title="More"
									backgroundColor="#33A7DF"
									imageUrl="/image/blue-triangle.png"
								/>
							</div>
							<Link
								href="/categories"
								className="flex h-[67px] w-full items-center justify-center rounded-md bg-accent-primary-main text-[21px] font-semibold text-white sm:hidden md:hidden"
							>
								Explore all Categories
							</Link>
						</div>
					)}
				</div>

				{/* Trending Products */}
				<div className="mt-[11px] sm:mt-[21px]">
					{/* Trending Product Accordion Tile */}
					<div className="h-[99px] bg-green sm:mx-[15px]">
						{/* action */}
						<div
							className="flex cursor-pointer justify-end p-2"
							onClick={() =>
								setIsTrendingProductsExpanded((prevState) => !prevState)
							}
						>
							{isTrendingProductsExpanded ? (
								<HiMinusCircle className="text-[20px] text-secondary" />
							) : (
								<HiPlusCircle className="text-[20px] text-secondary" />
							)}
						</div>
						<h2 className="text-center text-[20px] font-semibold leading-[24.38px] text-white">
							Trending Products
						</h2>
					</div>

					{/* Trending Products */}
					{isTrendingProductsExpanded && (
						<div className="mt-[12px]">
							<ProductList
								products={products}
								onCompareClick={addProductToCompareList}
								className="sm:!mx-[17px]"
							/>
						</div>
					)}
				</div>
			</div>

			{/* -------------------------------- Medium amd Large Device View ---------------------------------------------- */}
			<div className="hidden md:block">
				{/* Main Category Banner and Category banner */}
				<div style={{ display: 'none' }}>
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

				<div className="md:container desktop:w-[1512px]">
					<div className="relative mx-auto flex md:mt-[9px] md:ml-[10px] lg:mt-[19px] xl:ml-[24px] xl:mr-[24px]">
						{/* Side container */}
						<section className=" hidden md:block md:w-[159px] xl:mr-[17px] xl:!w-[251.43px] 900px:w-[203px] desktop:!w-[297px]">
							{/* filters */}
							<div className="md:mb-[14px] md:h-[383px] md:w-full lg:h-[361px] xl:h-[475px]">
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
											Submit an RFQ for anything!
										</p>
									</div>

									<ul className="list-disc text-white md:ml-6 md:pt-[65.98px] md:text-[15px] md:font-semibold md:leading-[18px] lg:pt-[22px] xl:pt-[34px] xl:text-[25px] xl:leading-[30.48px]">
										<li>One request</li>
										<li>Receive multiple quotes</li>
										<li>Responed</li>
										<li>Close the deal</li>
									</ul>

									<div className="flex justify-center md:pt-[34px] xl:pt-[68px] desktop:justify-start desktop:pl-2">
										<button
											onClick={() => {
												if (!isAuth) {
													setIsLoginOpen();
												} else {
													router.push(
														`${generateBuyerDashboardUrl({
															redirect_to:
																BUYER_DASHBOARD_PAGES.buyer_rfq,
															action:
																BUYER_DASHBOARD_ACTIONS.create_rfq,
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

						{/* Tab Category container and Product list */}
						<div className="lg:w-[779px]s md:ml-[14px] md:mr-[11px] lg:ml-[8px] lg:w-full xl:w-full">
							<div className="mb-[13px] hidden lg:block">
								{productSearchFilerComponent}
							</div>

							<Tab.Group>
								<Tab.List className="ml-4 space-x-4 text-[25px] font-semibold">
									<Tab className="h-[41px] rounded-t-xl bg-white px-2 text-center outline-none">
										{({ selected }: { selected: boolean }) => (
											<span
												className={`font-semibold md:text-[15px] md:leading-[18.15px]  xl:text-[21.16px] xl:leading-[25.61px] desktop:text-[25px] desktop:leading-[30.26px] ${
													selected ? 'text-gray' : 'text-gray/20'
												}`}
											>
												Catagories
											</span>
										)}
									</Tab>
									<Tab className="h-[41px] w-[150px] rounded-t-xl bg-white text-center outline-none">
										{({ selected }: { selected: boolean }) => (
											<span
												className={`font-semibold md:text-[15px] md:leading-[18.15px] xl:text-[21.16px] xl:leading-[25.61px] desktop:text-[25px] desktop:leading-[30.26px] ${
													selected ? 'text-gray' : 'text-gray/20'
												}`}
											>
												Products
											</span>
										)}
									</Tab>
								</Tab.List>

								<Tab.Panel>
									<div className="-mt-[5px] flex w-full rounded-[10px] bg-white md:h-[183.27px] lg:h-[142.95px] xl:h-[177.13px] desktop:h-[209.23px]">
										<div className="md:ml-[10px] md:mr-[10.01px] md:pt-[7px] lg:ml-[25px] lg:mr-[20.01px] lg:pt-[11px] desktop:pt-[12px]">
											<p className="font-semibold text-primary-main md:w-[105px] md:text-[18px] md:leading-[21.94px] lg:w-auto lg:text-[15px] lg:leading-[18.29px] xl:text-[17.78px] xl:leading-[21.67px] desktop:text-[21px] desktop:leading-[25.6px]">
												Trending Catagories
											</p>

											{/* Box */}
											<div className="md:ml[18px] bg-primary-main md:h-[121.67px] md:w-[130.14px]  lg:mt-1 lg:h-[98.38px] lg:w-[181.73px] xl:h-[121.9px] xl:w-[225.19px] desktop:h-[144px] desktop:w-[266px]"></div>
										</div>

										<div className="desktop:border-1 relative border-[0.77px] border-[#DCDBDB] md:mt-[50px] md:mr-[9.24px] md:h-[121.67px] md:w-full lg:mt-[12.98px] lg:h-[119.56px] lg:border-[0.68px] xl:h-[148.15px] xl:border-[0.85px] desktop:h-[175px]">
											<p className="desktop:leading-[25.6px text-[16.17px] font-bold leading-[19.71px] text-primary-main md:ml-[10.78px] md:w-[121px] lg:text-[14.35px] lg:leading-[17.49px] xl:mt-[8.7px] xl:ml-[14.39px] xl:text-[17.78px] xl:leading-[21.67px] desktop:text-[21px]">
												Undiscovered and rising
											</p>

											<ImageWithErrorHandler
												src="/static/images/trending_images/camera.png"
												alt="camera"
												fill={true}
											/>
										</div>
									</div>

									<TrendingCatagories
										categories={trendingCategories || []}
										onTileClick={
											navigateToProductSearchPageBasedOnSelectedCategory
										}
										className="lg:!grid-cols-3"
									/>
								</Tab.Panel>

								{/* Product Panels */}
								<Tab.Panel>
									<div className="-mt-[5px] flex w-full rounded-[10px] bg-white md:h-[183.27px] lg:h-[142.95px] xl:h-[177.13px] desktop:h-[209.23px]">
										<div className="md:ml-[10px] md:mr-[10.01px] md:pt-[7px] lg:ml-[12px] lg:mr-[5.84px] lg:pt-[11px] desktop:pt-[12px]">
											<p className="font-semibold text-primary-main md:w-[105px] md:text-[18px] md:leading-[21.94px] lg:w-auto lg:text-[15px] lg:leading-[18.29px] xl:text-[17.78px] xl:leading-[21.67px] desktop:text-[21px] desktop:leading-[25.6px]">
												Trending Products
											</p>

											{/* Box */}
											<div className="md:ml[18px] bg-green md:h-[121.67px] md:w-[130.14px] lg:mt-1 lg:h-[98.38px] lg:w-[181.73px] xl:h-[121.9px] xl:w-[225.19px] desktop:h-[144px] desktop:w-[266px]"></div>
										</div>

										{/* Category Slider for tablet and desktop  */}
										{selectedCategories?.length > 0 ? (
											<div className="hidden md:mt-[55.27px] md:ml-[13px] md:block md:w-[384px] lg:ml-1 lg:mt-[17.53px] lg:!w-[600px] xl:mt-[12px] xl:!w-[684px] xl:pr-2 840px:w-[424px] 900px:w-[500px] desktop:mt-[26px] desktop:mb-[8px] desktop:mr-1 desktop:!w-[840px] 3xl:!w-[1000px]">
												<TrendingCategorySlider
													slideContainerClassName="md:!mb-[45px] lg:!mb-[32px] xl:!mb-[24px] desktop:!mb-[32px]"
													categories={[...selectedCategories]}
													numOfSlidesToShow={
														deviceWidth >= 1280 ? 3 : 0
													}
													selectedCategoryIds={
														selectedCategoryList || []
													}
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
												No categories available
											</p>
										)}
									</div>

									<ProductList
										products={products || []}
										onCompareClick={addProductToCompareList}
									/>

									{/* Compare */}
									{compareProducts.length > 0 && (
										<CompareProductList
											products={compareProducts}
											onClearAllClick={removeAllProductFromCompareList}
											onRemoveCompareProduct={
												removeProductFromCompareList
											}
										/>
									)}
								</Tab.Panel>
							</Tab.Group>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}; // End of Trending_page

export const getServerSideProps: GetServerSideProps = async ({
	locale
}) => {
	const categories = await getTrendingCategories();
	return {
		props: {
			...(await serverSideTranslations(locale || 'en')),
			categories
		}
	};
}; // End of getServerSideProps function

export default Trending_page;
