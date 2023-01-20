import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { HiMinusCircle, HiPlusCircle } from 'react-icons/hi';
import { useCategoryStore } from 'store/category-store';
import { useHomeStore } from 'store/home';
import { CatSubCatSectionType } from 'types/home';
import { getLocaleText } from 'utils/get_locale_text';
import Collapse from '../common/collapse';
import ImageWithErrorHandler from '../common/elements/image-with-error-handler';
import SubCategoryCard from './common/sub-category-card';
import SubCategorySlider from './sub-category-slider';

import useDeviceSize from 'hooks/use-device-size.hooks';
import { useTranslation } from 'next-i18next';
import Skeleton from 'react-loading-skeleton';
import CatSubCatActionCard from './common/cat-sub-cat-action-card';
import CategoryCard from './common/category-card';

type CategorySubCategoriesSectionProps = {
	catSubCat: CatSubCatSectionType;
	isReverse?: boolean;
	isCustom?: boolean;
	subCategorySliderClassName?: string;
	subCategorySliderLeftButtonClassName?: string;
	subCategorySliderRightButtonClassName?: string;
};

const CategorySubCategoriesSection: React.FC<
	CategorySubCategoriesSectionProps
> = ({
	catSubCat,
	isReverse,
	isCustom,
	subCategorySliderClassName,
	subCategorySliderLeftButtonClassName,
	subCategorySliderRightButtonClassName
}) => {
	const [screenSize, setScreenSize] = useState<null | number>(null);
	const [isTablet, setIsTablet] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const { deviceWidth, deviceSize } = useDeviceSize();

	const { t } = useTranslation('common');
	const { setMainCategory, setCategory } = useCategoryStore();

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
		setMainCategory(mainCategoryId, main_category.title?.en || '');

		const params = setCategory(categoryId, categoryName);
		router.push(`/product-search?${params}`);
	};

	const subCategories = categories
		? [...categories]
				.slice(0, deviceSize === 'md' ? 5 : 7)
				.map((subCat) => {
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
								style={{
									backgroundColor: main_category.panel_color,
									border: !main_category.panel_color
										? '2px solid gray'
										: ''
								}}
								containerClassName={`min-h-[80px] md:min-h-[124px] lg:min-h-[140px] !bg-[${main_category.color}]`}
							/>
						</div>
					);
				})
		: [];

	return (
		<div className="bg-white md:rounded-md lg:h-[334.09px] lg:w-[1466.01px] lg:pl-[22px] lg:pt-[25px] lg:pr-[10px]">
			{/* For Small Screen- Collapse */}
			<div className="md:hidden">
				<Collapse
					collapseHeadBgHexColor={main_category.color}
					isReverse={isReverse}
					onLeadingClick={() => setIsOpen((preState) => !preState)}
					onContentClick={() => {
						const params = setMainCategory(
							main_category.id!,
							main_category.title.en || ''
						);
						router.push(`/product-search?${params}`);
					}}
					leading={
						<div
							className={`mt-1 text-[19.9px] text-primary-main ${
								isReverse ? 'mr-4' : 'ml-4 '
							}`}
						>
							{isOpen ? <HiMinusCircle /> : <HiPlusCircle />}
						</div>
					}
					title={
						<span className="text-left text-[15px] font-semibold leading-[18px] text-primary-main">
							{mainCategoryTitle}
						</span>
					}
					subtitle={
						<div>
							<span className="text-[12px] font-semibold leading-[15px] text-primary-main">
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
			{/* <div className="hidden grid-cols-12 items-end gap-4 p-4 md:grid lg:gap-[30px] 2xl:p-8"> */}
			<div className="hidden md:flex">
				{/* Category For medium and large screen */}
				{/* <div className="md:col-span-4 xl:col-span-3"> */}
				<CategoryCard
					title={mainCategoryTitle}
					name={(main_category as any).name || ''}
					onClick={() => {
						const params = setMainCategory(
							main_category.id!,
							main_category.title.en || ''
						);
						router.push(`/product-search?${params}`);
					}}
					description={mainCategoryDescription}
					buttonText={getLocaleText(
						main_category.btnTxt || t('source_now'),
						locale
					)}
					imageUrl={main_category?.image?.url}
					alt={main_category.title?.en || ''}
					bgHexColor={main_category?.color}
					// containerClassName="md:h-[340px] lg:h-[380px] xl:h-[340px]"
					containerClassName="lg:h-[278px] lg:w-[349.08px] lg:pb-[25.09px]s"
				/>

				<div
					className="hidden h-[42px] w-full md:h-auto md:w-[122px] lg:w-[266px]"
					style={{
						backgroundColor:
							deviceWidth < 744 ? main_category?.color : ''
					}}
				>
					{false ? (
						<div>
							<Skeleton />
							<Skeleton height="84px" />
						</div>
					) : (
						<div className="md:justify-betweens flex h-full items-center p-2 md:flex-col md:items-start md:space-x-0 md:p-0">
							<h2
								className={`font-montserrat font-semibold text-primary-main dark:text-accent-secondary-eco lg:mb-[11px] lg:text-[25px] lg:leading-[30px]`}
							>
								{mainCategoryTitle}
							</h2>

							{/* Container */}
							<div
								className="lg:w-[266px]s relative hidden h-[38px] w-[38px] md:mt-1 md:block lg:h-full lg:w-full"
								// style={{
								// 	backgroundColor: main_category?.color,
								// 	border: main_category?.color ? '' : '2px solid gray'
								// }}
								style={{ backgroundColor: main_category?.color }}
							>
								<div className="md:absolute md:bottom-0 md:right-0">
									{/* <div className="relative h-[38px] w-[38px] md:h-[30px] md:w-[30px] lg:h-[60px] lg:w-[60px]"> */}
									<div className="relative h-[60px] w-[60px] md:h-[100px] md:w-[100px] lg:h-[250px] lg:w-[250px]">
										<ImageWithErrorHandler
											src={main_category?.image?.url}
											alt={mainCategoryTitle}
											fill={true}
										/>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>

				{/* Sub categories */}
				{/* <div className="hidden md:col-span-8 xl:col-span-9"> */}
				<div className="lg:mr-[56.01px] lg:h-[279px] lg:w-[1046px] lg:pl-[61px]">
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
								subCategoryStyle={{
									backgroundColor: main_category.panel_color,
									border: '2px solid gray'
								}}
								onTileClick={(categoryId, data) =>
									onSubCategoryTileClickHandler(
										categoryId,
										data?.title?.en || ''
									)
								}
							/>
						</div>
					) : (
						<div className="grid items-end gap-4 md:grid-cols-2 lg:grid-cols-4">
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
