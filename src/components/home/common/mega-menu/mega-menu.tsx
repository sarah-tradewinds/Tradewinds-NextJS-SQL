import { useRouter } from 'next/router';

// Third party packages
import { MdPlayArrow } from 'react-icons/md';

// data
import { useState } from 'react';

// styles
import { ContentSkeleton } from 'components/common/elements/skeleton/content.skeleton';
import {
	useCategoriesByMainCategoryId,
	useMainCategories,
	useSpecificCategoriesBySubCategoryId,
	useSubCategoriesByCategoryId
} from 'hooks/useMainCategories';
import { useCategoryStore } from 'store/category-store';
import { useHomeStore } from 'store/home';
import { generateQueryString } from 'utils/generate_query_string.utils';
import { getLocaleText } from 'utils/get_locale_text';
import styles from './mega-menu.module.css';

interface CategoryData {
	id: string;
	name: string;
}

interface MegaMenuProps {
	className?: string;
	onClose?: () => any;
}

const MegaMenu: React.FC<MegaMenuProps> = (props) => {
	const { className } = props;

	const router = useRouter();
	const { locale } = router;

	const isEco = useHomeStore((state) => state.isEco);

	const [selectedMainCategory, setSelectedMainCategory] =
		useState<CategoryData>();
	const [selectedCategory, setSelectedCategory] =
		useState<CategoryData>();
	const [selectedSubCategory, setSelectedSubCategory] =
		useState<CategoryData>();
	const [selectedSpecificCategory, setSelectedSpecificCategory] =
		useState<CategoryData>();

	const {
		setMainCategory,
		setCategory,
		setSubCategory,
		setSpecificCategory
	} = useCategoryStore();

	// Fetching all main-categories
	const { mainCategories, isMainCategoriesLoading } =
		useMainCategories();

	const { categories, isCategoriesLoading } =
		useCategoriesByMainCategoryId(selectedMainCategory?.id || '');

	const { subCategories, isSubCategoriesLoading } =
		useSubCategoriesByCategoryId(selectedCategory?.id || '');

	const { specificCategories, isSpecificCategoriesLoading } =
		useSpecificCategoriesBySubCategoryId(selectedSubCategory?.id || '');

	const megaMenuClassName = `relative grid grid-cols-12 border bg-white text-sm text-gray shadow-lg overflow-y-autos ${className}`;

	const navigateWithShallow = (path: string) => {
		router.push(path, undefined, { shallow: true });
	}; // End of navigateWithShallow function

	return (
		<div className={megaMenuClassName}>
			{/* Main Categories */}
			<div
				className={`col-span-3 my-1 ml-4 h-[487px] space-y-4 overflow-auto pl-2 shadow-mega-menu ${styles.megaMenuScrollbar}`}
				style={{ direction: 'rtl' }}
			>
				<ContentSkeleton
					isLoading={isMainCategoriesLoading}
					className="block"
					containerClassName="mt-2"
				/>

				<ul className="mr-1 h-full">
					{mainCategories?.map((mainCategory: any) => {
						const { id, slug } = mainCategory;

						const isSelected = id === selectedMainCategory?.id;

						const mainCategoryTitle = getLocaleText(
							mainCategory.title || {},
							locale
						);

						return (
							<li
								key={id || slug}
								className={`flex cursor-pointer justify-between py-1 pl-4 text-left text-[15px] dark:hover:text-primary-eco ${
									isSelected
										? 'font-semibold dark:bg-bg-eco/60 dark:text-primary-eco'
										: ''
								}`}
								onMouseEnter={() =>
									!isSelected
										? setSelectedMainCategory({
												id,
												name: mainCategoryTitle
										  })
										: null
								}
								onClick={() => {
									const params = setMainCategory(
										id,
										mainCategory.title?.en || ''
									);
									navigateWithShallow(
										`/product-search?${params}&${generateQueryString({
											region: router.query.region,
											country: router.query.region
										})}`
									);
								}}
							>
								<span className="hover: text-2xl hover:text-primary-main">
									{isSelected && (
										<MdPlayArrow className="font-semibold" />
									)}
								</span>
								<span>{mainCategoryTitle}</span>
							</li>
						);
					})}
				</ul>
			</div>

			{/* Categories */}
			<ul className="col-span-3 h-[487px] overflow-y-auto border-r border-dashed pt-1 pl-4 dark:bg-[#FCF5EB]">
				<ContentSkeleton
					isLoading={isCategoriesLoading}
					className="block"
					containerClassName="mt-2"
				/>

				{categories?.map((category: any) => {
					const { id, slug, title } = category;

					const isSelected = id === selectedCategory?.id;

					return (
						<li
							key={id || slug}
							className={`flex cursor-pointer items-center justify-between py-1 text-[15px] dark:hover:text-primary-eco ${
								isSelected
									? ' font-semibold dark:bg-bg-eco/60 dark:text-primary-eco'
									: ''
							}`}
							onMouseEnter={() =>
								!isSelected
									? setSelectedCategory({ id, name: title?.en })
									: null
							}
							onClick={() => {
								setMainCategory(
									selectedMainCategory?.id || '',
									selectedMainCategory?.name || ''
								);
								const params = setCategory(id, title?.en || '');
								navigateWithShallow(
									`/product-search?${params}&${generateQueryString({
										region: router.query.region,
										country: router.query.region
									})}`
								);
							}}
						>
							<span>{getLocaleText(title || {}, locale)}</span>
							<span className="hover: text-2xl hover:text-primary-main">
								{isSelected && (
									<MdPlayArrow className="font-semibold" />
								)}
							</span>
						</li>
					);
				})}
			</ul>

			{/* Sub Categories */}
			<ul className="col-span-3 h-[487px] overflow-y-auto border-r border-dashed pl-4 dark:bg-[#FCF5EB]">
				<ContentSkeleton
					isLoading={isSubCategoriesLoading}
					className="block"
					containerClassName="mt-2"
				/>

				{subCategories?.map((subCategory: any) => {
					const { id, slug, title } = subCategory;

					const isSelected = id === selectedSubCategory?.id;

					return (
						<li
							key={id || slug}
							className={`flex cursor-pointer items-center justify-between py-1 text-[15px] dark:hover:text-primary-eco ${
								isSelected
									? ' font-semibold dark:bg-bg-eco/60 dark:text-primary-eco'
									: ''
							}`}
							onMouseEnter={() =>
								setSelectedSubCategory({ id, name: title?.en })
							}
							onClick={() => {
								setMainCategory(
									selectedMainCategory?.id || '',
									selectedMainCategory?.name || ''
								);
								const params = setSubCategory(
									selectedCategory?.id || '',
									selectedCategory?.name || '',
									id,
									title?.en
								);
								navigateWithShallow(
									`/product-search?${params}&${generateQueryString({
										region: router.query.region,
										country: router.query.region
									})}`
								);
							}}
						>
							<span>{getLocaleText(title || {}, locale)}</span>
							<span className="hover: text-2xl hover:text-primary-main">
								{isSelected && (
									<MdPlayArrow className="font-semibold" />
								)}
							</span>
						</li>
					);
				})}
			</ul>

			{/* Specific Categories */}
			<ul className="col-span-3 h-[487px] overflow-y-auto pl-4 dark:bg-[#FCF5EB]">
				<ContentSkeleton
					isLoading={isSpecificCategoriesLoading}
					className="block"
					containerClassName="mt-2"
				/>

				{specificCategories?.map((specificCategory: any) => {
					const { id, slug, title } = specificCategory;

					const isSelected = id === selectedSpecificCategory?.id;

					return (
						<li
							key={id || slug}
							className={`flex cursor-pointer items-center justify-between text-[15px] dark:hover:text-primary-eco ${
								isSelected
									? ' font-semibold dark:bg-bg-eco/60 dark:text-primary-eco'
									: ''
							}`}
							onMouseEnter={() =>
								setSelectedSpecificCategory({
									id,
									name: title?.en
								})
							}
							onClick={() => {
								setMainCategory(
									selectedMainCategory?.id || '',
									selectedMainCategory?.name || ''
								);
								console.log(
									selectedCategory?.id || '',
									selectedCategory?.name || '',
									selectedSubCategory?.id || '',
									selectedSubCategory?.name || ''
								);
								const params = setSpecificCategory(
									selectedCategory?.id || '',
									selectedCategory?.name || '',
									selectedSubCategory?.id || '',
									selectedSubCategory?.name || '',
									id,
									title?.en
								);
								navigateWithShallow(
									`/product-search?${params}&${generateQueryString({
										region: router.query.region,
										country: router.query.region
									})}`
								);
							}}
						>
							<span>{getLocaleText(title || {}, locale)}</span>
							<span className="hover: text-2xl hover:text-primary-main">
								{isSelected && (
									<MdPlayArrow className="font-semibold" />
								)}
							</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
}; // End of MegaMenu component

export default MegaMenu;
