import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useCategoryStore } from 'store/category-store';
import { useHomeStore } from 'store/home';
import { CatSubCatSectionType } from 'types/home';
import { getLocaleText } from 'utils/get_locale_text';
import ImageWithErrorHandler from '../common/elements/image-with-error-handler';
import CategoryCollapse from './category-collapse.component';

import useDeviceSize from 'hooks/use-device-size.hooks';
import { useTranslation } from 'next-i18next';

// import required modules

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import HomeCategorySlider from './home-category-slider';

type HomeCategorySubCategoriesSectionProps = {
	catSubCat: CatSubCatSectionType;
	isReverse?: boolean;
	isCustom?: boolean;
	subCategorySliderClassName?: string;
	subCategorySliderLeftButtonClassName?: string;
	subCategorySliderRightButtonClassName?: string;
};

const HomeCategorySubCategoriesSection: React.FC<
	HomeCategorySubCategoriesSectionProps
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
							<div className="relative h-[40px] w-[40px]">
								<ImageWithErrorHandler
									src={categoryData?.image || ''}
									alt=""
									fill={true}
								/>
							</div>
						</div>

						<p className="ml-[17px] text-[18px] font-semibold leading-[21.94px] text-gray">
							{subCategoryTitle}
						</p>
					</div>
				);
		  })
		: [];

	const onMainCategoryPressed = () => {
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
	}; // End of onMainCategoryPressed

	return (
		<>
			{/* For Mobile only */}
			<div className="md:hidden">
				<CategoryCollapse
					backgroundColor={main_category.color}
					title={mainCategoryTitle || ''}
					imageUrl={main_category?.image || ''}
					onTitleClick={onMainCategoryPressed}
				>
					<div className="ml-7 mr-[34px] mt-2 pb-4">
						{subCategoriesMobile}
					</div>
				</CategoryCollapse>
			</div>

			{/* For Medium and Large screen */}
			<div className="hidden rounded-md bg-white md:flex md:h-[216px] md:w-full xl:h-[269.13px] desktop:h-[317px]">
				{/* Category Container */}
				<MainCategoryCard
					backgroundColor={main_category.color}
					buttonBackgroundColor={main_category?.source_now_button_color}
					title={mainCategoryTitle || ''}
					imageUrl={main_category?.image || ''}
					onPressed={onMainCategoryPressed}
				/>

				<div className="md:w-[506.48px]s bg-errors relative md:ml-[31.84px] md:mt-[19.16px] md:w-[68%] lg:!w-[68%] xl:mt-[25px] 900px:w-[72%] desktop:mt-[28px]">
					<HomeCategorySlider
						categories={categories || []}
						onTileClick={(categoryId, data) =>
							onSubCategoryTileClickHandler(
								categoryId,
								data?.title?.en || ''
							)
						}
					/>
				</div>
			</div>
		</>
	);
};

export default HomeCategorySubCategoriesSection;

interface MainCategoryCardProps {
	title: string;
	imageUrl: string;
	backgroundColor?: string;
	buttonBackgroundColor?: string;
	onPressed?: () => void;
}

const MainCategoryCard: React.FC<MainCategoryCardProps> = (props) => {
	const {
		title,
		imageUrl,
		backgroundColor,
		buttonBackgroundColor,
		onPressed
	} = props;

	return (
		<div className="bg-errors relative flex flex-col md:h-[198px] lg:h-[200px] xl:h-[256px] desktop:h-[324px]">
			<h3 className="desktop:pt-[23px]s ml-[15.69px] pt-[19px] text-[18px] font-semibold text-gray md:w-[169px] lg:ml-[29.23px] lg:w-[237px] lg:pt-[16.44px] lg:text-[21px] xl:ml-[36.51px] xl:w-[296.36px] xl:pt-[16px] desktop:ml-[43px] desktop:w-[349.08px] desktop:text-[25px]">
				{title}
			</h3>
			{/*Category Image and CTA  */}
			<div
				className="md:h-[152px]s relative ml-[11.69px] flex h-full items-end md:w-[169px] lg:ml-[22.99px] lg:w-[237px] xl:ml-[28.87px] xl:max-h-[200.61px] xl:w-[296.36px] desktop:ml-[34px] desktop:max-h-[236.3px] desktop:w-[349.08px]"
				style={{ backgroundColor }}
			>
				<div className="absolute bottom-0 right-0">
					<div className="relative overflow-hidden md:h-[100px] md:w-[100px] lg:h-[150px] lg:w-[150px] xl:h-[200px] xl:w-[200px]">
						<div className="absolute bottom-0 right-0">
							<img
								src={imageUrl}
								alt={''}
								className="h-auto w-auto object-contain"
							/>
						</div>
					</div>
				</div>

				<button
					onClick={onPressed}
					className="mb-[11.26px] ml-2 h-[16.74px] w-[94.08px] rounded-md bg-primary-eco text-center text-[12.01px] text-white outline-none xl:h-[20.9px] xl:w-[117.49px] xl:text-[15px] desktop:mb-[19.61px] desktop:ml-[25px] desktop:h-[24.62px] desktop:w-[138.39px]"
					style={{ backgroundColor: buttonBackgroundColor }}
				>
					Source Now
				</button>
			</div>
		</div>
	);
}; // End of MainCategoryCard
