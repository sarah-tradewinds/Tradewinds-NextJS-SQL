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

	const navigateWithShallow = (query: { [key: string]: any }) => {
		router.push({ pathname: '/product-search', query }, undefined, {
			shallow: true
		});
	}; // End of navigateWithShallow function

	const loadingSkeleton = (
		<ContentSkeleton
			count={12}
			isLoading={true}
			className="block !w-full"
			containerClassName="mt-2 mr-2"
		/>
	);

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
									const { value } = setMainCategory(
										id,
										mainCategory.title?.en || ''
									);

									navigateWithShallow({
										main_category: value,
										region: router.query.region,
										country: router.query.region
									});
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
			<ul
				className={`col-span-3 h-[487px] overflow-y-auto border-dashed pt-1 pl-4 text-left dark:bg-[#FCF5EB] ${
					isSubCategoriesLoading || subCategories?.length > 0
						? 'border-r'
						: ''
				}`}
				style={{ direction: 'rtl' }}
			>
				{isCategoriesLoading && loadingSkeleton}

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
							style={{ direction: 'ltr' }}
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
								console.log('paramsparams', params);
								// navigateWithShallow(
								// 	`/product-search?${params}&${generateQueryString({
								// 		region: router.query.region,
								// 		country: router.query.region
								// 	})}`
								// );

								navigateWithShallow(params?.payload);
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
			<ul
				className={`col-span-3 h-[487px] overflow-y-auto border-dashed pl-4 dark:bg-[#FCF5EB] ${
					isSpecificCategoriesLoading || specificCategories?.length > 0
						? 'border-r'
						: ''
				}`}
				style={{ direction: 'rtl' }}
			>
				{isSubCategoriesLoading && loadingSkeleton}

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
							style={{ direction: 'ltr' }}
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
								console.log('[sub-categ] =', params);
								navigateWithShallow(params?.payload);
								// navigateWithShallow(
								// 	`/product-search?${params}&${generateQueryString({
								// 		region: router.query.region,
								// 		country: router.query.region
								// 	})}`
								// );
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
			<ul
				className="col-span-3 h-[487px] overflow-y-auto pl-4 dark:bg-[#FCF5EB]"
				style={{ direction: 'rtl' }}
			>
				{isSpecificCategoriesLoading && loadingSkeleton}

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
							style={{ direction: 'ltr' }}
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

								navigateWithShallow(params?.payload);

								// navigateWithShallow(
								// 	`/product-search?${params}&${generateQueryString({
								// 		region: router.query.region,
								// 		country: router.query.region
								// 	})}`
								// );
							}}
						>
							<span>{getLocaleText(title || {}, locale)}</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
}; // End of MegaMenu component

export default MegaMenu;
