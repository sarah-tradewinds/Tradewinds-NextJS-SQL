import {
	GetStaticProps,
	InferGetStaticPropsType,
	GetServerSideProps,
	InferGetServerSidePropsType,
	NextPage
} from 'next';
import Link from 'next/link';

// Third party packages
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useSWR from 'swr';

// components
import Button from 'components/common/form/button';
import CountrySlider from 'components/home/country-slider';
import Hero from 'components/home/hero';

// lib
import {
	getCardAList,
	getCardB,
	getHeroCarousels,
	getHomeCountries
} from 'lib/home.lib';

import Seo from 'components/common/seo';
import HomeCategorySubCategoriesSection from 'components/home/home-category-sub-categories-section';
import { getEcoHomeMainCategoriesAndCategories } from 'lib/eco/eco-home.lib';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useHomeStore } from 'store/home';
import { CatSubCatSectionType } from 'types/home';

// const HomePage: NextPage<InferGetStaticPropsType<GetStaticProps>> = (
const HomePage: NextPage<InferGetServerSidePropsType<GetServerSideProps>> = (
	props
) => {
	const {
		// heroCarousels = [],
		cardAList = [],
		cardBData = {},
		homeMainCategoriesAndCategories = [],
		is_eco
	} = props;

	// Fetching Hero carousel
	const { data: heroCarousels = [], error: heroCarouselsError } =
		useSWR(`/cms/carousel?isEco=${true}`, () => getHeroCarousels(true));

	// Fetching Countries
	const {
		data: homeCountries = [],
		isValidating: isCountriesValidating
	} = useSWR('/region_country/all', getHomeCountries);

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

	const searchCategoriesAndTrendingBanner = (
		<div className="grid gap-4 lg:grid-cols-2">
			<div className="flex h-[78.75px] items-center bg-accent-primary-eco p-3 text-white dark:bg-header-bar md:space-y-2 lg:h-[143px] lg:flex-col lg:p-0">
				<h3 className="text-[21px] font-semibold leading-[26px] md:text-[35px] lg:text-center lg:text-[35px] lg:leading-[43px]">
					{'search_from'}
					<span className="inline-block lg:mx-3 lg:text-[60px] lg:leading-[73px]">
						6,500
					</span>
					{'categories'}
				</h3>
				<Button
					href={`/6500-categories?is_eco=${true}`}
					variant="special"
					className="!min-h-[20px] whitespace-nowrap !px-4 !py-0 !text-[11px] !leading-[13px] md:h-auto lg:!h-[48px] lg:!min-h-[48px] lg:!w-[236px] lg:!text-[21px] lg:!leading-[26px]"
				>
					{'search_more'}
					<span className="hidden md:inline-block lg:pl-2">{' >'}</span>
				</Button>
			</div>

			{/* Trending section */}
			<div className="hidden items-center justify-end bg-[url('/latest-trend-image.png')] bg-left p-3 md:flex">
				<div className="flex flex-col items-center space-y-2 ">
					<h3 className="text-[18px] font-semibold leading-[26px] text-white md:mr-8 md:text-[35px] lg:leading-[43px]">
						{'Find the latest Trends'}
					</h3>
					<Button
						// href={`/product-search?is_trending=${true}`}
						href="/whats-trending"
						className="border-2 border-secondary !text-[21px] font-bold text-secondary lg:!h-[48px] lg:!leading-[26px] pc:!rounded-full"
					>
						See Trends
					</Button>
				</div>
			</div>
		</div>
	);

	const router = useRouter();
	const { t } = useTranslation();

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
													<div className="bg-accent-eco flex items-center  text-white dark:bg-accent-primary-eco md:h-[85.8px] lg:h-[114.51px] lg:justify-between xl:h-[143px]">
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
													</div>
												</div>
											)}
										</>
									);
								}
							)}

						{/*  Search Categories Banner */}
						<Link
							href="/6500-categories"
							className="flex h-[67px] w-full items-center justify-center rounded-md bg-accent-primary-eco text-[21px] font-semibold text-white md:hidden"
						>
							Explore all Categories
						</Link>

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

					{/*  Search Categories Banner */}
					<div className="mb-[45.25px] mt-[30px] hidden md:my-[30px] md:hidden">
						{searchCategoriesAndTrendingBanner}
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

// export const getStaticProps: GetStaticProps = async ({ locale }) => {
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	try {
		// const heroCarousels = await getHeroCarousels(true);
		// console.log(
		// 	'heroCarousels-heroCarousels-heroCarousels =',
		// 	heroCarousels
		// );
		const cardAList = await getCardAList(true);
		const cardBData = await getCardB(true);
		const homeMainCategoriesAndCategories =
			await getEcoHomeMainCategoriesAndCategories();

		return {
			props: {
				...(await serverSideTranslations(locale || 'en')),

				// heroCarousels,
				cardAList,
				cardBData,
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

				heroCarousels: [],
				cardAList: [],
				cardBData: {},
				homeMainCategoriesAndCategories: {
					cat_section: [],
					is_custom: true
				},
				is_eco: true
			}
		};
	}
};
