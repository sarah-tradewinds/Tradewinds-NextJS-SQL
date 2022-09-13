import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { HiMinusCircle, HiPlusCircle } from 'react-icons/hi';
import { useCategoryStore } from 'store/category-store';
import { useHomeStore } from 'store/home';
import { CatSubCatSectionType } from 'types/home';
import { getLocaleText } from 'utils/get_locale_text';
import Collapse from '../common/collapse';
import ImageWithErrorHandler from '../common/elements/image-with-error-handler';
import CatSubCatActionCard from './common/cat-sub-cat-action-card';
import CategoryCard from './common/category-card';
import SubCategoryCard from './common/sub-category-card';
import SubCategorySlider from './sub-category-slider';

import { useTranslation } from 'next-i18next';
import { useCategoryStoreCopy } from '../../../store/category-store-copy';

type CategorySubCategoriesSectionProps = {
	catSubCat: CatSubCatSectionType;
	isReverse?: boolean;
	isCustom?: boolean;
	applyBgColor?: boolean;
	subCategorySliderClassName?: string;
	subCategorySliderLeftButtonClassName?: string;
	subCategorySliderRightButtonClassName?: string;
};

const CategorySubCategoriesSection: React.FC<
	CategorySubCategoriesSectionProps
> = ({
	catSubCat,
	isReverse,
	applyBgColor,
	isCustom,
	subCategorySliderClassName,
	subCategorySliderLeftButtonClassName,
	subCategorySliderRightButtonClassName
}) => {
	const [screenSize, setScreenSize] = useState<null | number>(null);
	const [isTablet, setIsTablet] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { fetchCategoriesByMainCategoryId } = useCategoryStore(
		(state) => ({
			fetchCategoriesByMainCategoryId:
				state.fetchCategoriesByMainCategoryId
		})
	);

	const { t } = useTranslation('common');
	const { setMainCategory, setCategory } = useCategoryStoreCopy();

	const isEco = useHomeStore((state) => state.isEco);

	const router = useRouter();
	const { locale } = router;

	const { main_category, categories } = catSubCat;

	const mainCategoryTitle = getLocaleText(main_category.title, locale);
	const mainCategoryDescription = getLocaleText(
		main_category.description,
		locale
	);

	useEffect(() => {
		const handleResize = () => setScreenSize(window.innerWidth);
		setIsTablet(
			window.innerWidth > 700 && window.innerWidth < 1024 ? true : false
		);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [isTablet, screenSize]);

	const onSubCategoryTileClickHandler = async (
		categoryId: string,
		categoryName: string
	) => {
		const mainCategoryId = main_category.id!;
		fetchCategoriesByMainCategoryId(mainCategoryId, isEco);

		setMainCategory(mainCategoryId, main_category.title?.en || '');

		const params = setCategory(categoryId, categoryName);
		router.push(`/product-search-copy?${params}`);
	};

	const subCategories = categories
		? [...categories].slice(0, isTablet ? 5 : 7).map((subCat) => {
				let { categories: category } = subCat as any;

				const categoryData = category || subCat;
				return (
					<div
						key={subCat.id}
						className={`mb-2 transform transition duration-300 ease-in-out hover:-translate-y-2 md:mb-0 pc:border-b pc:border-gray/40 pc:last:border-b-0`}
					>
						<SubCategoryCard
							subCat={categoryData}
							onClick={() =>
								onSubCategoryTileClickHandler(
									categoryData.id,
									categoryData?.title?.en || ''
								)
							}
							style={
								applyBgColor
									? {
											backgroundColor:
												main_category.bgHexColor ||
												(main_category as any).color
									  }
									: null
							}
							containerClassName="min-h-[80px] md:min-h-[124px] lg:min-h-[140px]"
						/>
					</div>
				);
		  })
		: [];

	return (
		<div className="bg-white md:rounded-md">
			{/* For Small Screen- Collapse */}
			<div className="md:hidden">
				<Collapse
					collapseHeadBgHexColor={main_category.bgHexColor || 'white'}
					isReverse={isReverse}
					onLeadingClick={() => setIsOpen((preState) => !preState)}
					onContentClick={() => {
						const params = setMainCategory(
							main_category.id!,
							main_category.title.en || ''
						);
						router.push(`/product-search-copy?${params}`);
					}}
					leading={
						isOpen ? (
							<HiMinusCircle className="m-1 text-3xl text-primary-main" />
						) : (
							<HiPlusCircle className="m-1 text-3xl text-primary-main" />
						)
					}
					title={
						<span className="text-left text-[15px] font-semibold text-primary-main">
							{mainCategoryTitle}
						</span>
					}
					subtitle={
						<div>
							<span className="text-[12px] font-semibold text-primary-main">
								Name Here {` `}
							</span>
							<span className="text-gray">
								{mainCategoryDescription.length > 32
									? `${mainCategoryDescription.substring(0, 24)}...`
									: mainCategoryDescription}
							</span>
						</div>
					}
					trailing={
						<div className="relative h-[80px] w-[80px]">
							<div
								className={`absolute -top-8 ${
									isReverse ? 'left-0' : 'right-0'
								} z-10`}
							>
								<ImageWithErrorHandler
									src={main_category?.image?.url}
									alt=""
									width={96}
									height={96}
									className="h-full w-full"
								/>
							</div>
						</div>
					}
				>
					<div className="bg-white">
						<div className="mx-8 pt-8">{subCategories}</div>
					</div>
				</Collapse>
			</div>

			{/* For Medium and Large screen */}
			<div className="hidden grid-cols-12 items-end gap-4 p-4 md:grid lg:gap-[30px] 2xl:p-8">
				{/* Category */}
				<div className="md:col-span-4 xl:col-span-3">
					<CategoryCard
						title={mainCategoryTitle}
						name={(main_category as any).name || 'Name Here'}
						onClick={() => {
							const params = setMainCategory(
								main_category.id!,
								main_category.title.en || ''
							);
							router.push(`/product-search-copy?${params}`);
						}}
						description={mainCategoryDescription}
						buttonText={getLocaleText(
							main_category.btnTxt || t('source_now'),
							locale
						)}
						imageUrl={main_category?.image?.url}
						alt={main_category.title?.en || ''}
						bgHexColor={main_category.bgHexColor}
						containerClassName="md:h-[340px] lg:h-[380px] xl:h-[340px]"
					/>
				</div>

				{/* Sub categories */}
				<div className="md:col-span-8 xl:col-span-9">
					{!isCustom ? (
						<div>
							<SubCategorySlider
								categories={[...categories]}
								className={subCategorySliderClassName}
								leftButtonClassName={
									subCategorySliderLeftButtonClassName
								}
								rightButtonClassName={
									subCategorySliderRightButtonClassName
								}
								onTileClick={(categoryId, data) =>
									onSubCategoryTileClickHandler(
										categoryId,
										data?.title?.en || ''
									)
								}
							/>
						</div>
					) : (
						<div className="grid items-end gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{/* TODO: Data Slicing to be done based on the screen width with a stat*/}
							{subCategories}
							<CatSubCatActionCard />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default CategorySubCategoriesSection;
