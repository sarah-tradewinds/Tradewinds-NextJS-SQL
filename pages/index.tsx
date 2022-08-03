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
import Button from 'components/website/common/form/button';
import Seo from 'components/website/common/seo';
import AddBanner from 'components/website/home/ads-banner';
import CategorySubCategoriesSection from 'components/website/home/category-sub-categories-section';
import CountrySlider from 'components/website/home/country-slider';
import Hero from 'components/website/home/hero';

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
import { useCategoryStore } from 'store/category-store';
import { useCountriesStore } from 'store/countries-store';
import { useHomeStore } from 'store/home';
import { CatSubCatSectionType, HeroCarouselType } from 'types/home';
import { getLocaleText } from 'utils/get_locale_text';

type Props = {
	heroCarouselData: HeroCarouselType[];
	agriData: CatSubCatSectionType;
};

const HomePage: NextPage<
	InferGetServerSidePropsType<GetServerSideProps>
> = (props) => {
	const {
		heroCarousels = [],
		cardAList = [],
		cardBData = {},
		homeMainCategoriesAndCategories = [],
		homeCountries = [],
		homeAdvertisements = []
	} = props;

	const { isEco } = useHomeStore(({ isEco }) => ({
		isEco
	}));

	// Loading mega-menu data here
	const { fetchMainCategories, removeCategoryFilter } =
		useCategoryStore((state) => ({
			fetchMainCategories: state.fetchMainCategories,
			removeCategoryFilter: state.removeCategoryFilter
		}));

	const { t } = useTranslation();

	const {
		setSelectedCountry,
		fetchCountries,
		removeSelectedCountries
	} = useCountriesStore((state) => ({
		setSelectedCountry: state.setSelectedCountry,
		fetchCountries: state.fetchCountries,
		removeSelectedCountries: state.removeSelectedCountries
	}));

	// Fetching countries
	useEffect(() => {
		fetchCountries(homeCountries);
		removeSelectedCountries();
	}, []);

	useEffect(() => {
		fetchMainCategories();
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

			<div className="container mx-auto md:px-4 lg:-mt-[30px] lg:px-8">
				{/* Category and sub categories */}
				<div className="mt-12 space-y-12 md:mt-0 md:space-y-8">
					{homeMainCategoriesAndCategories.cat_section &&
						homeMainCategoriesAndCategories?.cat_section.map(
							(
								homeMainCategoryAndCategories: CatSubCatSectionType,
								index: number
							) => {
								const canIDisplayFlags = Math.floor(
									homeMainCategoriesAndCategories?.cat_section?.length /
										2
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
							countries={homeCountries}
							onCountryClick={(country) => {
								removeCategoryFilter();
								setSelectedCountry(
									country.id,
									getLocaleText(country.name || {}, router.locale)
								);
								router.push('/product-search');
							}}
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
		</>
	);
};

export default HomePage;

// Static Props
export const getServerSideProps: GetServerSideProps = async ({
	locale
}) => {
	try {
		const heroCarousels = await getHeroCarousels();
		const cardAList = await getCardAList();
		const cardBData = await getCardB();
		const homeMainCategoriesAndCategories =
			await getHomeMainCategoriesAndCategories();
		const homeCountries = await getHomeCountries();
		const homeAdvertisements = await getHomeAdvertisements();

		return {
			props: {
				...(await serverSideTranslations(locale || 'en')),

				heroCarousels,
				cardAList,
				cardBData,
				homeMainCategoriesAndCategories:
					homeMainCategoriesAndCategories ?? {
						cat_section: [],
						is_custom: false
					},
				homeCountries,
				homeAdvertisements
			}
		};
	} catch (error) {
		console.log((error as any).message);
		return {
			props: {
				...(await serverSideTranslations(locale || 'en')),
				heroCarousels: [],
				cardAList: [],
				cardBData: {},
				homeMainCategoriesAndCategories: {
					cat_section: [],
					is_custom: false
				},
				homeCountries: [],
				homeAdvertisements: []
			}
		};
	}
};
