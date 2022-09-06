import { useRouter } from 'next/router';

// Third party packages
import { MdPlayArrow } from 'react-icons/md';

// data
import { useState } from 'react';

// styles
import SpinnerIcon from 'components/website/common/elements/loader/spinner-icon';
import {
	getCategoriesByMainCategoryId,
	getMainCategories,
	getSpecificCategoriesBySubCategoryId,
	getSubCategoriesByCategoryId
} from 'lib/common.lib';
import { useCategoryStoreCopy } from 'store/category-store-copy';
import { useHomeStore } from 'store/home';
import useSWR from 'swr';
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
	const { className, onClose } = props;

	const router = useRouter();
	const { locale } = router;

	const isEco = useHomeStore((state) => state.isEco);
	const [isMainCategoryLoading, setIsMainCategoryLoading] =
		useState(false);
	const [isCategoryLoading, setIsCategoryLoading] = useState(false);
	const [isSubCategoryLoading, setIsSubCategoryLoading] =
		useState(false);
	const [isSpecificCategoryLoading, setIsSpecificCategoryLoading] =
		useState(false);

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
	} = useCategoryStoreCopy();

	// Fetching all main-categories
	const { data: mainCategories } = useSWR(
		`main_category?is_eco${false}`,
		() => getMainCategories(false)
	);

	// Fetching categories based on selectedMainCategory
	const { data: categories, error: categoriesError } = useSWR(
		`/category/categories/${selectedMainCategory?.id}`,
		selectedMainCategory?.id
			? () => getCategoriesByMainCategoryId(selectedMainCategory?.id)
			: null
	);

	// Fetching sub-categories based on category_id
	const { data: subCategories } = useSWR(
		`/sub_category/sub_categories/${selectedCategory?.id}`,
		selectedCategory?.id
			? () => getSubCategoriesByCategoryId(selectedCategory?.id)
			: null
	);

	// Fetching specific-categories based on sub_category_id
	const { data: specificCategories } = useSWR(
		`/specific_category/sub_sub_categories/${selectedSubCategory?.id}`,
		selectedSubCategory?.id
			? () =>
					getSpecificCategoriesBySubCategoryId(selectedSubCategory?.id)
			: null
	);

	const megaMenuClassName = `relative grid grid-cols-12 border bg-white text-sm text-gray shadow-lg overflow-y-autos ${className}`;

	return (
		<div className={megaMenuClassName}>
			{mainCategories?.length <= 0 ? <MegaMenuLoader /> : ''}

			{/* Main Categories */}
			{mainCategories && (
				<div
					className={`col-span-3 my-1 ml-4 h-[487px] space-y-4 overflow-auto pl-2 shadow-mega-menu ${styles.megaMenuScrollbar}`}
					style={{ direction: 'rtl' }}
				>
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
										router.push(`/product-search-copy?${params}`);
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
			)}

			{/* Categories */}
			{mainCategories?.length > 0 && selectedMainCategory?.id && (
				<ul className="col-span-3 h-[487px] overflow-y-auto border-r border-dashed pt-1 pl-4 dark:bg-[#FCF5EB]">
					{!categories && !categoriesError && <MegaMenuLoader />}

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
										selectedMainCategory?.id,
										selectedMainCategory?.name || ''
									);
									const params = setCategory(id, title?.en || '');
									router.push(`/product-search-copy?${params}`);
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
			)}

			{/* Sub Categories */}
			{categories?.length > 0 && selectedCategory?.id && (
				<ul className="col-span-3 h-[487px] overflow-y-auto border-r border-dashed pl-4 dark:bg-[#FCF5EB]">
					{isSubCategoryLoading && <MegaMenuLoader />}

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
										selectedCategory?.id,
										selectedCategory?.name || '',
										id,
										title?.en
									);
									router.push(`/product-search-copy?${params}`);
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
			)}

			{/* Specific Categories */}
			{subCategories?.length > 0 && selectedSubCategory?.id && (
				<ul className="col-span-3 h-[487px] overflow-y-auto pl-4 dark:bg-[#FCF5EB]">
					{isSpecificCategoryLoading && <MegaMenuLoader />}

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
									router.push(`/product-search-copy?${params}`);
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
			)}
		</div>
	);
}; // End of MegaMenu component

export default MegaMenu;

const MegaMenuLoader = () => {
	return (
		<div className="flex h-full items-center justify-center">
			<SpinnerIcon className="!mr-0 md:h-16 md:w-16" />
		</div>
	);
};
