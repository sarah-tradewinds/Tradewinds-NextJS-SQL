import Button from 'components/website/common/form/button';
import AddBanner from 'components/website/home/ads-banner';
import CategorySubCategoriesSection from 'components/website/home/category-sub-categories-section';
import CountrySlider from 'components/website/home/country-slider';
import Hero from 'components/website/home/hero';
import {
	AgriData,
	apparelData,
	beautyData,
	countries,
	fabricData,
	fashionData,
	healthData,
	HeroCarouselData
} from 'data/home';
import { CatSubCatSectionType, HeroCarouselType } from 'types/home';

type Props = {
	heroCarouselData: HeroCarouselType[];
	agriData: CatSubCatSectionType;
};

const Home = ({ heroCarouselData, agriData }: Props) => {
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

	return (
		<>
			<Hero hcd={heroCarouselData} />

			<div className="mt-12 space-y-12 md:mt-0 md:space-y-8 md:px-4 lg:px-8">
				{/* Agriculture Section  */}
				<CategorySubCategoriesSection catSubCat={agriData} />
				{/* Health Section */}
				<CategorySubCategoriesSection
					catSubCat={healthData}
					isReverse={true}
					applyBgColor={true}
				/>
				{/* Apparel Section */}
				<CategorySubCategoriesSection catSubCat={apparelData} />
			</div>

			{/*  Search Categories Banner */}
			<div className="my-8 hidden md:block">
				{searchCategoriesBanner}
			</div>

			<div className="mt-12 mb-8 space-y-12 md:mt-0 md:space-y-8 md:px-4 lg:px-8">
				{/* Beauty and Personal care Section */}
				<CategorySubCategoriesSection
					catSubCat={beautyData}
					isReverse={true}
				/>
				{/* Fashion Accessories Section */}
				<CategorySubCategoriesSection
					catSubCat={fashionData}
					applyBgColor={true}
				/>
				{/* Fabric Section */}
				<CategorySubCategoriesSection
					catSubCat={fabricData}
					isReverse={true}
				/>
			</div>

			{/*  Search Categories Banner */}
			<div className="my-8 md:hidden">{searchCategoriesBanner}</div>

			<div className="space-y-8">
				{/* Shop by country */}
				<CountrySlider countries={countries} />
				{/* Bottom Banner */}
				<AddBanner />
			</div>
		</>
	);
};

export default Home;

// Static Props
export const getStaticProps = async () => {
	const heroCarouselData: HeroCarouselType[] = HeroCarouselData;
	const agriData: CatSubCatSectionType = AgriData;

	return {
		props: { heroCarouselData, agriData }
	};
};
