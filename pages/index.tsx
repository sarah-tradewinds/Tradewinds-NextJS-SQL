import {
	GetServerSideProps,
	InferGetServerSidePropsType,
	NextPage
} from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// Third party packages
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// components
import Seo from 'components/common/seo';
import CountrySlider from 'components/home/country-slider';
import Hero from 'components/home/hero';

// lib
import {
	getCardAList,
	getCardB,
	getHeroCarousels,
	getHomeCountries,
	getHomeMainCategoriesAndCategories
} from 'lib/home.lib';

// stores
import HomeCategorySubCategoriesSection from 'components/home/home-category-sub-categories-section';
import Link from 'next/link';
import { useCountriesStore } from 'store/countries-store';
import { useHomeStore } from 'store/home';
import useSWR from 'swr';
import { CatSubCatSectionType } from 'types/home';

// const HomePage: NextPage<InferGetStaticPropsType<GetStaticProps>> = (
const HomePage: NextPage<
	InferGetServerSidePropsType<GetServerSideProps>
> = (props) => {
	const {
		cardAList = [],
		cardBData = {},
		homeMainCategoriesAndCategories = []
	} = props;

	// Fetching Hero carousel
	const { data: heroCarousels = [] } = useSWR(
		'/cms/carousel?isEco=false',
		() => getHeroCarousels(false)
	);

	console.log('[heroCarousels] =', heroCarousels);

	// Fetching Countries
	const { data: homeCountries, isValidating: isCountriesValidating } =
		useSWR(
			'/region/all/region-countries?limit=100000',
			getHomeCountries
		);

	const { isEco } = useHomeStore(({ isEco }) => ({
		isEco
	}));

	const { t } = useTranslation();

	const { fetchCountries, removeSelectedCountries } = useCountriesStore(
		(state) => ({
			setSelectedCountry: state.setSelectedCountry,
			fetchCountries: state.fetchCountries,
			removeSelectedCountries: state.removeSelectedCountries
		})
	);

	// Fetching countries
	useEffect(() => {
		fetchCountries(homeCountries);
		removeSelectedCountries();
	}, []);

	const searchCategoriesAndTrendingBanner = (
		<div className="grid gap-4 md:h-[86px] md:grid-cols-2 lg:h-[126px] xl:h-[148px]">
			<div className="flex items-center justify-center rounded-md bg-accent-primary-main dark:bg-accent-primary-eco">
				<Link
					href="/6500-categories"
					className="space-y-1 text-center font-semibold text-white"
				>
					<p className="md:text-[22.79px] md:leading-[17.78px] lg:text-[25.28px] lg:leading-[19.72px] xl:text-[31.48px] xl:leading-[24.56px]">
						{t('home:search_from')}
					</p>
					<p className="md:text-[37.6px] md:leading-[29.33px] lg:text-[41.71px] lg:leading-[32.54px] xl:text-[51.94px] xl:leading-[40.52px]">
						6,500 {t('home:categories')}
					</p>
				</Link>
			</div>

			{/* Trending section */}
			<div className="bg-contains items-center justify-end rounded-md bg-[url('/images/what-is-trending.svg')] bg-left bg-no-repeat md:flex">
				<Link
					href="/whats-trending"
					className="font-semibold text-white md:mr-8 md:text-[21px] md:leading-[26px] lg:text-[28.72px] lg:leading-[35.56px] xl:text-[35.76px] xl:leading-[44.28px]"
				>
					{t('What’s Trending')}
				</Link>
			</div>
		</div>
	);

	const router = useRouter();

	return (
		<>
			<Seo
				title={t('home:meta_title')}
				description={t('home:meta_description')}
			/>
			<div className="3xl:container 3xl:w-[1700px]">
				<Hero
					hcd={heroCarousels}
					cardAList={cardAList}
					cardBData={cardBData}
				/>

				<div className="mt-[27px] lg:container">
					{/* Category and sub categories */}
					<div className="mx-2 space-y-[33px] sm:mx-4 sm:space-y-[42px] md:space-y-[20px] desktop:space-y-[27px]">
						{homeMainCategoriesAndCategories?.cat_section &&
							homeMainCategoriesAndCategories?.cat_section?.map(
								(
									homeMainCategoryAndCategories: CatSubCatSectionType,
									index: number
								) => {
									const canIDisplayFlags = Math.floor(
										homeMainCategoriesAndCategories?.cat_section
											?.length / 2
									);

									return (
										<>
											<HomeCategorySubCategoriesSection
												key={
													homeMainCategoryAndCategories.main_category.id
												}
												catSubCat={homeMainCategoryAndCategories}
												isCustom={
													homeMainCategoriesAndCategories.is_custom
												}
											/>

											{/*  Search Categories Banner */}
											{canIDisplayFlags === index && (
												<div className="hidden md:block">
													{/* <div className="flex items-center bg-accent-primary-main  text-white dark:bg-accent-primary-eco md:h-[85.8px] lg:h-[114.51px] lg:justify-between xl:h-[143px]">
														<h3 className="text-[33px] font-semibold md:ml-[26.4px] lg:text-[55px] lg:leading-[46px] xl:leading-[67.05px] desktop:text-[72px] desktop:leading-[87.77px]">
															{t('home:search_from')} 6500{' '}
															{t('home:categories')}
														</h3>
														<Link
															href="/6500-categories"
															className="flex items-center justify-center bg-secondary md:ml-[33.4px] md:h-[28.8px] md:w-[141.6px] md:text-[12.6px] md:font-semibold lg:mr-[67.27px] lg:h-[38.44px] lg:w-[188.98px] lg:text-[16.82px] lg:leading-[20.5px] xl:h-[48px] xl:w-[236px] xl:text-[21px] xl:leading-[25.6px]"
														>
															{t('common:search_more')}
															<span className="hidden md:inline-block lg:pl-2">
																{' >'}
															</span>
														</Link>
													</div> */}

													{searchCategoriesAndTrendingBanner}
												</div>
											)}
										</>
									);
								}
							)}

						{/*  Search Categories Banner */}
						<Link
							href="/categories"
							className="flex h-[67px] w-full items-center justify-center rounded-md bg-accent-primary-main text-[21px] font-semibold text-white md:hidden"
						>
							Explore all Categories
						</Link>

						{/* What’s Trending */}
						<Link
							href="/whats-trending"
							className="flex h-[67px] w-full items-center justify-center rounded-md bg-[#6D1818] text-[21px] font-semibold text-white md:hidden"
						>
							What’s Trending
						</Link>

						{/*  Search Categories And Trending Banner */}
						{/* <div className="mb-[45.25px] mt-[30px] hidden md:my-[30px] md:block">
							{searchCategoriesAndTrendingBanner}
						</div> */}

						<div className="hidden h-[79px] w-full overflow-hidden rounded-md sm:block md:h-[102px] lg:h-[136.13px] xl:h-[170px]">
							<CountrySlider
								key={homeCountries?.length}
								countries={homeCountries}
								onCountryClick={(country) => {
									router.push(
										`/product-search?region=${country?.region_id}_${
											country?.edges?.region?.name?.en
										}&country=${country?.id}_${country?.name?.en || ''}`
									);
								}}
								isLoading={isCountriesValidating && !homeCountries}
								className="overflow-hidden md:!rounded-md"
							/>
						</div>
					</div>

					{/* Shop by country and ads */}
					<div className="space-y-8 lg:mx-[23px]">
						{/* Shop by country */}
						<div className="mt-[30px] h-[78.75px] sm:hidden md:h-[81px] lg:h-[168px]">
							<CountrySlider
								key={homeCountries?.length}
								countries={homeCountries}
								onCountryClick={(country) => {
									router.push(
										`/product-search?region=${country?.region_id}_${
											country?.edges?.region?.name?.en
										}&country=${country?.id}_${country?.name?.en || ''}`
									);
								}}
								isLoading={isCountriesValidating && !homeCountries}
								className="overflow-hidden md:!rounded-md"
							/>
						</div>

						{/* Bottom ADS Banner */}
						{/* <div className="mt-[30px] grid grid-cols-2">
							{homeAdvertisements.map((advertisement: any) => (
								<AddBanner
									key={advertisement.id}
									iframe_code={advertisement.i_frame_code}
								/>
							))}
						</div> */}
					</div>
				</div>
			</div>
		</>
	);
};

export default HomePage;

// Static Props
// export const getStaticProps: GetStaticProps = async ({ locale }) => {
export const getServerSideProps: GetServerSideProps = async ({
	locale
}) => {
	const dateS = new Date();
	console.log(
		'Home page = [getServerSideProps] started data fetching',
		dateS.toLocaleTimeString()
	);

	try {
		const cardAList = (await getCardAList()) || [];
		// console.log('cardAList', cardAList);
		const cardBData = (await getCardB()) || {};

		const homeMainCategoriesAndCategories =
			await getHomeMainCategoriesAndCategories();

		return {
			props: {
				...(await serverSideTranslations(locale || 'en')),

				cardAList,
				cardBData,
				homeMainCategoriesAndCategories:
					homeMainCategoriesAndCategories ?? {
						cat_section: [],
						is_custom: false
					}

				// cardAList: [],
				// cardBData: []
				// homeMainCategoriesAndCategories: []
			}
		};
	} catch (error) {
		console.log((error as any).message);
		return {
			props: {
				...(await serverSideTranslations(locale || 'en')),

				cardAList: [],
				cardBData: {},
				homeMainCategoriesAndCategories: {
					cat_section: [],
					is_custom: false
				},
				homeCountries: []
			}
		};
	}
};
