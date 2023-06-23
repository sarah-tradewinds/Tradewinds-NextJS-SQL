import {
	GetStaticProps,
	InferGetStaticPropsType,
	NextPage
} from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// Third party packages
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// components
import Button from 'components/common/form/button';
import Seo from 'components/common/seo';
import CategorySubCategoriesSection from 'components/home/category-sub-categories-section';
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
import { useCountriesStore } from 'store/countries-store';
import { useHomeStore } from 'store/home';
import useSWR from 'swr';
import { CatSubCatSectionType } from 'types/home';

const HomePage: NextPage<InferGetStaticPropsType<GetStaticProps>> = (
	props
) => {
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

	// Fetching Advertisement
	// const { data: homeAdvertisements = [], error } = useSWR(
	// 	'/advertisement/getalladvertisement',
	// 	getHomeAdvertisements
	// );

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
		// <div className="grid gap-4 lg:grid-cols-2">
		<div className="grid gap-4 md:grid-cols-2 2xl:!grid-cols-2 desktop:grid-cols-1">
			<div className="flex h-[78.75px] items-center space-x-2 bg-accent-primary-main p-3 text-white dark:bg-accent-primary-eco md:h-[143px] md:space-y-2 lg:w-auto lg:flex-col lg:p-0">
				<h3 className="text-[21px] font-semibold leading-[26px] md:text-[35px] lg:text-center lg:text-[35px] lg:leading-[43px] ">
					<span>{t('home:search_from')} </span>
					<span className="inline-block pr-2 lg:mx-3 lg:text-[60px] lg:leading-[73px]">
						6500
					</span>
					<span className="inline-block">{t('home:categories')}</span>
				</h3>
				<Button
					href="/6500-categories"
					variant="special"
					className="md:h-autos !min-h-[20px] whitespace-nowrap !px-4 !py-0 !text-[11px] !leading-[13px]  md:!h-[48px] md:!min-h-[48px] lg:!w-[236px] lg:!text-[21px] lg:!leading-[26px]"
				>
					{t('common:search_more')}
					<span className="hidden md:inline-block lg:pl-2">{' >'}</span>
				</Button>
			</div>

			{/* Trending section */}
			<div className="hidden items-center justify-end bg-[url('/latest-trend-image.png')] bg-left p-3 md:flex 2xl:!flex desktop:hidden">
				<div className="flex flex-col items-center space-y-2 ">
					<h3 className="text-[18px] font-semibold leading-[26px] text-white md:mr-8 md:text-[35px] lg:leading-[43px]">
						{t('home:find_the_latest_trends')}
					</h3>
					<Button
						href="/whats-trending"
						className="border-2 border-secondary !text-[21px] font-bold text-secondary lg:!h-[48px] lg:!leading-[26px] pc:!rounded-full"
					>
						{t('home:see_trends')}
					</Button>
				</div>
			</div>
		</div>
	);

	const router = useRouter();

	let isReverse = false;

	return (
		<>
			<Seo
				title={t('home:meta_title')}
				description={t('home:meta_description')}
			/>
			<Hero
				hcd={heroCarousels}
				cardAList={cardAList}
				cardBData={cardBData}
			/>

			<div className="md:containers">
				<div className="mt-20 md:-mt-14 lg:!mt-36 tablet:-mt-10 desktop:-mt-14">
					{/* Category and sub categories */}
					<div className="space-y-[41px] lg:mx-[23px] lg:space-y-[27px]">
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

									if (index !== 0) {
										isReverse = !isReverse;
									}

									return (
										<>
											<CategorySubCategoriesSection
												key={
													homeMainCategoryAndCategories.main_category.id
												}
												catSubCat={homeMainCategoryAndCategories}
												isCustom={
													homeMainCategoriesAndCategories.is_custom
												}
												isReverse={isReverse}
											/>
											{/*  Search Categories Banner */}
											{canIDisplayFlags === index && (
												<div className="my-[30px] hidden md:block">
													{searchCategoriesAndTrendingBanner}
												</div>
											)}
										</>
									);
								}
							)}
					</div>

					{/*  Search Categories Banner */}
					<div className="mb-[45.25px] mt-[30px] md:my-[30px] md:hidden">
						{searchCategoriesAndTrendingBanner}
					</div>

					{/* Shop by country and ads */}
					<div className="space-y-8 lg:mx-[23px]">
						{/* Shop by country */}
						<div className="mt-[30px] h-[78.75px] md:h-[81px] lg:h-[168px]">
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
export const getStaticProps: GetStaticProps = async ({ locale }) => {
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
			// revalidate: 1440
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
