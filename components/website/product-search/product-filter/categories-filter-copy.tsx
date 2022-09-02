import { useRouter } from 'next/router';

// Third party packages
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import Skeleton from 'react-loading-skeleton';
import useSWR from 'swr';

// lib
import {
	getCategoriesByMainCategoryId,
	getMainCategories,
	getSpecificCategoriesBySubCategoryId,
	getSubCategoriesByCategoryId
} from 'lib/common.lib';

// utils
import { getLocaleText } from 'utils/get_locale_text';
import { applyFiltersByUrl } from 'utils/nav-actions.utils';

const CategoriesFilterCopy: React.FC = (props) => {
	const { push, locale, query } = useRouter();

	const { main_category_id } = query;

	// Fetching all main-categories
	const { data: mainCategories } = useSWR(
		`main_category?is_eco${false}`,
		() => getMainCategories(false)
	);

	// Fetching categories based on main_category_id
	const { data: categories } = useSWR(
		`/category/categories/${main_category_id}`,
		() => getCategoriesByMainCategoryId(main_category_id as string)
	);

	return (
		<div className="mt-4 space-y-2">
			{/* Main categories */}
			{mainCategories?.length <= 0 && <Skeleton count={24} />}

			{mainCategories?.map((mainCategory: any) => {
				const { id: mainCategoryId } = mainCategory || {};

				const mainCategoryTitle = getLocaleText(
					mainCategory?.title || {},
					locale
				);

				const isMainCategorySelected =
					main_category_id === mainCategoryId;

				return (
					<CategoryCollapse
						key={mainCategoryId}
						id={mainCategoryId}
						isOpen={isMainCategorySelected}
						title={mainCategoryTitle}
						onClick={() => {
							push(
								`/product-search-copy?${applyFiltersByUrl({
									main_category: mainCategoryTitle,
									main_category_id: mainCategoryId
								})}`
							);
						}}
					>
						{/* Categories */}
						{categories?.map((category: any) => {
							const { id: categoryId } = category || {};
							return (
								<CategoryList
									key={categoryId}
									id={categoryId}
									title={getLocaleText(category?.title || {}, locale)}
								/>
							);
						})}
					</CategoryCollapse>
				);
			})}
		</div>
	);
};

const CategoryList: React.FC<{
	id: string;
	title: string;
	onClick?: () => any;
	className?: string;
}> = (props) => {
	const { id, title } = props;
	const { push, locale, query } = useRouter();

	const { category_id } = query;

	const categoryIds = (category_id as string)?.split(',') || [];
	const isCategorySelected = categoryIds.includes(id);

	// Fetching sub-categories based on category_id
	const { data: subCategories } = useSWR(
		`/sub_category/sub_categories/${id}`,
		isCategorySelected
			? () => getSubCategoriesByCategoryId(id as string)
			: null
	);

	return (
		<CategoryCollapse
			key={id}
			id={id}
			isOpen={isCategorySelected}
			title={title}
			onClick={() => {
				let categoryIdList = [...categoryIds];

				let categoryNames =
					(query.category as string)?.split(',') || [];

				if (isCategorySelected) {
					categoryIdList = categoryIdList.filter(
						(category) => category !== id
					);
					categoryNames = categoryNames.filter(
						(category) => category !== title
					);
				} else {
					categoryIdList.push(id);
					categoryNames.push(title);
				}

				let categoryFilter = {
					category: categoryNames?.toString(),
					category_id: categoryIdList?.toString()
				};

				push(
					`/product-search-copy?${applyFiltersByUrl({
						...query,
						...categoryFilter
					})}`
				);
			}}
			className="ml-4"
		>
			{/* Sub Categories */}
			{subCategories?.map((subCategory: any) => {
				const { id: subCategoryId } = subCategory || {};

				return (
					<SubCategoryList
						key={subCategoryId}
						id={subCategoryId}
						title={getLocaleText(subCategory?.title || {}, locale)}
					/>
				);
			})}
		</CategoryCollapse>
	);
};

const SubCategoryList: React.FC<{
	id: string;
	title: string;
	onClick?: () => any;
	className?: string;
}> = (props) => {
	const { id, title } = props;
	const { push, locale, query } = useRouter();

	const {
		sub_category_id,
		sub_category,
		sub_sub_category_id,
		sub_sub_category
	} = query;

	const subCategoryIds = (sub_category_id as string)?.split(',') || [];
	const isSubCategorySelected = subCategoryIds.includes(id);

	// Fetching specific-categories based on sub_category_id
	const { data: specificCategories } = useSWR(
		`/specific_category/sub_sub_categories/${id}`,
		isSubCategorySelected
			? () => getSpecificCategoriesBySubCategoryId(id as string)
			: null
	);

	return (
		<CategoryCollapse
			key={id}
			id={id}
			isOpen={isSubCategorySelected}
			title={title}
			onClick={() => {
				let subCategoryIdList = [...subCategoryIds];
				let subCategoryNames =
					(sub_category as string)?.split(',') || [];

				if (isSubCategorySelected) {
					subCategoryIdList = subCategoryIdList.filter(
						(subCategory) => subCategory !== id
					);
					subCategoryNames = subCategoryNames.filter(
						(category) => category !== title
					);
				} else {
					subCategoryIdList.push(id);
					subCategoryNames.push(title);
				}

				const subCategoryFilter = {
					sub_category: subCategoryNames?.toString(),
					sub_category_id: subCategoryIdList?.toString()
				};
				push(
					`/product-search-copy?${applyFiltersByUrl({
						...query,
						...subCategoryFilter
					})}`
				);
			}}
			className="ml-4"
		>
			{/* Specific Categories */}
			{specificCategories?.map((specificCategory: any) => {
				const { id: specificCategoryId } = specificCategory || {};

				const specificCategoryIds =
					(sub_sub_category_id as string)?.split(',') || [];
				const isSpecificCategorySelected =
					specificCategoryIds.includes(specificCategoryId);

				return (
					<button
						key={specificCategoryId}
						className={`ml-4 text-left ${
							isSpecificCategorySelected ? 'font-semibold' : ''
						}`}
						onClick={() => {
							let specificCategoryIdList = [...specificCategoryIds];
							let specificCategoryNames =
								(sub_sub_category as string)?.split(',') || [];

							if (isSpecificCategorySelected) {
								specificCategoryIdList = specificCategoryIdList.filter(
									(subCategory) => subCategory !== id
								);
								specificCategoryNames = specificCategoryNames.filter(
									(category) => category !== title
								);
							} else {
								specificCategoryIdList.push(id);
								specificCategoryNames.push(title);
							}

							push(
								`/product-search-copy?${applyFiltersByUrl({
									...query,
									sub_sub_category: specificCategoryNames?.toString(),
									sub_sub_category_id:
										specificCategoryIdList?.toString()
								})}`
							);
						}}
					>
						{getLocaleText(specificCategory?.title || {}, locale)}
					</button>
				);
			})}
		</CategoryCollapse>
	);
};

const CategoryCollapse: React.FC<{
	id: string;
	title: string;
	isOpen: boolean;
	onClick?: () => any;
	className?: string;
}> = ({ id, title, isOpen, onClick, children, className }) => {
	return (
		<div className={className}>
			<input id={id} type="checkbox" className="hidden" />
			<label
				htmlFor={id}
				onClick={onClick}
				className={`flex cursor-pointer items-center space-x-2 text-left text-[18px] ${
					isOpen ? 'font-semibold' : ''
				}`}
			>
				<span>{isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}</span>
				<span>{title}</span>
			</label>
			{isOpen && <div>{children}</div>}
		</div>
	);
};

export default CategoriesFilterCopy;
