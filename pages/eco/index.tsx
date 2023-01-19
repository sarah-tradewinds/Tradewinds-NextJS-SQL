// Third party packages
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useSWR from 'swr';

// components
import Button from 'components/common/form/button';
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
		if (!isEco) {
			setIsEco();
		}
		return () => {};
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
													{searchCategoriesBanner}
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
						{searchCategoriesBanner}
					</div>

					{/* Shop by country and ads */}
					<div className="space-y-8 lg:mx-[23px]">
						{/* Shop by country */}
						<div className="mt-[30px] h-[78.75px] bg-error md:h-[81px] lg:h-[168px]">
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
