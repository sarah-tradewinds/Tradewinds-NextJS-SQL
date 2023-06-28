import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { HiMinusCircle, HiPlusCircle } from 'react-icons/hi';
import { useCategoryStore } from 'store/category-store';
import { useHomeStore } from 'store/home';
import { CatSubCatSectionType } from 'types/home';
import { getLocaleText } from 'utils/get_locale_text';
import Collapse from '../common/collapse';
import CategoryCollapse from "./category-collapse.component";
import ImageWithErrorHandler from '../common/elements/image-with-error-handler';

import useDeviceSize from 'hooks/use-device-size.hooks';
import { useTranslation } from 'next-i18next';
import CategoryCard from './common/category-card';
import SubCategorySlider from './sub-category-slider';

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

	const { main_category, categories = [] } = catSubCat;

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

		router.push(
			{
				pathname: '/product-search',
				query: params?.payload
			},
			undefined,
			{
				shallow: true
			}
		);
	};

	const subCategoriesMobile = categories
		? [...categories].map((subCat) => {
				let { categories: category } = subCat as any;

				const categoryData = category || subCat;
				const subCategoryTitle = getLocaleText(
					categoryData?.title || {},
					locale
				);

				return (
					<div
						key={subCat.id}
						className="mb-[9px] flex items-center border-b-[1.5px] border-[#D1D1CF] last:border-none"
						onClick={() =>
							onSubCategoryTileClickHandler(
								categoryData.id,
								categoryData?.title?.en || ''
							)
						}
					>
						<div className="mb-[7px]">
							<div className="relative h-[42px] w-[44px]">
								<ImageWithErrorHandler
									src={categoryData?.image || ''}
									alt=""
									fill={true}
								/>
							</div>
						</div>

						<p className="ml-[13px] text-[15px] font-semibold leading-[18px] text-primary-main">
							{subCategoryTitle}
						</p>
					</div>
				);
		  })
		: [];

	let slidesToScroll = 2;
	let slidesToShow = 2;
	if (deviceWidth >= 1536) {
		slidesToScroll = 4;
		slidesToShow = 4;
	} else if (deviceWidth >= 1280) {
		slidesToScroll = 4;
		slidesToShow = 4;
	} else if (deviceWidth >= 1024) {
		slidesToScroll = 2.4;
		slidesToShow = 2.4;
	} else if (deviceWidth >= 950) {
		slidesToScroll = 2.8;
		slidesToShow = 2.8;
	} else if (deviceWidth >= 900) {
		slidesToScroll = 2.6;
		slidesToShow = 2.6;
	} else if (deviceWidth >= 830) {
		slidesToScroll = 2.1;
		slidesToShow = 2.1;
	}

	return (
    <>
			<div className="tablet:hidden">
        <CategoryCollapse  />
      </div>

		<div className="bg-white md:pr-[10px] lg:!h-[256px] lg:pl-[22px] lg:pt-[25px] lg:pr-[10px] xl:!h-[334.09px] tablet:mx-4 tablet:h-[238px] tablet:w-auto tablet:rounded-md tablet:pt-[25px] tablet:pl-[22px] desktop:!mx-0">
			{/* For Small Screen- Collapse */}
			<div className="tablet:hidden">
				<Collapse
					collapseHeadBgHexColor={main_category.color}
					isReverse={isReverse}
					onLeadingClick={() => setIsOpen((preState) => !preState)}
					onContentClick={() => {
						const { value } = setMainCategory(
							main_category.id!,
							main_category.title.en || ''
						);

						router.push(
							{
								pathname: '/product-search',
								query: {
									main_category: value
								}
							},
							undefined,
							{
								shallow: true
							}
						);
					}}
					leading={
						<div
							className={`text-[26px] text-primary-main ${
								isReverse ? 'mr-4' : 'ml-[11px]'
							}`}
						>
							{isOpen ? <HiMinusCircle /> : <HiPlusCircle />}
						</div>
					}
					title={
						<p className="text-left text-[15px] font-semibold leading-[18px] text-primary-main">
							{mainCategoryTitle}
						</p>
					}
					subtitle={
						<p className="text-xs leading-[15px] text-gray">
							{mainCategoryDescription?.length > 32
								? `${mainCategoryDescription.substring(0, 24)}...`
								: mainCategoryDescription}
						</p>
					}
					trailing={
						<div
							className={`absolute -top-8 ${
								isReverse ? 'left-0' : 'right-0'
							} z-10`}
						>
							<ImageWithErrorHandler
								src={main_category?.image}
								alt=""
								width={80}
								height={80}
								className="h-20 w-20"
							/>
						</div>
					}
					containerClassName="pt-[5px] !items-start"
					contentClassName="!ml-[8.1px]"
				>
					<div className="bg-white">
						<div className="ml-7 mr-[34px] mt-2 pb-4">
							{subCategoriesMobile}
						</div>
					</div>
				</Collapse>
			</div>

			{/* For Medium and Large screen */}
			{/* <div className="hidden tablet:flex"> */}
			<div className="hidden grid-cols-12 md:!grid 2xl:grid 2xl:w-auto tablet:flex desktop:flex desktop:w-[1466px]">
				{/* Category For medium and large screen */}
				<div className="bg-errors col-span-3 md:col-span-4 lg:col-span-3 900px:col-span-3">
					<CategoryCard
						title={mainCategoryTitle}
						name={(main_category as any).name || ''}
						onClick={() => {
							const { value } = setMainCategory(
								main_category.id!,
								main_category.title.en || ''
							);

							router.push(
								{
									pathname: '/product-search',
									query: {
										main_category: value
									}
								},
								undefined,
								{
									shallow: true
								}
							);

							// router.push(`/product-search?${params}`);
						}}
						description={mainCategoryDescription}
						buttonText={getLocaleText(
							main_category.btnTxt || t('source_now'),
							locale
						)}
						imageUrl={main_category?.image}
						alt={main_category.title?.en || ''}
						bgHexColor={main_category?.color}
						actionButtonBgColor={main_category?.source_now_button_color}
						// containerClassName="lg:!h-[278px] lg:w-[349.08px] tablet:w-[250px] tablet:!h-[278px]"
						containerClassName="tablet:!w-[211px] tablet:!h-[184px] md:!w-[250px] md:!h-[278px] md:!w-full md:!h-full desktop:!h-[278px] desktop:!w-[334px] 2xl:!w-auto lg:!w-full"
					/>
				</div>

				{/* Sub categories */}
				{/* <div className="tablet:w-[500px] tablet:pl-[40px] lg:mr-[56.01px] lg:h-[279px] lg:w-[1046px] lg:pl-[61px]"> */}
				<div className="md:pl-10s desktop:ml-4s desktop:mx-10s col-span-9 md:col-span-8 md:!w-full lg:col-span-10 lg:mr-0 lg:mt-2 lg:ml-4 lg:px-16 2xl:h-auto 2xl:w-auto tablet:w-[480px] tablet:pl-4 900px:col-span-9 desktop:h-[279px] desktop:!w-[1088px] desktop:pl-0">
					<SubCategorySlider
						categories={categories || []}
						className={subCategorySliderClassName}
						leftButtonClassName={subCategorySliderLeftButtonClassName}
						rightButtonClassName={subCategorySliderRightButtonClassName}
						// slidesToScroll={deviceWidth <= 1024 ? 2 : 4}
						// slidesToShow={deviceWidth <= 1024 ? 2 : 4}
						slidesToScroll={slidesToScroll}
						slidesToShow={slidesToShow}
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
			</div>
		</div>
    </>
	);
};

export default CategorySubCategoriesSection;
