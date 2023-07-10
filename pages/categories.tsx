import {
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage
} from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Third party packages
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// components
import CategoryTileAccordion from 'components/categories/category-tile-accordion';
import ImageWithErrorHandler from 'components/common/elements/image-with-error-handler';

// lib
import { getMainCategories } from 'lib/common.lib';

// utils
import { useKeenSlider } from 'keen-slider/react';
import { getLocaleText } from 'utils/get_locale_text';

const Categories: NextPage<InferGetStaticPropsType<GetStaticProps>> = ({
	mainCategoriesAndCategories = []
}) => {
	const { locale, push } = useRouter();

	const [ref, instanceRef] = useKeenSlider<HTMLDivElement>({
		slideChanged(slider) {
			// setCurrentSlide(slider.track.details.rel);
		},
		created() {
			// setLoaded(true);
		},
		loop: true,
		slides: {
			perView: 3
			// spacing: 8
		},
		breakpoints: {
			'(min-width: 640px)': {
				slides: { perView: 5 }
			},
			'(min-width: 744px)': {
				slides: { perView: 7 }
			},
			'(min-width: 1512px)': {
				slides: { perView: 7 }
			}
		}
	});

	return (
		<div className="pb-40">
			{/* Banner */}
			<div className="3xl:container 3xl:w-[1700px]">
				<div className="relative h-[106px] w-full sm:h-[235px] lg:h-[228px] xl:h-[192.67px] desktop:h-[234px]">
					<Image
						src="/images/category-search.png"
						alt="category-search"
						fill={true}
					/>
					<p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-[21px] font-semibold leading-[25.6px] text-[#BBD3DD] lg:text-[48px] lg:leading-[58.51px] xl:text-[40.63px] xl:leading-[49.53px] desktop:text-[81px] desktop:leading-[98.74px]">
						Categories
					</p>
				</div>
			</div>

			<div className="lg:container">
				{/* Main Categories Slider */}
				<div className="h-[79px] bg-white px-2 sm:h-[109px] md:hidden">
					<div ref={ref} className="keen-slider items-center">
						{mainCategoriesAndCategories?.map(
							(mainCategoryAndCategories: any) => (
								<div
									key={mainCategoryAndCategories?.id}
									className="keen-slider__slide"
								>
									<div
										key={mainCategoryAndCategories?.id}
										className="flex flex-col items-center space-y-[5px]"
									>
										{/* Image */}
										<div className="relative h-[24px] w-[24px] sm:h-[55px] sm:w-[55px]">
											<ImageWithErrorHandler
												src={
													mainCategoryAndCategories?.category_search_image
												}
												alt="category-search"
												fill={true}
											/>
										</div>
										<p className="text-[10px] leading-[12.19px] text-gray sm:text-[14px] sm:font-semibold sm:leading-[17.07px]">
											{getLocaleText(
												mainCategoryAndCategories?.title || {},
												locale
											)}
										</p>
									</div>
								</div>
							)
						)}
					</div>
				</div>

				{/* Category Tiles */}
				<div className="mx-[12px] mt-[10px] sm:m-[13px] md:mt-[20px] lg:mx-[14px] lg:mt-[19px] xl:mx-[19.47px] xl:mt-[16.4px] desktop:mx-[18px] desktop:mt-5">
					<div className="space-y-[9px] md:space-y-5 lg:columns-2 lg:gap-x-[19.75px] lg:space-y-[17.34px] xl:gap-x-[24.55px] xl:space-y-[22.01px] desktop:gap-x-[29px] desktop:space-y-[28px]">
						{mainCategoriesAndCategories?.map(
							(mainCategoryAndCategories: any) => {
								const { categories = [] } =
									mainCategoryAndCategories?.edges || {};
								return (
									<CategoryTileAccordion
										key={mainCategoryAndCategories?.id}
										title={getLocaleText(
											mainCategoryAndCategories?.title || {},
											locale
										)}
										imageUrl={
											mainCategoryAndCategories?.category_search_image
										}
										backgroundColor={mainCategoryAndCategories?.color}
									>
										<div className="my-[15px] ml-[27px] space-y-2 sm:grid sm:grid-cols-2 sm:pb-[25px]">
											{categories?.map((category: any) => (
												<p
													key={category}
													className="desktop:leading-[ 21.94px] text-[14px] leading-[17.07px] text-gray sm:text-[15px] sm:leading-[18.29px] xl:text-[15.24px] xl:leading-[18.58px] desktop:text-[18px]"
												>
													{getLocaleText(category?.title || {}, locale)}
												</p>
											))}
										</div>
									</CategoryTileAccordion>
								);
							}
						)}
					</div>
				</div>
			</div>
		</div>
	);
}; // End of Categories

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	try {
		const mainCategoriesAndCategories = await getMainCategories(false);

		return {
			props: {
				...(await serverSideTranslations(locale || 'en')),
				mainCategoriesAndCategories: mainCategoriesAndCategories || []
			}
		};
	} catch (error) {
		return {
			props: {
				...(await serverSideTranslations(locale || 'en')),
				mainCategoriesAndCategories: []
			}
		};
	}
};

export default Categories;
