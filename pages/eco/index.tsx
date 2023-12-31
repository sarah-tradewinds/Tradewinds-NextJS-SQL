import {
	GetServerSideProps,
	GetStaticProps,
	InferGetServerSidePropsType,
	NextPage
} from 'next';
import Link from 'next/link';

// Third party packages
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useSWR from 'swr';

// components
import CountrySlider from 'components/home/country-slider';
import Hero from 'components/home/hero';

// lib
import { getCardAList, getCardB, getHeroCarousels } from 'lib/home.lib';

import Seo from 'components/common/seo';
import HomeCategorySubCategoriesSection from 'components/home/home-category-sub-categories-section';
import { getEcoHomeMainCategoriesAndCategories } from 'lib/eco/eco-home.lib';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useHomeStore } from 'store/home';
import { CatSubCatSectionType } from 'types/home';

// const HomePage: NextPage<InferGetStaticPropsType<GetStaticProps>> = (
const HomePage: NextPage<
	InferGetServerSidePropsType<GetServerSideProps>
> = (props) => {
	const { homeMainCategoriesAndCategories = [], is_eco = true } = props;

	// Fetching Hero carousel
	const { data: heroCarousels = [], isLoading: isHeroCarouselLoading } =
		useSWR('/cms/carousel?isEco=true', () => getHeroCarousels(true));
	// Fetching cardA
	const { data: cardAList = [], isLoading: isCardALoading } = useSWR(
		'/cms/cardA?isEco=true',
		() => getCardAList(true)
	);

	// Fetching CardB
	const { data: cardBData = [], isLoading: isCardBLoading } = useSWR(
		'/cms/cardB?isEco=true',
		() => getCardB(true)
	);

	const { setIsEco, isEco } = useHomeStore(({ setIsEco, isEco }) => ({
		setIsEco,
		isEco
	}));

	// enabling eco mode
	useEffect(() => {
		if (!isEco || is_eco) {
			setIsEco(is_eco);
		}
	}, [is_eco]);

	const { t } = useTranslation();

	const searchCategoriesAndTrendingBanner = (
		<div className="grid gap-4 md:h-[86px] md:grid-cols-2 lg:h-[126px] xl:h-[148px]">
			<div className="flex items-center justify-center rounded-md bg-accent-primary-main dark:bg-header-bar 2xl:dark:bg-accent-primary-eco">
				<Link
					href="/categories"
					className="space-y-1 text-center font-semibold text-white"
				>
					<p className="md:text-[22.79px] md:leading-[17.78px] lg:text-[25.28px] lg:leading-[19.72px] xl:text-[31.48px] xl:leading-[24.56px]">
						{t('home:search_from')}
					</p>
					<p className="md:text-[37.6px] md:leading-[40.33px] lg:text-[41.71px] lg:leading-[42.54px] xl:text-[51.94px] xl:leading-[53.52px]">
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
					{t('what’s_trending')}
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
					isHeroCarouselLoading={isHeroCarouselLoading}
					isCardALoading={isCardALoading}
					isCardBLoading={isCardBLoading}
				/>

				<div className="mt-[27px] lg:container desktop:w-[1478px]">
					{/* Category and sub categories */}
					<div className="mx-2 space-y-[33px] sm:mx-4 sm:space-y-[42px] md:mx-[10px] md:space-y-[20px] lg:mx-[12px] xl:mx-5 2xl:mx-2 desktop:space-y-[27px]">
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
							className="flex h-[67px] w-full items-center justify-center rounded-md  bg-accent-primary-eco text-[21px] font-semibold text-white md:hidden"
						>
							{t('explore_all_categories')}
						</Link>

						{/* What’s Trending */}
						<Link
							href="/whats-trending"
							className="flex h-[67px] w-full items-center justify-center rounded-md bg-[#6D1818] text-[21px] font-semibold text-white md:hidden"
						>
							{t('what’s_trending')}
						</Link>

						<div className="hidden h-[79px] w-full overflow-hidden rounded-md sm:block md:h-[102px] lg:h-[136.13px] xl:h-[170px]">
							<CountrySlider
								onCountryClick={(country) => {
									router.push(
										`/product-search?region=${country?.region_id}_${
											country?.edges?.region?.name?.en
										}&country=${country?.id}_${country?.name?.en || ''}`
									);
								}}
								className="overflow-hidden md:!rounded-md"
							/>
						</div>
					</div>

					{/*  Search Categories Banner */}
					<div className="mb-[45.25px] mt-[30px] hidden md:my-[30px] md:hidden">
						{searchCategoriesAndTrendingBanner}
					</div>

					{/* Shop by country and ads */}
					<div className="space-y-8 lg:mx-[23px]">
						{/* Shop by country */}
						<div className="mt-[30px] h-[78.75px] sm:hidden md:h-[81px] lg:h-[168px]">
							<CountrySlider
								onCountryClick={(country) => {
									router.push(
										`/product-search?region=${country?.region_id}_${
											country?.edges?.region?.name?.en
										}&country=${country?.id}_${country?.name?.en || ''}`
									);
								}}
								className="overflow-hidden md:!rounded-md"
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default HomePage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	try {
		const homeMainCategoriesAndCategories =
			await getEcoHomeMainCategoriesAndCategories();

		return {
			props: {
				...(await serverSideTranslations(locale || 'en')),

				homeMainCategoriesAndCategories:
					homeMainCategoriesAndCategories ?? {
						cat_section: [],
						is_custom: true
					},
				is_eco: true
			}
		};
	} catch (error) {
		return {
			props: {
				...(await serverSideTranslations(locale || 'en')),

				homeMainCategoriesAndCategories: {
					cat_section: [],
					is_custom: true
				},
				is_eco: true
			}
		};
	}
};
