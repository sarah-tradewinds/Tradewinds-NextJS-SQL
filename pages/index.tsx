import {
	GetStaticProps,
	InferGetStaticPropsType,
	NextPage
} from 'next';

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
	getHomeCategories,
	getHomeCountries
} from 'lib/home.lib';

import Seo from 'components/website/common/seo';
import { useEffect } from 'react';
import { useCategoryStore } from 'store/category-store';
import { CatSubCatSectionType, HeroCarouselType } from 'types/home';

type Props = {
	heroCarouselData: HeroCarouselType[];
	agriData: CatSubCatSectionType;
};

const HomePage: NextPage<InferGetStaticPropsType<GetStaticProps>> = (
	props
) => {
	const {
		heroCarousels = [],
		cardAList = [],
		cardBData = {},
		homeCategories = [],
		homeCountries = [],
		homeAdvertisments = []
	} = props;

	// Loading mega-menu data here
	const fetchCategories = useCategoryStore(
		(state) => state.fetchCategories
	);
	useEffect(() => {
		fetchCategories();
	}, []);

	const searchCategoriesBanner = (
		<div className="flex items-center justify-center bg-accent-primary-main p-4 text-white dark:bg-accent-primary-eco md:p-8 xl:p-14">
			<h3 className="text-[21px] leading-[26px] md:mr-8 md:text-[48px] md:leading-[44px] lg:whitespace-nowrap xl:text-[72px]">
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
			<Seo title="Home page" description="" />
			<Hero
				hcd={heroCarousels}
				cardAList={cardAList}
				cardBData={cardBData}
			/>

			{/* Category and sub categories */}
			<div className="mt-12 space-y-12 md:mt-0 md:space-y-8 md:px-4 lg:px-8">
				{homeCategories &&
					homeCategories.map(
						(homeCategory: CatSubCatSectionType, index: number) => {
							const canIDisplayFlags = Math.floor(
								homeCategories.length / 2
							);
							if (index !== 0) {
								isReverse = !isReverse;
							}
							return (
								<>
									<CategorySubCategoriesSection
										key={homeCategory.category.id}
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
export const getStaticProps: GetStaticProps = async () => {
	try {
		const heroCarousels = await getHeroCarousels();
		const cardAList = await getCardAList();
		const cardBData = await getCardB();
		const homeCategories = await getHomeCategories();
		const homeCountries = await getHomeCountries();
		const homeAdvertisments = await getHomeAdvertisments();

		return {
			props: {
				heroCarousels,
				cardAList,
				cardBData,
				homeCategories: homeCategories ?? [],
				// homeCountries,
				// homeAdvertisments

				// TMP
				// heroCarousels: [],
				// cardAList: [],
				// cardBData: {},
				// homeCategories: [],
				homeCountries: [],
				homeAdvertisments: []
			}
		};
	} catch (error) {
		console.log((error as any).message);
		return {
			props: {
				heroCarousels: [],
				cardAList: [],
				cardBData: {},
				homeCategories: [],
				homeCountries: []
			}
			// revalidate: 30
		};
	}
};
