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
import Button from 'components/common/form/button';
import Seo from 'components/common/seo';
import AddBanner from 'components/home/ads-banner';
import CategorySubCategoriesSection from 'components/home/category-sub-categories-section';
import CountrySlider from 'components/home/country-slider';
import Hero from 'components/home/hero';

// lib
import {
	getCardAList,
	getCardB,
	getHeroCarousels,
	getHomeAdvertisements,
	getHomeCountries,
	getHomeMainCategoriesAndCategories
} from 'lib/home.lib';

// stores
import { useCountriesStore } from 'store/countries-store';
import { useHomeStore } from 'store/home';
import useSWR from 'swr';
import { CatSubCatSectionType } from 'types/home';

const HomePage: NextPage<
	InferGetServerSidePropsType<GetServerSideProps>
> = (props) => {
	const {
		cardAList = [],
		cardBData = {},
		homeMainCategoriesAndCategories = []
	} = props;

	// Fetching Hero carousel
	const { data: heroCarousels = [], error: heroCarouselsError } =
		useSWR('/carousel/getallcarousel', getHeroCarousels);

	// Fetching Countries
	const { data: homeCountries, isValidating: isCountriesValidating } =
		useSWR('/region_country/all', getHomeCountries);

	// Fetching Advertisement
	const { data: homeAdvertisements = [], error } = useSWR(
		'/advertisement/getalladvertisement',
		getHomeAdvertisements
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
		<div className="grid gap-4 lg:grid-cols-2">
			<div className="flex items-center bg-accent-primary-main p-3 text-white dark:bg-accent-primary-eco md:space-y-4 md:rounded-md lg:flex-col">
				<h3 className="text-[21px] font-semibold leading-[26px] md:mr-8 md:text-[35px]">
					{t('home:search_from_6500_categories')}
				</h3>
				<Button
					href="/6500-categories"
					variant="special"
					className="whitespace-nowrap !px-4 pc:!rounded-full"
				>
					{t('common:search_more')}
					<span className="hidden md:inline-block">{' >'}</span>
				</Button>
			</div>

			{/* Trending section */}
			<div className="flex items-center justify-end bg-[url('/latest-trend-image.png')] bg-left p-3 md:rounded-md">
				<div className="flex flex-col items-center space-y-2 ">
					<h3 className="text-[18px] font-semibold leading-[26px] text-white md:mr-8 md:text-[35px]">
						{t('Find the latest Trends')}
					</h3>
					<Button
						href={`/product-search?is_trending=${true}`}
						className="border-2 border-secondary text-[21px] font-bold text-secondary pc:!rounded-full"
					>
						See Trends
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

			{/* <div className="desktop:mt-[31px]s container mx-auto md:px-4 lg:px-8"> */}
			<div className="md:container">
				<div className="mt-12 md:mt-48 lg:-mt-14">
					{/* Category and sub categories */}
					{/* <div className="mt-12 space-y-12 md:mt-0 md:space-y-8"> */}
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
					<div className="my-[30px] md:hidden">
						{searchCategoriesAndTrendingBanner}
					</div>

					{/* Shop by country and ads */}
					<div className="space-y-8">
						{/* Shop by country */}
						<div className="mt-[30px]">
							<CountrySlider
								key={homeCountries?.length}
								countries={homeCountries}
								onCountryClick={(country) => {
									router.push(
										`/product-search?region=${country?.region?.id}_${
											country?.region?.name
										}&country=${country?.id}_${country?.name?.en || ''}`
									);
								}}
								isLoading={isCountriesValidating && !homeCountries}
								className="overflow-hidden md:!rounded-md"
							/>
						</div>

						{/* Bottom ADS Banner */}
						<div className="mt-[30px] grid grid-cols-2">
							{homeAdvertisements.map((advertisement: any) => (
								<AddBanner
									key={advertisement.id}
									iframe_code={advertisement.i_frame_code}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default HomePage;

// Static Props
export const getServerSideProps: GetServerSideProps = async ({
	locale
}) => {
	try {
		const cardAList = await getCardAList();
		const cardBData = await getCardB();

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
