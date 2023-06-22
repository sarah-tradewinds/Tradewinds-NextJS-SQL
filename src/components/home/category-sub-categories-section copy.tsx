import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { HiMinusCircle, HiPlusCircle } from 'react-icons/hi';
import { useCategoryStore } from 'store/category-store';
import { useHomeStore } from 'store/home';
import { CatSubCatSectionType } from 'types/home';
import { getLocaleText } from 'utils/get_locale_text';
import Collapse from '../common/collapse';
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
	// if (deviceWidth >= 900) {
	// 	slidesToScroll = 3;
	// 	slidesToShow = 3;
	// } else if (deviceWidth >= 1500) {
	// 	slidesToScroll = 4;
	// 	slidesToShow = 4;
	// }

	if (deviceWidth >= 1536) {
		slidesToScroll = 5;
		slidesToShow = 5;
	} else if (deviceWidth >= 1280) {
		slidesToScroll = 4;
		slidesToShow = 4;
	} else if (deviceWidth >= 1024) {
		slidesToScroll = 3;
		slidesToShow = 3;
	} else if (deviceWidth >= 900) {
		slidesToScroll = 3;
		slidesToShow = 3;
	}

	return (
		// <div className="bg-white md:h-[334.09px] md:w-full md:rounded-md md:pt-[25px] md:pl-[22px] md:pr-[10px] lg:w-[1466.01px] lg:pl-[22px] lg:pt-[25px] lg:pr-[10px]">
		<div className="bg-white md:h-[334.09px] md:w-full md:rounded-md md:pt-[25px] md:pl-[22px] md:pr-[10px] lg:pl-[22px] lg:pt-[25px] lg:pr-[10px]">
			{/* For Small Screen- Collapse */}
			<div className="md:hidden">
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
							{mainCategoryDescription.length > 32
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
			<div className="hidden md:flex">
				{/* <div className="hidden grid-cols-12 md:grid lg:grid lg:w-auto desktop:flex desktop:w-[1466px] bg-primary-main"> */}
				{/* Category For medium and large screen */}
				<div className="col-span-3 lg:col-span-2">
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
						// containerClassName="lg:!h-[278px] lg:w-[349.08px] md:w-[250px] md:!h-[278px]"
						containerClassName="md:!w-full md:!h-[278px]s md:!h-full desktop:!h-[278px] desktop:!w-[349.08px]"
					/>
				</div>

				{/* Sub categories */}
				{/* <div className="md:w-[500px] md:pl-[40px] lg:mr-[56.01px] lg:h-[279px] lg:w-[1046px] lg:pl-[61px]"> */}
				<div className="col-span-9 bg-error md:pl-10 lg:col-span-10 lg:px-12 desktop:mr-[56.01px] desktop:h-[279px] desktop:w-[1046px]">
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
	);
};

export default CategorySubCategoriesSection;
