import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';
import Button from 'components/common/form/button';
import CategoryCard from 'components/home/common/category-card';
import SubCategoryCard from 'components/home/common/sub-category-card';
import CategoriesSlider from 'components/what-is-trending/categories-slider';
import { getHomeMainCategoriesAndCategories } from 'lib/home.lib';
import { getTrendingProducts } from 'lib/trending.lib';
import {
	GetServerSideProps,
	InferGetServerSidePropsType,
	NextPage
} from 'next';

// Third party packages
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { HiMinusCircle, HiPlusCircle } from 'react-icons/hi';
import { getLocaleText } from 'utils/get_locale_text';

const WhatIsTrendingPage: NextPage<
	InferGetServerSidePropsType<GetServerSideProps>
> = ({ trendingMainCategoriesAndCategories, trendingProducts }) => {
	const { locale } = useRouter();
	const { t } = useTranslation();

	const [isTrendingCategoriesOpen, setIsTrendingCategoriesOpen] =
		useState(false);

	const [isTrendingProductsOpen, setIsTrendingProductsOpen] =
		useState(false);

	const firstProduct =
		trendingProducts?.length >= 1 ? trendingProducts[0] : {};
	const remainingTrendingProducts = trendingProducts || [];

	return (
		<div className="pb-8">
			{/* Header */}
			<div className="relative hidden md:block">
				<div className="relative h-[234px] w-full">
					<ImageWithErrorHandler
						src="/latest-trend-image.png"
						alt="Trending"
						fill={true}
					/>
				</div>

				<p className="absolute top-1/2 right-24 hidden -translate-y-1/2 transform text-[48px] font-semibold text-white lg:block">
					Find the latest Trends
				</p>
			</div>

			<div className="md:hidden">
				<div>
					{/* Trending categories for mobile */}
					<div className="mt-8 bg-primary-main px-4 pt-4 text-white">
						<p className="text-[20px] font-semibold">
							Trending Catagories
						</p>
						<p className="text-[14px] font-semibold">
							Name Here Lorem ipsum dolor sit amet, consecamet Lorem
							ipsum dolor sit amet,{' '}
						</p>
						<div className="flex justify-end ">
							<Button
								className="!p-0"
								onClick={() =>
									setIsTrendingCategoriesOpen((prevState) => !prevState)
								}
							>
								{isTrendingCategoriesOpen ? (
									<HiMinusCircle className="text-3xl text-secondary" />
								) : (
									<HiPlusCircle className="text-3xl text-secondary" />
								)}
							</Button>
						</div>
					</div>
					{isTrendingCategoriesOpen && (
						<div className="mb-2 space-y-4 bg-white px-4 md:mb-0 pc:border-b pc:border-gray/40 pc:last:border-b-0">
							<SubCategoryCard
								subCat={{
									id: '1',
									title: { en: 'Animal & Veterinary' },
									slug: { en: 'animal-and-veterinary' },
									image: '/vehicles/green-tractor.png',
									clr: ''
								}}
								showImageInFront={true}
								onClick={() => {}}
								containerClassName="items-end min-h-[80px] md:min-h-[124px] lg:min-h-[140px] border-x-0 border-t-0 !border-b-2"
							/>
							<SubCategoryCard
								subCat={{
									id: '1',
									title: { en: 'Animal & Veterinary' },
									slug: { en: 'animal-and-veterinary' },
									image: '/vehicles/green-tractor.png',
									clr: ''
								}}
								showImageInFront={true}
								onClick={() => {}}
								containerClassName="items-end min-h-[80px] md:min-h-[124px] lg:min-h-[140px] border-x-0 border-t-0 !border-b-2"
							/>
							<SubCategoryCard
								subCat={{
									id: '1',
									title: { en: 'Animal & Veterinary' },
									slug: { en: 'animal-and-veterinary' },
									image: '/vehicles/green-tractor.png',
									clr: ''
								}}
								showImageInFront={true}
								onClick={() => {}}
								containerClassName="min-h-[80px] md:min-h-[124px] lg:min-h-[140px] border-none"
							/>
						</div>
					)}
				</div>

				{/* Trending products for mobile */}
				<div>
					<div className="mt-8 bg-green px-4 pt-4 text-white">
						<p className="text-[20px] font-semibold">
							Trending Products
						</p>
						<p className="text-[14px] font-semibold">
							Name Here Lorem ipsum dolor sit amet, consecamet Lorem
							ipsum dolor sit amet,{' '}
						</p>
						<div className="flex justify-end ">
							<Button
								className="!p-0"
								onClick={() =>
									setIsTrendingProductsOpen((prevState) => !prevState)
								}
							>
								{isTrendingProductsOpen ? (
									<HiMinusCircle className="text-3xl text-secondary" />
								) : (
									<HiPlusCircle className="text-3xl text-secondary" />
								)}
							</Button>
						</div>
					</div>
					{isTrendingProductsOpen && (
						<div className="mb-2 space-y-4 bg-white px-4 md:mb-0 pc:border-b pc:border-gray/40 pc:last:border-b-0">
							<SubCategoryCard
								subCat={{
									id: '1',
									title: { en: 'Animal & Veterinary' },
									slug: { en: 'animal-and-veterinary' },
									image: '/vehicles/green-tractor.png',
									clr: ''
								}}
								showImageInFront={true}
								onClick={() => {}}
								containerClassName="items-end min-h-[80px] md:min-h-[124px] lg:min-h-[140px] border-x-0 border-t-0 !border-b-2"
								titleClassName="text-green"
							/>
							<SubCategoryCard
								subCat={{
									id: '1',
									title: { en: 'Animal & Veterinary' },
									slug: { en: 'animal-and-veterinary' },
									image: '/vehicles/green-tractor.png',
									clr: ''
								}}
								showImageInFront={true}
								onClick={() => {}}
								containerClassName="items-end min-h-[80px] md:min-h-[124px] lg:min-h-[140px] border-x-0 border-t-0 !border-b-2"
								titleClassName="text-green"
							/>
							<SubCategoryCard
								subCat={{
									id: '1',
									title: { en: 'Animal & Veterinary' },
									slug: { en: 'animal-and-veterinary' },
									image: '/vehicles/green-tractor.png',
									clr: ''
								}}
								showImageInFront={true}
								onClick={() => {}}
								containerClassName="items-end min-h-[80px] md:min-h-[124px] lg:min-h-[140px] border-0"
								titleClassName="text-green"
							/>
						</div>
					)}
				</div>
			</div>

			<div className="hidden md:block">
				{/* Trending Categories */}
				<div className="m-4 grid grid-cols-12 gap-4 rounded-md bg-white p-4 lg:gap-8">
					<div className="col-span-12 md:col-span-4 lg:col-span-3">
						<CategoryCard
							title="Trending Categories"
							description="Name Here Lorem ipsum dolor sit amet, consecamet Lorem ipsum dolor sit amet, "
							imageUrl="/vehicles/green-tractor.png"
							alt="/"
							buttonText="Source Now"
						/>
					</div>

					{/* Categories */}
					<div className="col-span-8 mt-4 lg:col-span-9">
						<CategoriesSlider />
					</div>
				</div>

				{/* Trending Products */}
				<div className="m-4 grid grid-cols-12 gap-4 rounded-md bg-white p-4 lg:gap-8">
					<div className="col-span-3">
						<CategoryCard
							title="Trending Products"
							name={getLocaleText(
								firstProduct?.product_name || {},
								locale
							)}
							description={getLocaleText(
								firstProduct?.product_description || {},
								locale
							)}
							imageUrl={
								firstProduct?.images
									? firstProduct?.images[0]?.url
									: '/vehicles/green-tractor.png'
							}
							alt="/"
							buttonText="Source Now"
						/>
					</div>

					{/* Products */}
					<div className="col-span-9 mt-4">
						<CategoriesSlider dataList={remainingTrendingProducts} />
					</div>
				</div>
			</div>
		</div>
	);
}; // End of WhatIsTrendingPage

export const getServerSideProps: GetServerSideProps = async ({
	locale
}) => {
	const trendingMainCategoriesAndCategories =
		await getHomeMainCategoriesAndCategories();
	const trendingProducts = await getTrendingProducts();

	return {
		props: {
			trendingMainCategoriesAndCategories,
			trendingProducts,
			...(await serverSideTranslations(locale || 'en'))
		}
	};
};

export default WhatIsTrendingPage;
