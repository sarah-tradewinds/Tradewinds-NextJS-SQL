// Third party packages
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useSWR from 'swr';

// components
import Button from 'components/website/common/form/button';
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
	getHomeCountries
} from 'lib/home.lib';
import {
	GetServerSideProps,
	GetStaticProps,
	InferGetStaticPropsType,
	NextPage
} from 'next';

import { getEcoHomeMainCategoriesAndCategories } from 'lib/eco/eco-home.lib';
import { useEffect } from 'react';
import { useCategoryStore } from 'store/category-store';
import { useHomeStore } from 'store/home';
import { CatSubCatSectionType } from 'types/home';

const HomePage: NextPage<InferGetStaticPropsType<GetStaticProps>> = (
	props
) => {
	const {
		cardAList = [],
		cardBData = {},
		ecoHomeMainCategoriesAndCategories = []
	} = props;

	// Fetching Hero carousel
	const { data: heroCarousels = [], error: heroCarouselsError } =
		useSWR('/carousel/getallcarousel', getHeroCarousels);

	// Fetching Advertisement
	const { data: homeAdvertisements = [], error } = useSWR(
		'/advertisement/getalladvertisement',
		getHomeAdvertisements
	);

	// Fetching Countries
	const { data: homeCountries = [] } = useSWR(
		'/region_country/all',
		getHomeCountries
	);

	const { setIsEco, isEco } = useHomeStore(({ setIsEco, isEco }) => ({
		setIsEco,
		isEco
	}));

	// enabling eco mode
	useEffect(() => {
		if (!isEco) {
			setIsEco();
		}
		return () => {};
	}, []);

	const { fetchMainCategories, removeCategoryFilter } =
		useCategoryStore((state) => ({
			allCategories: state.allCategories,
			fetchMainCategories: state.fetchMainCategories,
			removeCategoryFilter: state.removeCategoryFilter
		}));

	useEffect(() => {
		if (isEco) {
			fetchMainCategories(isEco);
		}
	}, [isEco]);

	const searchCategoriesBanner = (
		<div className="flex items-center justify-center bg-accent-primary-main p-4 text-white dark:bg-accent-primary-eco md:p-8 lg:p-14">
			<h3 className="text-[21px] leading-[26px] md:mr-8 md:text-[48px] md:leading-[44px] lg:whitespace-nowrap lg:text-[72px]">
				Search from 6,500 categories
			</h3>
			<Button variant="special" className="whitespace-nowrap !px-4">
				Search More
				{' >'}
			</Button>
		</div>
	);

	let isReverse = false;

	return (
		<>
			<Hero
				hcd={heroCarousels}
				cardAList={cardAList}
				cardBData={cardBData}
			/>

			{/* Category and sub categories */}
			<div className="mt-12 space-y-12 md:mt-0 md:space-y-8 md:px-4 lg:px-8">
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
											{searchCategoriesBanner}
										</div>
									)}
								</>
							);
						}
					)}
			</div>

			{/*  Search Categories Banner */}
			<div className="my-8 md:hidden">{searchCategoriesBanner}</div>

			<div className="space-y-8">
				{/* Shop by country */}
				<CountrySlider countries={homeCountries} />

				{/* Bottom Banner */}
				<div className="grid grid-cols-2">
					{homeAdvertisements.map((advertisement: any) => (
						<AddBanner
							key={advertisement.id}
							iframe_code={advertisement.i_frame_code}
						/>
					))}
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
		const cardAList = await getCardAList();
		const cardBData = await getCardB();
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
						is_custom: false
					}
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
					is_custom: false
				}
			}
		};
	}
};
