// Third party packages
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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
	getHomeAdvertisments,
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
import { useHomeStore } from 'store/home';
import { CatSubCatSectionType } from 'types/home';

const HomePage: NextPage<InferGetStaticPropsType<GetStaticProps>> = (
	props
) => {
	const {
		heroCarousels = [],
		cardAList = [],
		cardBData = {},
		ecoHomeMainCategoriesAndCategories = [],
		homeCountries = [],
		homeAdvertisments = []
	} = props;

	console.log(
		'ecoHomeMainCategoriesAndCategories =',
		ecoHomeMainCategoriesAndCategories
	);

	const setIsEco = useHomeStore(({ setIsEco }) => setIsEco);

	useEffect(() => {
		setIsEco();
		return setIsEco;
	}, []);

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
				{ecoHomeMainCategoriesAndCategories &&
					ecoHomeMainCategoriesAndCategories.map(
						(homeCategory: CatSubCatSectionType, index: number) => {
							const canIDisplayFlags = Math.floor(
								ecoHomeMainCategoriesAndCategories.length / 2
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
					{homeAdvertisments.map((advertisment: any) => (
						<AddBanner
							key={advertisment.id}
							iframe_code={advertisment.i_frame_code}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default HomePage;

// Static Props

// Static Props
export const getServerSideProps: GetServerSideProps = async ({
	locale
}) => {
	try {
		const heroCarousels = await getHeroCarousels();
		const cardAList = await getCardAList();
		const cardBData = await getCardB();
		const ecoHomeMainCategoriesAndCategories =
			await getEcoHomeMainCategoriesAndCategories();
		const homeCountries = await getHomeCountries();
		const homeAdvertisments = await getHomeAdvertisments();

		return {
			props: {
				...(await serverSideTranslations(locale || 'en')),
				heroCarousels,
				cardAList,
				cardBData,
				ecoHomeMainCategoriesAndCategories:
					ecoHomeMainCategoriesAndCategories ?? [],
				homeCountries,
				homeAdvertisments
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
				ecoHomeMainCategoriesAndCategories: [],
				homeCountries: []
			}
		};
	}
};
