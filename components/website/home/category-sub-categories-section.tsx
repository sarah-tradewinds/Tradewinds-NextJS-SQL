import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { HiMinusCircle, HiPlusCircle } from 'react-icons/hi';
import { useCategoryStore } from 'store/category-store';
import { CatSubCatSectionType } from 'types/home';
import Collapse from '../common/collapse';
import CatSubCatActionCard from './common/cat-sub-cat-action-card';
import CategoryCard from './common/category-card';
import SubCategoryCard from './common/sub-category-card';

type CategorySubCategoriesSectionProps = {
	catSubCat: CatSubCatSectionType;
	isReverse?: boolean;
	applyBgColor?: boolean;
};

const CategorySubCategoriesSection: React.FC<
	CategorySubCategoriesSectionProps
> = ({ catSubCat, isReverse, applyBgColor }) => {
	const [screenSize, setScreenSize] = useState<null | number>(null);
	const [isTablet, setIsTablet] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { setSelectedMainCategoryId, setSelectedCategoryId } =
		useCategoryStore((state) => ({
			setSelectedMainCategoryId: state.setSelectedMainCategoryId,
			setSelectedCategoryId: state.setSelectedCategoryId
		}));

	const router = useRouter();

	const { category } = catSubCat;

	useEffect(() => {
		const handleResize = () => setScreenSize(window.innerWidth);
		setIsTablet(
			window.innerWidth > 700 && window.innerWidth < 1024 ? true : false
		);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [isTablet, screenSize]);

	const subCategories = catSubCat.subCategories
		.slice(0, isTablet ? 5 : 7)
		.map((subCat, index) => (
			<div
				key={subCat.id}
				className={`mb-2 md:mb-0 pc:border-b pc:border-gray/40 pc:last:border-b-0`}
			>
				<SubCategoryCard
					subCat={subCat}
					onClick={() => {
						setSelectedMainCategoryId(category.id!);
						setSelectedCategoryId(subCat.id as string);
						router.push('/product-search');
					}}
					style={
						applyBgColor
							? { backgroundColor: category.bgHexColor }
							: null
					}
					containerClassName="min-h-[80px] md:min-h-[124px] lg:min-h-[140px]"
				/>
			</div>
		));

	return (
		<div className=" bg-primary-main">
			{/* For Small Screen- Collapse */}
			<div className="md:hidden">
				<Collapse
					collapseHeadBgHexColor={category.bgHexColor || 'white'}
					isReverse={isReverse}
					onLeadingClick={() => setIsOpen((preState) => !preState)}
					onContentClick={() => {
						setSelectedMainCategoryId(category.id!);
						router.push('/product-search');
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
							{category.title}
						</span>
					}
					subtitle={
						<div>
							<span className="text-[12px] font-semibold text-primary-main">
								Name Here {` `}
							</span>
							<span className="text-gray">
								{category.desc.length > 32
									? `${category.desc.substring(0, 24)}...`
									: category.desc}
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
								<Image
									src={
										category.image.url || '/vehicles/green-tractor.png'
									}
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
			<div className="hidden grid-cols-12 items-end gap-4 bg-white p-4 md:grid lg:gap-8 2xl:p-8">
				{/* Category */}
				<div className="md:col-span-4 xl:col-span-3">
					<CategoryCard
						title={
							category.title.length > 20
								? `${category.title.substring(0, 17)}...`
								: category.title
						}
						onClick={() => {
							router.push('/product-search');
							localStorage.setItem('main_category', category.id!);
						}}
						description={category.desc}
						buttonText={category.btnTxt}
						imageUrl={
							category.image.url || '/vehicles/green-tractor.png'
						}
						alt={category.title}
						bgHexColor={category.bgHexColor}
						containerClassName="md:h-[340px] lg:h-[380px] xl:h-[340px]"
					/>
				</div>

				{/* Sub categories */}
				<div className="md:col-span-8 xl:col-span-9">
					<div className="grid items-end gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{/* TODO: Data Slicing to be done based on the screen width with a stat*/}
						{subCategories}

						<CatSubCatActionCard />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CategorySubCategoriesSection;
