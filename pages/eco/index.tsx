// Third party packages
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useSWR from 'swr';

// components
import Button from 'components/common/form/button';
import CategorySubCategoriesSection from 'components/home/category-sub-categories-section';
import CountrySlider from 'components/home/country-slider';
import Hero from 'components/home/hero';

// lib
import {
	getCardAList,
	getCardB,
	getHeroCarousels,
	getHomeCountries
} from 'lib/home.lib';
import {
	GetServerSideProps,
	GetStaticProps,
	InferGetStaticPropsType,
	NextPage
} from 'next';

import { getEcoHomeMainCategoriesAndCategories } from 'lib/eco/eco-home.lib';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useHomeStore } from 'store/home';
import { CatSubCatSectionType } from 'types/home';
import { getProductSearchURL } from 'utils/common.util';

const HomePage: NextPage<InferGetStaticPropsType<GetStaticProps>> = (
	props
) => {
	const {
		cardAList = [],
		cardBData = {},
		ecoHomeMainCategoriesAndCategories = [],
		is_eco
	} = props;

	// Fetching Hero carousel
	const { data: heroCarousels = [], error: heroCarouselsError } =
		useSWR(`//cms/carousel?isEco=${true}`, () =>
			getHeroCarousels(true)
		);

	// Fetching Advertisement
	// const { data: homeAdvertisements = [], error } = useSWR(
	// 	'/advertisement/getalladvertisement',
	// 	getHomeAdvertisements
	// );

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

	// const searchCategoriesBanner = (
	// 	<div className="flex items-center justify-center bg-accent-primary-main p-4 text-white dark:bg-accent-primary-eco md:p-8 lg:p-14">
	// 		<h3 className="text-[21px] leading-[26px] md:mr-8 md:text-[48px] md:leading-[44px] lg:whitespace-nowrap lg:text-[72px]">
	// 			Search from 6,500 categories
	// 		</h3>
	// 		<Button
	// 			href={`/6500-categories?is_eco=${true}`}
	// 			variant="special"
	// 			className="whitespace-nowrap !px-4"
	// 		>
	// 			Search More
	// 			{' >'}
	// 		</Button>
	// 	</div>
	// );
	const searchCategoriesAndTrendingBanner = (
		<div className="grid gap-4 lg:grid-cols-2">
			<div className="flex h-[78.75px] items-center bg-accent-primary-main p-3 text-white dark:bg-header-bar md:space-y-2 lg:h-[143px] lg:flex-col lg:p-0">
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

	let isReverse = false;

	return (
		<>
			<Hero
				hcd={heroCarousels}
				cardAList={cardAList}
				cardBData={cardBData}
			/>

			{/* Category and sub categories */}
			{/* <div className="mt-12 space-y-12 md:mt-0 md:space-y-8 md:px-4 lg:px-8"> */}
			<div className="md:container">
				<div className="mt-12 md:mt-48 lg:-mt-14">
					<div className="space-y-[41px] lg:mx-[23px] lg:space-y-[27px]">
						{ecoHomeMainCategoriesAndCategories?.cat_section &&
							ecoHomeMainCategoriesAndCategories?.cat_section?.map(
								(homeCategory: CatSubCatSectionType, index: number) => {
									const canIDisplayFlags = Math.floor(
										ecoHomeMainCategoriesAndCategories?.cat_section
											?.length / 2
									);

									if (index !== 0) {
										isReverse = !isReverse;
									}

									return (
										<>
											<CategorySubCategoriesSection
												key={homeCategory.main_category.id}
												catSubCat={homeCategory}
												isReverse={isReverse}
												isCustom={
													ecoHomeMainCategoriesAndCategories.is_custom
												}
											/>

											{/*  Search Categories Banner */}
											{canIDisplayFlags === index && (
												<div className="my-8 hidden md:block">
													{searchCategoriesAndTrendingBanner}
												</div>
											)}
										</>
									);
								}
							)}
					</div>

					{/*  Search Categories Banner */}
					{/* <div className="my-8 md:hidden"> */}
					<div className="my-[30px] md:hidden">
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
									getProductSearchURL(router, {
										region: `${country?.region?.id}_${country?.region?.name}`,
										country: `${country?.id}_${country?.name?.en || ''}`
									});
									// router.push(
									// 	`/product-search?region=${country?.region?.id}_${
									// 		country?.region?.name
									// 	}&country=${country?.id}_${country?.name?.en || ''}`
									// );
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

export const getServerSideProps: GetServerSideProps = async ({
	locale
}) => {
	try {
		const cardAList = await getCardAList(true);
		const cardBData = await getCardB(true);
		const ecoHomeMainCategoriesAndCategories =
			await getEcoHomeMainCategoriesAndCategories();

		return {
			props: {
				...(await serverSideTranslations(locale || 'en')),
				cardAList,
				cardBData,
				ecoHomeMainCategoriesAndCategories:
					ecoHomeMainCategoriesAndCategories ?? {
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
				cardAList: [],
				cardBData: {},
				ecoHomeMainCategoriesAndCategories: {
					cat_section: [],
					is_custom: true
				},
				is_eco: true
			}
		};
	}
};
