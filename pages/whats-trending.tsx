import { Tab } from '@headlessui/react';
import {
	GetServerSideProps,
	InferGetServerSidePropsType,
	NextPage
} from 'next';

// Third party packages
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// components
import { HiMinusCircle, HiPlusCircle } from 'react-icons/hi';
import TrendingCatagories from '../src/components/common/trending_page/trending-catagories';
import TrendingProduct from '../src/components/common/trending_page/trending-products';

// stores
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import Seo from 'components/common/seo';
import ProductFilter from 'components/product-search/product-filter/product-filter';
import ProductList from 'components/product-search/product-list';
import ProductSearchFilterBar from 'components/product-search/product-search-filter-bar';
import ProductSearchTopBanner from 'components/product-search/product-search-top-banner';
import TrendingCategorySlider from 'components/product-search/trending-category-slider';
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
	const [isExpanded1, setIsExpanded1] = useState(false);
	const [isExpanded2, setIsExpanded2] = useState(false);

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
	const setCategory = useCategoryStore((state) => state.setCategory);

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

	return (
		<div className="md:container">
			<Seo title="What's trending" description="" />

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

			{/* Banner image */}
			<div className=" relative h-[241px] w-full lg:md:h-[234px]">
				<ImageWithErrorHandler
					src="/static/images/trending_images/Catagarie banner image.png"
					alt="camera"
					fill={true}
				/>
			</div>

			{/* ProductSearchFilterBar */}
			<div className="top-[97px] z-20 hidden md:sticky md:ml-[9px]  md:mr-[10px] md:block md:pt-[14.01px]  lg:top-[101px] lg:ml-[26px] lg:mr-[23px] lg:block lg:pt-[18.14px]">
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

			{/* For mobiles only */}
			<div className=" md:hidden lg:hidden">
				{/* This is Trending Catagories */}
				<div className=" mt-[9px] flex h-[99px] w-full bg-primary-main pt-[12px] pl-[16px] not-italic text-white">
					<div>
						<p className=" h-[24px] w-[216px] text-[20px] font-semibold leading-[24px]">
							Trending Catagories
						</p>
						<p className=" h-[81px] w-[253px] pl-[3px] leading-[17px]">
							<span className=" text-[17px] font-semibold">
								Name Here
							</span>{' '}
							<span className=" text-[14px] font-semibold ">
								Lorem ipsum dolor sit amet, consecamet Lorem ipsum dolor
								sit amet,
							</span>
						</p>
					</div>

					<div
						className="mt-[60px] ml-[60px] cursor-pointer"
						onClick={() => setIsExpanded1((prevState) => !prevState)}
					>
						{isExpanded1 ? (
							<HiMinusCircle className="text-[20px] text-secondary" />
						) : (
							<HiPlusCircle className="text-[20px] text-secondary" />
						)}
					</div>
				</div>

				{isExpanded1 && (
					<TrendingCatagories categories={trendingCategories || []} />
				)}

				{/* This is Trending Products */}
				<div className=" mt-[9px] flex h-[99px] w-full bg-green pt-[12px] pl-[16px] not-italic text-white">
					<div>
						<p className=" h-[24px] w-[216px] text-[20px] font-semibold leading-[24px]">
							Trending Products
						</p>
						<p className=" h-[81px] w-[253px] pl-[3px] leading-[17px]">
							<span className=" text-[17px] font-semibold">
								Name Here
							</span>{' '}
							<span className=" text-[14px] font-semibold ">
								Lorem ipsum dolor sit amet, consecamet Lorem ipsum dolor
								sit amet,
							</span>
						</p>
					</div>
					<div
						className="mt-[60px] ml-[60px] cursor-pointer"
						onClick={() => setIsExpanded2((prevState) => !prevState)}
					>
						{isExpanded2 ? (
							<HiMinusCircle className="text-[20px] text-secondary" />
						) : (
							<HiPlusCircle className="text-[20px] text-secondary" />
						)}
					</div>
				</div>
				{isExpanded2 && <TrendingProduct />}
			</div>

			<div className="relative  hidden md:mt-[9px] md:mr-[10px] md:flex md:pl-[9px] lg:mt-[19px] lg:flex lg:pl-6">
				{/* Side container */}
				<section className=" md:mr-[13px] md:hidden  md:w-[159px] lg:mr-[25px] lg:block lg:w-[297px]">
					{/* filters */}
					<div className="md:mb-[14px] md:h-[383px] lg:mb-[17px] lg:h-[475px]">
						<ProductFilter />
					</div>

					{/* RFQ CARD */}
					<div>
						<div className="w-full space-y-2 bg-gradient-to-r from-[#E7CA00] via-[#E8A30E] to-[#E8A30E] md:h-[321px] md:rounded-lg md:pt-2 lg:h-[475px] lg:pl-5 lg:pt-6">
							{/* Image */}
							<div className="lg:flex lg:items-center">
								<div className="flex justify-center">
									<div className="relative md:h-[66.02px] md:w-[61.72px]">
										<ImageWithErrorHandler
											src="/static/rfq-box.png"
											alt="rfq box"
											fill={true}
										/>
									</div>
								</div>

								<p className="text-white md:px-[6px] md:text-[18px] md:font-bold md:leading-[22px] lg:text-[25px] lg:leading-[30px]">
									Submit an RFQ for anything!
								</p>
							</div>

							<ul className="list-disc text-white md:ml-6 md:text-[15px] md:font-semibold md:leading-[18px] lg:ml-7 lg:pt-[34px] lg:text-[25px] lg:leading-[30px]">
								<li>One request</li>
								<li>Receive multiple quotes</li>
								<li>Responed</li>
								<li>Close the deal</li>
							</ul>

							<div className="flex justify-center md:pt-[34px] lg:justify-start lg:pl-2">
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
									className="flex items-center border-none bg-white outline-none md:h-[19.88px] md:w-[125px] md:rounded-md lg:h-[39px] lg:w-[245.2px] lg:pl-1"
								>
									<div className="relative h-[15.8px] w-[18.35px] lg:h-[31px] lg:w-[36px]">
										<ImageWithErrorHandler
											src="/static/rfq-orange.png"
											alt="rfq orange icon"
											fill={true}
										/>
									</div>
									<p className="text-center text-secondary md:ml-[9.69px] md:text-[10.7054px] md:font-semibold md:leading-[13px] lg:ml-0 lg:w-full lg:text-[21px] lg:leading-[26px]">
										{t('common:submit_rfq')}
									</p>
								</button>
							</div>
						</div>
					</div>
				</section>

				<div className="md:w-[727px] lg:w-[1142px]">
					<div>
						<Tab.Group>
							{/* <Tab.List className="flex text-[25px] font-semibold md:leading-[30px] lg:leading-[30px]"> */}
							<Tab.List className="ml-4 space-x-4 text-[25px] font-semibold">
								<Tab className="w-[150px]s h-[41px] rounded-t-xl bg-white px-2 text-center outline-none">
									{({ selected }: { selected: boolean }) => (
										<p
											className={`${
												selected ? 'text-[#575858]' : 'text-[#DCDBDB]'
											}`}
										>
											Catagories
										</p>
									)}
								</Tab>
								<Tab className="h-[41px] w-[150px] rounded-t-xl bg-white text-center outline-none">
									{({ selected }: { selected: boolean }) => (
										<span
											className={`${
												selected ? 'text-[#575858]' : 'text-[#DCDBDB]'
											}`}
										>
											Products
										</span>
									)}
								</Tab>
							</Tab.List>
							<Tab.Panel>
								<div className=" -mt-[5px] flex w-full rounded-[10px] bg-white md:h-[238px] md:-space-x-[10px] lg:h-[209px] lg:space-x-[16px]">
									<div className="  md:ml-[18px] md:pt-[7px] lg:ml-[25px] lg:pt-[19px]">
										<div className=" text-[21px] font-semibold text-gray md:h-[35px] md:w-[190px] md:leading-[24px] lg:h-[32px] lg:w-[266px]">
											<p>Trending Catagories</p>
										</div>
										<div className=" md:ml[18px]  bg-primary-main md:mt-[21px] md:h-[158px] md:w-[169px] lg:mt-[0px] lg:h-[144px] lg:w-[266px]"></div>
									</div>
									<div className=" md:mt-[65px] md:h-[57px] md:w-[303px] lg:mt-[19px] lg:h-[175px] lg:w-[810px] lg:border lg:border-border">
										<div className=" relative  md:h-[156px] md:w-[518px] lg:h-[175px] lg:w-[810px]">
											<p className=" ml-[17px] text-[21px] font-bold text-primary-main">
												Undiscovered and rising
											</p>
											<ImageWithErrorHandler
												src="/static/images/trending_images/camera.png"
												alt="camera"
												fill={true}
											/>
										</div>
									</div>
								</div>
								<TrendingCatagories
									categories={trendingCategories || []}
								/>
							</Tab.Panel>
							<Tab.Panel>
								<div className="rounded-md bg-white md:mb-[10.87px] md:flex md:h-[101.13px] md:py-2 md:pl-[8.06px] lg:mb-[23px] lg:h-[209px] lg:py-[17px] lg:pl-[17px]">
									<div className="flex h-[42px] items-center p-2 md:h-full md:flex-col md:items-start md:space-x-0 md:p-0">
										<p className="text-[16px] font-semibold leading-5 text-gray md:text-[10px] md:leading-3 lg:text-[21px] lg:leading-[26px]">
											{getLocaleText(
												selectedMainCategory?.title ||
													selectedCountry?.name ||
													{},
												router.locale
											)}
										</p>
										<div className="relative h-[144px] w-[266px] bg-success">
											{/* <ImageWithErrorHandler
												key={selectedCountry?.image}
												src={selectedCountry?.image}
												alt={getLocaleText(
													selectedCountry?.name || {},
													router.locale
												)}
												fill={true}
												className="object-cover"
											/> */}
										</div>
									</div>

									{/* Category Slider for tablet and desktop  */}
									{selectedCategories?.length > 0 ? (
										<div className="hidden md:mt-[9px] md:block md:w-[402px] lg:ml-[13px] lg:mt-[35px] lg:mb-[25px] lg:h-[150px] lg:w-[838px]">
											<TrendingCategorySlider
												categories={[...selectedCategories]}
												selectedCategoryIds={selectedCategoryList || []}
												selectedTitleClassName="!border-success"
												onTileClick={(categoryId, data) => {
													const params = setCategory(
														categoryId,
														data?.title?.en
													);
													router.push(`?${params}`, undefined, {
														shallow: true
													});
												}}
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
									onCompareClick={() => {}}
								/>
							</Tab.Panel>
						</Tab.Group>
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